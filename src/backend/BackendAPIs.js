import * as firebase from "firebase";
import { firebaseConfig } from "./firebaseConfig";
//import { EventEmitter } from ',/events';

let This;

class _Backend {
  userEmail = "";
  allUsers = null;
  allBills = null;
  userBills = [];
  usersRef = null;
  billsRef = null;
  onDataChangedCallback = null;

  constructor() {
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
    },
  };

  db = {
    insert: (ref, data) => {
      firebase.database().ref(ref).set(data);
    },

    setChangedCallback: (callback) => {
      This.onDataChangedCallback = callback;
    },

    getDataUsers: async () => {
      //console.log("getDataUsers");
      let users = await firebase.database().ref("/users").once("value");

      this.allUsers = users.val();
      //console.log(JSON.stringify(this.allUsers));
      return this.allUsers;
    },

    getDataBills: async () => {
      // console.log("getDataBills!");
      let bills = await firebase.database().ref("/bills").once("value");
      this.allBills = bills.val();
      return this.allBills;
    },

    removeEmailDots: (email) => {
      return email.replace(/\./g, "_");
    },

    getUserBills: async (userEmail) => {
      // console.log("getUserBills: " + userEmail);
      const email = This.db.removeEmailDots(userEmail);

      if (!This.allUsers) await This.db.getDataUsers();
      if (!This.allBills) await This.db.getDataBills();
      This.userBills = [];

      Object.keys(This.allUsers[email].bills).map(bill => {
        //console.log("bill: " + bill);
        let billNameKey = {
          name: bill,
          [bill]: This.allBills[bill] //you can access its fields by, userBills[userBills.name]
        }
        This.userBills.push(billNameKey);
      });
      return This.userBills;
      console.log(JSON.stringify(this.userBills));
    },

    getBillMembers: (billName) => {
      // console.log('billName: ' + billName);
      // console.log('allBills: ' + JSON.stringify(This.allBills));
      let userBills = [];
      if (This.allBills) {
        const members = This.allBills[billName].members;

        Object.keys(members).map(member => {
          let memberNameKey = {
            name: member,
            [member]: members[member]
          }
          userBills.push(memberNameKey);
        })
      }
      return userBills;
    }
  };

  async onDataChanged() { //we'll make this more efficient later.
    await this.db.getDataUsers();
    await this.db.getDataBills();

    if (this.onDataChangedCallback)
      this.onDataChangedCallback();
  }

  onUsersChanged(snapshot) {
    //this.allUsers = snapshot.val();
    //this.emit("onDataChanged");
    this.onDataChanged();
  }

  onBillsChanged(snapshot) {
    //this.allBills = snapshot.val();
    this.onDataChanged();
  }


  initialize() {
    This = this;

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    this.usersRef = firebase.database().ref("/users");
    this.billsRef = firebase.database().ref("/bills");

    firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        if (This.userEmail == "") {
          This.userEmail = user.email;
          console.log('onAuthStateChanged: email: ' + This.userEmail);

          This.db.getUserBills(This.userEmail);
        }
      } else {
        // No user is signed in.
      }
    });

    this.usersRef.on("child_added", this.onUsersChanged.bind(this));
    this.usersRef.on("child_removed", this.onUsersChanged.bind(this));
    this.usersRef.on("child_changed", this.onUsersChanged.bind(this));

    this.billsRef.on("child_added", this.onBillsChanged.bind(this));
    this.billsRef.on("child_removed", this.onBillsChanged.bind(this));
    this.billsRef.on("child_changed", this.onBillsChanged.bind(this));
  }
}

const Backend = new _Backend();

export default Backend;
