import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import HomeIconFrame from "../components/HomeIconFrame";
import CustomButton from "../components/CustomButton";

const EnterAmount = ({ navigation }) => {
  const onNext = () => {
    navigation.navigate("BottomNav");
  };

  return (
    <HomeIconFrame title='Enter Amount' showProfile={false}>
      <View style={styles.container}>
        <View style={styles.codeContainer}>
          <TextInput
            placeholder='Enter here '
            style={styles.enterCode}
          ></TextInput>
        </View>
        <CustomButton onPress={onNext} title='Next' />
      </View>
    </HomeIconFrame>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "6.75%"
  },
  codeContainer: {
    borderBottomColor: "rgba(255,255,255, .2)",
    borderBottomWidth: 1,
    marginBottom: 64,
    //width: "55%",
    alignItems: "center"
  },
  enterCode: {
    fontSize: 40,
    //fontFamily: "serif",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default EnterAmount;
