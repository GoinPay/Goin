import * as firebase from "firebase";
import { firebaseConfig } from "./firebaseConfig";
//import { EventEmitter } from ',/events';

let This;

class Data {
  userEmail = "";
  allUsers = null;
  allBills = null;
  userBills = [];
  usersRef = null;
  billsRef = null;
  currentBillCode = "";
  currentBillDesc = "";
  onDataChangedCallback = null;
  yourDue = {};
  newBill = {};
  bottomNavEntry = "";

  constructor() {
    this.newBill.amount = "";
    this.newBill.dueDate = "";
    this.newBill.code = "";
    this.newBill.billType = "";
  }

  user = {
    createNewAccount: async (email, password) => {
      console.log('before login!');
      return await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
    },
    login: async (email, password) => {
      console.log('before login!');
      return await firebase.auth().signInWithEmailAndPassword(email, password);
    },
    resetPassword: async (email, password) => {
      return await firebase.auth().sendPasswordResetEmail(email, password);
    },
  };

  db = {
    insertBill: (data) => { //this will delete existing
      firebase.database().ref("/bills").set(data);
    },

    addUpdateBill: async (data) => {
      return await firebase.database().ref("/bills").update(data);
    },

    addUpdateBillMember: (billCode, data) => {
      firebase.database().ref("bills/" + billCode + "/members/").update(data);
    },

    addUpdateUserBill: (data) => {
      firebase.database().ref("users/" + This.userEmail + "/bills").update(data);
    },

    addUpdateUser: (data) => {
      firebase.database().ref("users/").update(data);
    },

    updateUserBillByCode: (billCode, data) => {
      firebase.database().ref("users/" + This.userEmail + "/bills/" + billCode).update(data);
    },

    deleteUserBillByCode: (billCode) => {
      firebase.database().ref("users/" + This.userEmail + "/bills/" + billCode).remove();
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
      console.log("getUserBills: " + userEmail);
      const email = userEmail; //This.db.removeEmailDots(userEmail);

      if (!This.allUsers) await This.db.getDataUsers();
      if (!This.allBills) await This.db.getDataBills();
      This.userBills = [];

      if (This.allUsers[email].bills) {
        Object.keys(This.allUsers[email].bills).map(bill => {
          // console.log("bill: " + bill);
          This.yourDue[bill] = This.allUsers[email].bills[bill]["yourDue"];
          // console.log("this yourDue: " + This.yourDue[bill]);
          let billNameKey = {
            name: bill,
            [bill]: This.allBills[bill] //you can access its fields by, userBills[userBills.name]
          }
          This.userBills.push(billNameKey);
        });
      }
      return This.userBills;
      console.log(JSON.stringify(this.userBills));
    },

    getBillMembers: (billName) => {
      console.log('bill code Name: ' + billName);
      This.currentBillCode = billName;
      This.currentBillDesc = This.allBills[billName].description;
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

    //add new computation here

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

  onSuccessLogin() {
    this.usersRef = firebase.database().ref("/users/" + this.userEmail);
    //this.billsRef = firebase.database().ref("/bills");

    // firebase.auth().onAuthStateChanged(async function (user) {
    //   if (user) {
    //     if (This.userEmail == "") {
    //       This.userEmail = This.db.removeEmailDots(user.email);
    //       console.log('onAuthStateChanged: email: ' + This.userEmail);

    //       This.db.getUserBills(This.userEmail);
    //     }
    //   } else {
    //     // No user is signed in.
    //   }
    // });

    this.usersRef.on("child_added", this.onUsersChanged.bind(this));
    this.usersRef.on("child_removed", this.onUsersChanged.bind(this));
    this.usersRef.on("child_changed", this.onUsersChanged.bind(this));

    // this.billsRef.on("child_added", this.onBillsChanged.bind(this));
    // this.billsRef.on("child_removed", this.onBillsChanged.bind(this));
    // this.billsRef.on("child_changed", this.onBillsChanged.bind(this));
  }

  initialize() {
    This = this;

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }
}

const data = new Data();

export default data;
