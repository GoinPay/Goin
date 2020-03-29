import React from "react";
import data from "../backend/data";
import { Alert } from "react-native";

import AccountPrompt from "../components/AccountPrompt";
import BackgroundFrame from "../components/BackgroundFrame";

const CreateAccount = ({ navigation }) => {
  navigation.setOptions({ headerLeft: null, headerRight: null });

  const onCancel = () => {
    navigation.navigate("Login");
  };

  const onCreateAccount = async (email, password) => {
    data.user.createNewAccount(email, password).then(
      () => {
        const _email = data.db.removeEmailDots(email);
        data.userEmail = _email;
        data.onSuccessLogin();
        //console.log('new email: ' + _email);
        data.db.addUpdateUser({ [_email]: { phone: "", photo: "" } });
        data.bottomNavEntry = "SelectType";
        navigation.navigate("BottomNav");
      },
      error => {
        Alert.alert(error.message);
      }
    );
  };

  return (
    <BackgroundFrame>
      <AccountPrompt
        onButtonLogin={onCreateAccount}
        isCreateAccount={true}
        onCreateNewAccount={onCancel}
      />
    </BackgroundFrame>
  );
};

export default CreateAccount;
