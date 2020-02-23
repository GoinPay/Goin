import React from "react";
import { StyleSheet, View, Image } from "react-native";
import HomeIconFrame from "../components/HomeIconFrame";

const Settings = ({ navigation }) => {
  const setIconState = isActive => {
    let width = 22;
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
              ? require("../../assets/active-setting.png")
              : require("../../assets/inactive-setting.png")
          }
        />
      )
    });
  };

  React.useEffect(() => {
    navigation.addListener("focus", () => {
      setIconState(true);
    });
    const unsubscribe = navigation.addListener("blur", () => {
      setIconState(false);
    });

    return unsubscribe;
  }, []);
  return (
    <HomeIconFrame title='Settings' hideHomeIcon={true} showProfile={false}>
      <View style={styles.container}></View>
    </HomeIconFrame>
  );
};

const styles = StyleSheet.create({
  background: {
    height: "100%",
    width: "100%"
  }
});

export default Settings;
