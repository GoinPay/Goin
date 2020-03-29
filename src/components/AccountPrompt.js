import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

import CustomButton from "./CustomButton";

const AccountPrompt = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const buttonPressHandler = () => {
    props.onButtonLogin(email, password);
  };
  const forgotPasswordHandler = () => {
    if (!props.isCreateAccount) props.onForgotPassword();
  };

  const newAccountHandler = () => {
    props.onCreateNewAccount();
  };

  return (
    <View style={styles.container}>
      <View style={{ height: "10%" }} />
      <View style={styles.titleArea}>
        <Text style={styles.title}>
          {props.isCreateAccount ? "Create Account" : "Welcome To Goin"}
        </Text>
        <Text style={styles.subTitle}>
          {props.isCreateAccount
            ? "Just a little information and done."
            : "Login To Account"}
        </Text>
      </View>
      <View style={{ height: "15%" }} />
      <View style={{ width: "90%", alignItems: "center" }}>
        <TextInput
          placeholder={props.isCreateAccount ? "Enter Email" : "Email"}
          style={styles.inputBox}
          keyboardType='email-address'
          autoCapitalize='none'
          onChangeText={input => {
            setEmail(input);
          }}
        />
        <TextInput
          placeholder={props.isCreateAccount ? "Create a Password" : "Password"}
          style={styles.inputBox}
          secureTextEntry={true}
          autoCapitalize='none'
          onChangeText={input => {
            setPassword(input);
          }}
        />
        <Text onPress={forgotPasswordHandler}>
          {props.isCreateAccount ? "" : "Forgot Password?"}
        </Text>
      </View>
      <View style={{ height: "15%" }} />
      <CustomButton
        onPress={buttonPressHandler}
        title={props.isCreateAccount ? "Create Account" : "Login"}
      />
      <View style={{ height: 36 }}></View>
      <Text onPress={newAccountHandler}>
        {props.isCreateAccount ? "Cancel" : "Create New Account"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  titleArea: {
    alignItems: "center"
  },
  title: {
    fontSize: 34,
    color: "#fff",
    // fontFamily: 'Roboto',
    fontWeight: "bold",
    marginBottom: "1.5%"
  },
  subTitle: {
    color: "#fff",
    fontSize: 13
  },
  inputBox: {
    height: 50,
    backgroundColor: "rgb(87, 126, 242)",
    width: "100%",
    marginBottom: "3.5%",
    borderRadius: 10,
    paddingLeft: "3.2%",
    fontSize: 18
  }
});

export default AccountPrompt;
