import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import HomeIconFrame from "../components/HomeIconFrame";
import CustomButton from "../components/CustomButton";
import data from '../backend/data';

const SelectType = ({ navigation }) => {
  const setIconState = isActive => {
    let width = 25;
    let height = 25;
    if (isActive) {
      width = height = 40;
    }
    navigation.setOptions({
      tabBarIcon: () => (
        <Image
          style={{ width: width, height: height }}
          source={
            isActive
              ? require("../../assets/active-add.png")
              : require("../../assets/inactive-add.png")
          }
        />
      )
    });
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      setIconState(true);
    });
    const unsubscribe = navigation.addListener("blur", () => {
      setIconState(false);
    });

    return unsubscribe;
  }, []);

  const onJoinGroup = () => {
    navigation.navigate("JoinGroup");
  };

  const onAdd = (type) => {
    data.newBill.billType = type;
    navigation.navigate("EnterAmount");
  }

  return (
    <HomeIconFrame
      title='Select Type'
      hideHomeIcon={true}
      showProfile={false}
      preTitle='Choose what bill you want to create'
    >
      <View style={styles.container}>
        <View style={styles.typeButtonContainer}>
          <TouchableOpacity style={styles.iconContainer} onPress={onAdd.bind(this, "Home Rent")}>
            <Image
              style={{ width: 56, height: 50 }}
              source={require("../../assets/home-icon.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={onAdd.bind(this, "Electric")}>
            <Image
              style={{ width: 41, height: 51 }}
              source={require("../../assets/light-icon.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={onAdd.bind(this, "Wifi")}>
            <Image
              style={{ width: 50, height: 50 }}
              source={require("../../assets/wifi-icon.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={onAdd.bind(this, "Water")}>
            <Image
              style={{ width: 45, height: 50 }}
              source={require("../../assets/shower-icon.png")}
            />
          </TouchableOpacity>
        </View>
        <CustomButton onPress={onJoinGroup} title='Join Group' />
      </View>
    </HomeIconFrame>
  );
};

const styles = StyleSheet.create({
  typeButtonContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-start",

    // marginTop: -40
    //backgroundColor: "white",
    flexWrap: "wrap",
    marginBottom: "13%"
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
    // backgroundColor: "gray"
  },
  iconContainer: {
    backgroundColor: "rgb(87,126,242)",
    height: 165,
    width: "46%",
    marginBottom: "2.1%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderBottomWidth: 0
  },
  typeArea: {
    marginBottom: "20%"
    // flex: 1,
    //  backgroundColor: "white"
  }
});

export default SelectType;
