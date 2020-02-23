import * as firebase from "firebase";
import { firebaseConfig } from "./firebaseConfig";

class _Backend {
  initialize() {
    firebase.initializeApp(firebaseConfig);
  }

  user = {
    createNewAccount: async (email, password) => {
      return await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
    },
    login: async (email, password) => {
      return await firebase.auth().signInWithEmailAndPassword(email, password);
    },
    resetPassword: async (email, password) => {
      return await firebase.auth().sendPasswordResetEmail(email, password);
    }
  };

  db = {
    insert: (ref, data) => {
      firebase
        .database()
        .ref(ref)
        .set(data);
    }
  };
}

const Backend = new _Backend();

export default Backend;
