import { createAction, handleActions } from 'redux-actions';
import firestore from './Firestore';
import dateFormat from 'dateformat';

const BOARD_SAVE ='SAVE';
const BOARD_REMOVE = 'REMOVE';
const BOARD_READ = 'ONE';
const BOARD_LIST = 'LIST';

export const board_save = createAction(BOARD_SAVE);
export const board_remove = createAction(BOARD_REMOVE, brdno => brdno);
export const board_read = createAction(BOARD_READ);
export const board_list = createAction(BOARD_LIST);
//export const board_save = (data) => ({ type: BOARD_SAVE, data });
//export const board_remove = (brdno) => ({ type: BOARD_REMOVE, brdno: brdno });
//export const board_read  = (brdno) => ({ type: BOARD_READ, brdno: brdno });
//export const board_list = () => ({ type: BOARD_LIST });

export const firebase_board_list = () => {
    return (dispatch) => {
        return firestore.collection('boards').orderBy("brddate","desc").get()
            .then((snapshot) => {
                var rows = [];
                snapshot.forEach((doc) => {
                    var childData = doc.data();
                    childData.brddate = dateFormat(childData.brddate, "yyyy-mm-dd");
                    rows.push(childData);
                });
                dispatch(board_list(rows));
            })
    }
}

export const firebase_board_remove = ( brdno = {} ) => {
    return (dispatch) => {
        console.log(brdno);
        return firestore.collection('boards').doc(brdno).delete().then(() => {
            dispatch(board_remove(brdno));
        })

    }
}

export const firebase_board_save = ( data = {} ) => {
    return (dispatch) => {
        if(!data.brdno) {
            var doc = firestore.collection('boards').doc();
            data.brdno = doc.id;
            data.brddate = Date.now();
            return doc.set(data).then(() => {
                data.brddate = dateFormat(data.brddate, "yyyy-mm-dd");
                dispatch(board_save(data));
            })
        } else {
            return firestore.collection('boards').doc(data.brdno).update(data).then(() => {
                dispatch(board_save(data));
            })
        }
    }
};
    
const initialState = {
    // maxNo: 3,
    boards: [
        /*
        {
            brdno: 1,
            brdwriter: 'Lee SunSin',
            brdtitle: 'If you intend to live then you die',
            brddate: new Date()
        },
        {
            brdno: 2,
            brdwriter: 'So SiNo',
            brdtitle: 'Founder for two countries',
            brddate: new Date()
        },
        */
    ],
    selectedBoard: {}
};


/*
export default function board_reducer(state = initialState, action) {
    let boards = state.boards;

    switch(action.type) {
        case BOARD_SAVE:
            let data = action.data;
            let maxNo = state.maxNo;
            if (!data.brdno) { // new data Insert
                return { maxNo: maxNo+1, boards: boards.concat({...data, brdno: maxNo, brddate: new Date()}), selectedBoard: {} };
            }
            return {...state, boards: boards.map(row => data.brdno === row.brdno ? {...data} : row), selectedBoard: {} };
        case BOARD_REMOVE:
            return {...state, boards: boards.filter(row => row.brdno !== action.brdno), selectedBoard: {} };
        case BOARD_READ:
            return {
                ...state,
                selectedBoard: boards.find(row => row.brdno == action.brdno)
            };
        default:
            return state;
    }
}
*/

export default handleActions({
    [BOARD_LIST]: (state, { payload: data }) => {
        return {boards: data, selectedBoard: {} };
    },
    [BOARD_SAVE]: (state, { payload: data }) => {
        let boards = state.boards;

        let maxNo = state.maxNo;
            if (!data.brdno) { // new data Insert
                return { maxNo: maxNo+1, boards: boards.concat({...data, brdno: maxNo, brddate: new Date()}), selectedBoard: {} };
            }
            return {...state, boards: boards.map(row => data.brdno === row.brdno ? {...data} : row), selectedBoard: {} };
    },
    [BOARD_REMOVE]: (state, { payload: brdno }) => {
        let boards = state.boards;
        return {...state, boards: boards.filter(row => row.brdno !== brdno), selectedBoard: {} };
    },
    [BOARD_READ]: (state, { payload: brdno }) => {
        let boards = state.boards;
        return {...state, selectedBoard: boards.find(row => row.brdno === brdno) };
    }
}, initialState);
