import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/database'
import { v4 as uuidv4 } from 'uuid';
import 'firebase/storage';
import {NotificationManager} from 'react-notifications';

const firebaseConfig = {
  apiKey: "AIzaSyBOlW-yuRRfiJjFLXBrv2ORLR0NZavwNok",
  authDomain: "testmortageapp.firebaseapp.com",
  projectId: "testmortageapp",
  storageBucket: "testmortageapp.appspot.com",
  messagingSenderId: "671760508408",
  appId: "1:671760508408:web:3ef26a1750ff48f209620d",
  measurementId: "G-C9HB4MS8WT"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const addNewItem = async (data) => {
  const id = uuidv4()
  await db.collection("banks").doc(String(id)).set({
    id: String(id),
    title: data.title,
    rate: data.rate,
    payment: data.payment,
    maxLoan: data.maxLoan,
    term: data.term
  }).then(() => NotificationManager.info('Item has been created'))
    .catch((error) => NotificationManager.error(`Something went wrong: ${error}`));
}

export const getAllItems = async () => {
  const arr = [];
  await db.collection("banks").get().then(query => {
    query.forEach(doc => {
      arr.push(doc.data());
    });
  });
  return arr;
}

export const deleteItem = (id) => {
  db.collection("banks").doc(id).delete().then(() => {
  }).catch((error) => {
    NotificationManager.error(`Error removing document: ${error}`);
});
}

export const changeItem = async (id, data) => {
return await db.collection("banks").doc(id).update({
    ...data
})
  .then(() => {
    NotificationManager.success("Document successfully updated");
})
  .catch((error) => {
    NotificationManager.error(`Error updating document: ${error}`);
});
}
