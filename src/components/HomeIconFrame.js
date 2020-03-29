import React from "react";
import { StyleSheet, Text, View, Image, Platform } from "react-native";
import BackgroundFrame from "./BackgroundFrame";
import ProfileImage from "./ProfileImage";

const primaryImage = require("../../assets/me.png");
let isIos = false;
if (Platform.OS === 'ios')
  isIos = true;

const HomeIconFrame = props => {

  return (
    <BackgroundFrame>
      <View style={styles.container}>
        <View>
          <Text style={styles.preTitle}>{props.preTitle}</Text>
        </View>
        <View style={styles.titleArea}>
          <View style={{ flex: 10 }}>
            <Text style={styles.title}>{props.title}</Text>
          </View>
          <View style={{ flex: 2 }}>
            <ProfileImage
              image={primaryImage}
              isPrimary={props.showPrimaryHolder}
              isShowProfile={props.showProfile}
            />
          </View>
        </View>
        <View
          style={[
            styles.homeIconArea,
            { display: props.hideHomeIcon ? "none" : "flex" }
          ]}
        >
          <View style={styles.homeIconContainer}>
            <Image
              style={{ width: 31, height: 31 }}
              source={require("../../assets/home-icon.png")}
            />
          </View>
          <View style={styles.subTitleArea}>
            <Text style={styles.subTitle}>{props.subTitle}</Text>
          </View>
          <View style={styles.amountTextArea}>
            <Text style={styles.amountText}>{props.amountAreaValue}</Text>
          </View>
        </View>
      </View>
      {props.children}
    </BackgroundFrame>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    alignItems: "flex-start",
    marginTop: "14%",
    marginLeft: "5.3%"
    // backgroundColor: "gray"
    // height: 160
  },
  preTitle: {
    // alignItems: "flex-start",
    // paddingLeft: "5.3%",
    //paddingBottom: 5,
    color: "#fff",
    fontSize: 14
    //textAlign: "le"
  },
  titleArea: {
    //flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    // paddingLeft: "5.3%",
    paddingTop: isIos ? "3%" : 0,
    paddingBottom: "7%",
    //marginTop: 4,
    // marginBottom: 10
    // backgroundColor: "gray"
  },
  title: {
    fontSize: 34,
    color: "#fff",
    // fontFamily: 'Roboto',
    fontWeight: "bold",
    marginBottom: "1.5%",

  },
  subTitle: {
    color: "#fff",
    fontSize: 13,
  },
  subTitleArea: {
    height: 57,
    justifyContent: "flex-end",
    marginRight: "2.66%",
    fontSize: 12
  },
  homeIconArea: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  homeIconContainer: {
    backgroundColor: "rgb(87,126,242)",
    height: 57,
    width: 57,
    // marginLeft: "5.3%",
    marginRight: "4%",
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
  amountTextArea: {
    flex: 2,
    top: "5%",
    width: "26.6%",
    height: "8.5%",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  amountText: {
    //backgroundColor: "gray",
    fontSize: 35,
    color: "white",
    height: 40
    // fontFamily: "serif"
  }
});

export default HomeIconFrame;
