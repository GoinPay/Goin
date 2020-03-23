import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

const CustomButton = props => {
  //console.log("disabled: " + props.disabled);
  let disabled = props.disabled;
  if (props.disabled === 'undefined') {
    disabled = false;
  }
  return (
    <TouchableOpacity
      {...props}
      disabled={disabled}
      style={[styles.container, props.style, { opacity: disabled ? .5 : 1 }]}
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
