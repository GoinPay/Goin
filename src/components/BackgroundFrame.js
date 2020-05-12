import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TouchableWithoutFeedback, Keyboard, Dimensions } from "react-native";

const gradientColors = ["rgb(87,126,242)", "rgb(44,69,217)"];
var { Windowheight, width } = Dimensions.get('window');

const AccountFrame = props => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <LinearGradient colors={gradientColors} style={styles.background}>
        {props.children}
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: Windowheight
  }
});

export default AccountFrame;
