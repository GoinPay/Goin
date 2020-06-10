import React from "react";
import { Image, Platform, Dimensions } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
//import { NavigationNativeContainer } from "@react-navigation/native";
//import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//testing
import SelectType from "./SelectType";
import Bills from "./Bills";
import Settings from "./Settings";
import data from '../backend/data';

export function isIphoneX() {
  const dim = Dimensions.get('window');

  return (
    // This has to be iOS
    Platform.OS === 'ios' &&
    // Check either, iPhone X or XR
    (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
  );
}

export function isIPhoneXSize(dim) {
  return dim.height == 812 || dim.width == 812;
}

export function isIPhoneXrSize(dim) {
  return dim.height == 896 || dim.width == 896;
}

const Tab = createBottomTabNavigator();

function BottomNav({ navigation }) {
  let entry = data.bottomNavEntry;
  if (entry === "") entry = "SelectType";

  console.log('isIphonex: ', isIphoneX());

  let tabHeight = 50;
  //if (Platform.OS === 'ios')
  if (isIphoneX())
    tabHeight = 90;

  navigation.setOptions({ headerLeft: null, headerRight: null });
  return (
    <Tab.Navigator
      initialRouteName={entry}
      tabBarOptions={{
        showLabel: false,
        // labelStyle: null,
        style: { height: tabHeight, backgroundColor: "rgb(25,19,64)" },
        activeBackgroundColor: "transparent", //"rgb(87,126,242)",
        tabStyle: {}
        // activeBackgroundColor: "rgb(25,19,64)"
      }}
    >
      <Tab.Screen name='Bills' component={Bills} options={options.bills} />
      <Tab.Screen
        name='SelectType'
        component={SelectType}
        options={options.add}
      />
      <Tab.Screen
        name='Settings'
        component={Settings}
        options={options.settings}
      />
    </Tab.Navigator>
  );
}

const options = {
  bills: {
    animate: false,
    titleDisplayMode: "alwaysHide",
    tabBarIcon: () => (
      <Image
        style={{ width: 25, height: 25 }}
        source={require("../../assets/inactive-menu.png")}
      />
    )
  },
  add: {
    tabBarIcon: () => (
      <Image
        style={{ width: 25, height: 25 }}
        source={require("../../assets/inactive-add.png")}
      />
    )
  },
  settings: {
    tabBarIcon: () => (
      <Image
        style={{ width: 22, height: 25 }}
        source={require("../../assets/inactive-setting.png")}
      />
    )
  }
};
export default BottomNav;
