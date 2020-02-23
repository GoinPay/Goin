import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

const CustomButton = props => {
  return (
    <TouchableOpacity
      {...props}
      style={[styles.container, props.style]}
      onPress={props.onPress}
    >
      <Text style={[styles.textArea, props.textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(29, 19, 64)",
    borderRadius: 10,
    width: "90%",
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  textArea: {
    color: "#fff"
  }
});

export default CustomButton;
