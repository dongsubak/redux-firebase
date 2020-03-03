import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

import BoardForm from './App_BoardForm';
import BoardItem from './App_BoardItem';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    const { boards } = this.props;

    return (
      <div>
        <h3>Redux board</h3>
        <BoardForm />
        <table boarder="1">
          <tbody>
            <tr align="center">
              <td width="50">No.</td>
              <td width="300">Title</td>
              <td width="100">Name</td>
              <td width="100">DaTE</td>
            </tr>
            {
              boards.map(row =>
                (<BoardItem key={row.brdno} row={row} />)  
              )
            }
          </tbody>
        </table>
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    boards: state.boards
  };
}

export default connect(mapStateToProps)(App);
