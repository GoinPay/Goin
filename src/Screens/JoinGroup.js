import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import HomeIconFrame from "../components/HomeIconFrame";
import CustomButton from "../components/CustomButton";

const JoinGroup = ({ navigation }) => {
  navigation.setOptions({ headerLeft: null });

  const onCancel = () => {
    navigation.navigate("Login");
  };

  const onJoinGroup = () => {
    navigation.navigate("EnterAmount");
  };

  return (
    <HomeIconFrame
      title='Join Group'
      subTitle='Apartment Rent:'
      showProfile={false}
    >
      <View style={styles.container}>
        <View style={styles.codeContainer}>
          <TextInput
            placeholder='Enter Code'
            style={styles.enterCode}
          ></TextInput>
        </View>
        <View style={styles.instructionContainer}>
          <Text style={styles.instruction}>
            Ask account holder to send join the code
          </Text>
        </View>
        <CustomButton onPress={onJoinGroup} title='Join' />
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
    marginBottom: 5,
    width: "90%",
    alignItems: "center"
  },
  enterCode: {
    fontSize: 40,
    //fontFamily: "sans serif",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center"
  },
  instructionContainer: {
    marginBottom: "6%",
    width: "69%",
    justifyContent: "center",
    alignItems: "center"
  },
  instruction: {
    fontSize: 14,
    color: "#fff",
    textAlignVertical: "center",
    textAlign: "center"
  }
});

export default JoinGroup;
