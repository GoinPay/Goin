import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import HomeIconFrame from "../components/HomeIconFrame";
import CustomButton from "../components/CustomButton";
import * as Random from "../Utils/RandomCodeGenerator";
import DatePicker from 'react-native-datepicker';
import data from '../backend/data';
import moment from 'moment';

const EnterDueDate = ({ navigation }) => {
  navigation.setOptions({ headerLeft: null });
  const [date, setDate] = useState(moment().format('MM/DD/YYYY'));
  const datePickerRef = useRef(null);

  const getNewCode = () => {
    let code = Random.TextCode(3);
    code = code.toUpperCase();
    code = code + "-" + Random.NumCode(3);
    return code;
  };

  const onNext = () => {
    data.newBill.dueDate = date;
    data.newBill.code = getNewCode();

    console.log('entered date: ' + data.newBill.dueDate);
    console.log('new code: ' + data.newBill.code);
    console.log('billType: ' + data.newBill.billType);
    console.log('amount: ' + data.newBill.amount);

    const newBill = {
      address: "",
      description: data.newBill.billType,
      dueCollected: "$0.00",
      dueDate: data.newBill.dueDate,
      total: data.newBill.amount,
      members: {
        [data.userEmail]: {
          isPrimary: true
        }
      }
    }
    data.db.addUpdateBill({ [data.newBill.code]: newBill }).then(() => {
      Alert.alert("Successfully add a new bill acount.");
      data.db.addUpdateUserBill({ [data.newBill.code]: { yourDue: data.newBill.amount } });
      navigation.navigate("Bills");
    }).catch((error) => {
      Alert.alert("Failed to add the new account. " + error);
    });
  }
  const onDate = () => {
    datePickerRef.current.onPressDate();
  }

  return (
    <HomeIconFrame
      title='Enter Due Date'
      subTitle='Total:'
      amountAreaValue={data.newBill.amount}
      showProfile={false}
    >
      <View style={styles.container}>
        <View>
          {/* <TouchableOpacity onPress={onDate}>
            <View> */}
          <Text onPress={onDate} style={styles.date}>{date.toString()}</Text>
          {/* </View>
          </TouchableOpacity> */}
          <DatePicker
            ref={datePickerRef}
            date={date} //initial date from state
            mode="date" //The enum of date, datetime and time
            // placeholder="select date"
            showIcon={false}
            hideText={true}
            format="MM/DD/YYYY"
            minDate="01-01-2020"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              datePicker: {
                backgroundColor: "rgb(87,126,242)",
              },
              btnTextConfirm: {
                color: "rgb(44,69,217)"
              }
            }}
            onDateChange={date => {
              setDate(date);
            }}
          />
        </View>
        <View style={styles.instructionContainer}>
          <Text style={styles.instruction}>
            We will start reminding everyone of the payment 10 days from the due date.
          </Text>
          {/* for some reason the second line of text above won't show up
          on ios without this dummy Text.  */}
          <Text style={styles.instruction}>
          </Text>
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
  dateContainer: {
    width: 200,
  },
  date: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold"
  },
  instructionContainer: {
    marginBottom: "6%",
    width: "69%",
    //backgroundColor: "white"
    //justifyContent: "center",
    //alignItems: "center",
  },
  instruction: {
    //height: 20,
    fontSize: 14,
    color: "#fff",
    //backgroundColor: "gray"
    textAlignVertical: "center",
    textAlign: "center",
    //flexWrap: 'wrap',
  },
  buttonContainer: {}
});

export default EnterDueDate;
