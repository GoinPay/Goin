import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import HomeIconFrame from "../components/HomeIconFrame";
import CustomButton from "../components/CustomButton";
import data from "../backend/data";

const JoinGroup = ({ navigation }) => {
  const [code, setCode] = useState("");
  const [isValidCode, setValid] = useState(false);
  navigation.setOptions({ headerLeft: null });

  const onCancel = () => {
    navigation.navigate("Login");
  };

  const onJoinGroup = () => {
    //add him/her to the list of members under bills
    data.db.addUpdateBillMember(code, { [data.userEmail]: { isPrimary: false } });
    //add the bill to his/her account
    data.db.addUpdateUserBill({ [code]: { yourDue: data.newBill.amount } }); //change to computed value later

    navigation.navigate("Bills");
  };

  const onChangeText = (text) => {
    console.log('input len: ' + text.length);
    if (text.length === 7) {
      if (data.allBills[text]) {
        setValid(true);
        console.log('bills found');
      } else {
        Alert.alert("Invalide Code! Please try again.");
        console.log('bills not found');
        setValid(false);
      }
    } else setValid(false);
    setCode(text.toUpperCase());
  }
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
            onChangeText={onChangeText}
            value={code}
          ></TextInput>
        </View>
        <View style={styles.instructionContainer}>
          <Text style={styles.instruction}>
            Ask account holder to send join the code
          </Text>
          <Text style={styles.instruction}></Text>
        </View>
        <CustomButton disabled={!isValidCode} onPress={onJoinGroup} title='Join' />
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
    marginBottom: 10,
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
