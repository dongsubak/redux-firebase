import firebase from 'firebase';
import config from './config';

firebase.initializeApp(config);
var firestore = firebase.firestore();

const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

export default firestore;
