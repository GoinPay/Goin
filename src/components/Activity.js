import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import ProfileImage from "../components/ProfileImage";
const homeIcon = require("../../assets/home-icon.png");
const starIcon = require("../../assets/star-clear.png");
const profile1 = require("../../assets/profile2.png");

export const Type = {
  Notification: "Notification",
  Generic: "Generic",
  Paid: "Paid"
};

//export const Type = type;

const Activity = props => {
  console.log("type: " + props.type + ", " + Type.Generic);
  let message = {
    when: "Today",
    title: props.title,
    message: props.message
  };

  if (props.type === Type.Notification) {
    message.icon = homeIcon;
  } else if (props.type === Type.Generic) {
    message.icon = starIcon;
  } else if (props.type === Type.Paid) {
    message.icon = profile1;
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.iconArea}>
          {props.type === Type.Paid ? (
            <ProfileImage image={profile1} />
          ) : (
            <Image style={{ width: 41, height: 41 }} source={message.icon} />
          )}
        </View>
        <View style={styles.messageArea}>
          <View style={styles.titleArea}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{message.title}</Text>
            </View>
            <View style={styles.whenContainer}>
              <Text style={styles.when}>{message.when}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.message}>{message.message}</Text>
          </View>
        </View>
      </View>
      <View style={styles.lineBorder}></View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  iconArea: {
    marginRight: 14,
    alignItems: "center"
  },
  messageArea: {
    flex: 1
  },
  titleArea: {
    flex: 1,
    flexDirection: "row"
  },
  titleContainer: {
    flex: 10
  },
  title: {
    fontSize: 17,
    color: "#fff",

    fontWeight: "bold"
  },
  message: {
    fontSize: 15,
    color: "#fff"
  },
  whenContainer: {
    flex: 2,
    marginRight: 20
  },
  when: {
    fontSize: 15,
    color: "#fff"
  },
  lineBorder: {
    flex: 1,
    borderBottomColor: "rgba(255,255,255, .2)",
    borderBottomWidth: 1,
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15,
    marginRight: 20
  }
});

export default Activity;
