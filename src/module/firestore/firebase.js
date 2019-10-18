import * as firebase from "firebase/app";
import "firebase/firestore";
import {useCollection} from "react-firebase-hooks/firestore";

const key = localStorage.getItem("thingyFirebaseKey");

if (key) {
  firebase.initializeApp({
    apiKey: key,
    authDomain: "thingy-workshop.firebaseapp.com",
    databaseURL: "https://thingy-workshop.firebaseio.com",
    projectId: "thingy-workshop",
    storageBucket: "thingy-workshop.appspot.com",
    messagingSenderId: "137166886055",
    appId: "1:137166886055:web:224969bcdca7d8d947f782"
  });
}

export default firebase;

export function saveDeviceStatus(name, options) {
  try {
    const ref = firebase.firestore().doc("/deviceStatus/" + name);
    ref.set({
      ...options,
      lastContact: firebase.firestore.FieldValue.serverTimestamp(),
    });
  } catch (e) {}
}

export function useDeviceCollection(collectionPath) {
  try {
    return useCollection(firebase.firestore().collection(collectionPath));
  } catch (e) {
    return [null, false, new Error("firebase error")];
  }
}
