import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
//import { NavigationNativeContainer } from "@react-navigation/native";
//import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//testing
import SelectType from "./SelectType";
import Bills from "./Bills";
import Settings from "./Settings";

const Tab = createBottomTabNavigator();

function BottomNav({ navigation }) {
  navigation.setOptions({ headerLeft: null, headerRight: null });
  return (
    <Tab.Navigator
      initialRouteName='SelectType'
      tabBarOptions={{
        showLabel: false,
        // labelStyle: null,
        style: { height: 50, backgroundColor: "rgb(25,19,64)" },
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
        source={require("../../assets/active-add.png")}
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
