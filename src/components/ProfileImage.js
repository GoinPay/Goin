import React from "react";
import { View, Image, Text } from "react-native";
const blankImage = require("../../assets/blank.png");

const ProfileImage = props => {
  let showProfile = true;
  let memberInitial = "";

  if (props.name)
    memberInitial = props.name.charAt(0).toUpperCase();

  if (typeof props.isShowProfile != "undefined") {
    showProfile = props.isShowProfile;
  }

  return (
    <View style={[props.style, { top: props.isPrimary ? 8 : 0 }]}>
      <Image
        style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          display: showProfile | props.isPrimary ? "flex" : "none"
        }}
        source={props.image ? props.image : blankImage}

      />
      {props.image ? null :
        (<Text style={{ fontSize: 28, position: "absolute", left: 9, top: 0 }}>{memberInitial}</Text>)
      }
      <Image
        style={{
          width: 15,
          height: 15,
          right: -22,
          top: -40,
          display: props.isPrimary ? "flex" : "none"
        }}
        source={require("../../assets/star.png")}
      />
    </View>
  );
};

export default ProfileImage;
