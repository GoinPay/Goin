import React, { useState } from "react";
import { Alert, StyleSheet, Text, View, TextInput } from "react-native";
import backend from "../backend/BackendAPIs";

import BackgroundFrame from "../components/BackgroundFrame";
import CustomButton from "../components/CustomButton";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  navigation.setOptions({ headerLeft: null, headerRight: null });

  const onCancel = () => {
    navigation.navigate("Login");
  };

  const onResetPassword = () => {
    backend.user.resetPassword(email).then(
      () => {
        Alert.alert("Password reset email has been sent.");
        navigation.navigate("Login");
      },
      error => {
        Alert.alert(error.message);
      }
    );
  };

  return (
    <BackgroundFrame>
      <View style={styles.container}>
        <View style={{ height: "10%" }} />
        <View style={styles.titleArea}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subTitle}>
            Enter your email to reset the password
          </Text>
        </View>
        <View style={{ height: "15%" }} />
        <View style={{ width: "90%", alignItems: "center" }}>
          <TextInput
            placeholder='Enter Email'
            style={styles.inputBox}
            keyboardType='email-address'
            autoCapitalize='none'
            onChangeText={input => {
              setEmail(input);
            }}
          />
        </View>
        <View style={{ height: "15%" }} />
        <CustomButton onPress={onResetPassword} title='Reset Password' />
        <View style={{ height: 36 }}></View>
        <Text onPress={onCancel}>Cancel</Text>
      </View>
    </BackgroundFrame>
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
    paddingLeft: "3.2%"
  }
});

export default ForgotPassword;
