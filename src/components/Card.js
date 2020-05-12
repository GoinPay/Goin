import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";

import data from "../backend/data";

const Card = (props) => {
  const descInput = useRef();
  const [textColor, setTxtColor] = useState('white');
  const [isEdit, setEdit] = useState(false);
  //console.log('currentBillDesc: ' + data.currentBillDesc);
  const [billDesc, onChangeDesc] = useState(data.currentBillDesc);

  console.log('billDesc: ' + billDesc);

  let bill = props.payload.bill;
  let db = data.db;
  let yourDue = props.payload.yourDue;

  const Edit = () => {
    setEdit(true);
  }

  const onDelete = () => {
    data.db.deleteUserBillByCode(data.currentBillCode);
  }

  const Delete = () => {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this bill?',
      [
        { text: 'NO', onPress: () => { } },
        { text: 'YES', onPress: onDelete },
      ]
    );
  }

  const onFocusChange = () => {
    setTxtColor("rgba(255,255,255, 0.5)");
  }

  const onBlurChange = () => {
    setTxtColor("rgba(255,255,255, 1)");
    setEdit(false);
    bill.description = billDesc;
    data.db.addUpdateBill({ [data.currentBillCode]: bill });
  }

  useEffect(() => {
    if (isEdit) descInput.current.focus();
    if (billDesc == "") onChangeDesc(data.currentBillDesc);
  });

  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <View style={styles.xButton}>
          <TouchableOpacity
            onPress={Delete}
          >
            <Image
              style={{ width: 10, height: 10 }}
              source={require("../../assets/clear-button.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.homeRow}>
          <View style={styles.homeIcon}>
            <Image
              style={{ width: 35, height: 31 }}
              source={require("../../assets/home-icon.png")}
            />
          </View>
          <View style={styles.descriptionArea}>
            <TextInput
              ref={input => descInput.current = input}
              value={billDesc}
              style={[styles.descriptionInput, { color: textColor }]}
              editable={isEdit}
              blurOnSubmit={false}
              onChangeText={text => onChangeDesc(text)}
              selectTextOnFocus={true}
              onFocus={onFocusChange}
              onBlur={onBlurChange}
            ></TextInput>
          </View>
        </View>
        <View style={styles.dueAreaRow}>
          <View style={styles.dueArea}>
            <View style={styles.totalRow}>
              <Text style={{ color: "white" }}>Total: {bill.total}</Text>
            </View>
            <View style={styles.dueRow}>
              <Text style={{ color: "white" }}>Your Due: {yourDue}</Text>
            </View>
          </View>
          <View style={styles.editButtonContainer}>
            <TouchableOpacity
              onPress={Edit}
            >
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../../assets/pen.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.dueCollectedText}>Due Collected:</Text>
        </View>
        <View style={styles.dueCollectAmountRow}>
          <View style={styles.dueAmountContainer}>
            <Text
              style={styles.dueCollectAmount}
            >{bill.dueCollected.toString()}</Text>
          </View>
          <TouchableOpacity style={styles.payItButton}>
            <Text style={{ color: "white" }}>Pay It</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgb(87,126,242)",
    height: 180,
    width: "90%", //"71%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderBottomWidth: 0
  },
  container: {
    flex: 1,
    marginTop: 5
  },
  xButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 5,
    marginRight: 15,
    zIndex: 1
  },
  homeRow: {
    //  flex: 1,
    flexDirection: "row",
    marginLeft: 11,
    marginTop: -15,
    marginBottom: 5
  },
  homeIcon: {
    flex: 2
  },
  descriptionArea: {
    flex: 10,
    paddingTop: 8
  },
  descriptionInput: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "left",
    borderBottomColor: "rgba(255,255,255, .2)",
    borderBottomWidth: 1,
    marginRight: 30
  },
  dueAreaRow: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
    // backgroundColor: "white"
  },
  dueArea: {
    flex: 10,
    alignItems: "flex-end"
  },
  dueCollectedText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
    marginLeft: 14
  },
  editButtonContainer: {
    flex: 2,
    marginRight: 20,
    marginLeft: 83,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  dueCollectAmountRow: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 16,
    marginTop: -10,
    alignItems: "center"
  },
  dueCollectAmount: {
    fontSize: 35,
    color: "#fff",
  },
  dueAmountContainer: {
    flex: 8
  },
  payItButton: {
    flex: 4,
    backgroundColor: "rgb(29, 19, 64)",
    borderRadius: 14,
    width: 72,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15
  }
});

export default Card;
