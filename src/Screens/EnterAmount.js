import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import HomeIconFrame from "../components/HomeIconFrame";
import CustomButton from "../components/CustomButton";
import data from '../backend/data';
import { TextInputMask } from 'react-native-masked-text'

const EnterAmount = ({ navigation }) => {

  const [value, onChangeValue] = useState('');

  const onChangeText = (text) => {

    //let number = text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '');
    // console.log('textinput: ' + text);
    onChangeValue(text);
  }

  const onNext = () => {
    data.newBill.amount = value;
    //console.log('data amount: ' + data.newBill.amount);
    navigation.navigate("EnterDueDate");
  };

  return (
    <HomeIconFrame title='Enter Amount' showProfile={false}>
      <View style={styles.container}>
        <View style={styles.codeContainer}>
          <TextInputMask
            style={styles.enterCode}
            placeholder='Enter here '
            options={{
              precision: 2,
              separator: '.',
              delimiter: ',',
              unit: '$',
              suffixUnit: ''
            }}
            type={'money'}
            value={value}
            onChangeText={onChangeText}
          />
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
