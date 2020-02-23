import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import HomeIconFrame from "../components/HomeIconFrame";
import CustomButton from "../components/CustomButton";
import Card from "../components/Card";
import ProfileImage from "../components/ProfileImage";
import Activity, { Type } from "../components/Activity";

const primaryImage = require("../../assets/me.png");
const addIcon = require("../../assets/inactive-add.png");
const profile1 = require("../../assets/profile1.png");
const profile2 = require("../../assets/profile2.png");

const Bills = ({ navigation }) => {
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
              ? require("../../assets/active-menu.png")
              : require("../../assets/inactive-menu.png")
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
    <HomeIconFrame
      title='Bills'
      hideHomeIcon={true}
      preTitle='Grouped payment'
      showPrimaryHolder={true}
    >
      <View style={styles.container} onStartShouldSetResponder={() => true}>
        <View style={styles.cardContainer}>
          <Card />
        </View>
        <View style={styles.peopleGroupContainer}>
          <Text style={styles.peopleCaption}>People in the group</Text>
          <ScrollView
            horizontal
            style={styles.peopleScrollView}
            contentContainerStyle={{ height: 80 }}
          >
            <View style={styles.people}>
              <TouchableOpacity>
                <Image style={{ width: 24, height: 24 }} source={addIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.people}>
              <ProfileImage image={primaryImage} isPrimary={true} />
            </View>
            <View style={styles.people}>
              <ProfileImage image={profile1} />
            </View>
            <View style={styles.people}>
              <ProfileImage image={profile2} />
            </View>
            <View style={styles.people}>
              <ProfileImage />
            </View>
            <View style={styles.people}>
              <ProfileImage />
            </View>
          </ScrollView>
        </View>
        <View style={styles.activitiesContainer}>
          <Text style={styles.activityCaption}>Activities</Text>
          <View style={styles.activities}>
            <ScrollView style={styles.activitiesScrollView}>
              <Activity
                title='Dung'
                type={Type.Paid}
                message='Dung has paid the split amount'
              />
              <Activity
                title='Everyone has paid'
                type={Type.Generic}
                message='All dues are collected. Please pay the bill now.'
              />
              <Activity
                title='Notification'
                type={Type.Notification}
                message='A reminder was sent to everyone.'
              />
            </ScrollView>
          </View>
        </View>
      </View>
    </HomeIconFrame>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
    //  backgroundColor: "gray"
  },
  cardContainer: {
    // marginTop: -30,
    alignItems: "center",
    marginBottom: "12%"
  },
  peopleCaption: {
    alignItems: "flex-start",
    marginBottom: 14,
    color: "#fff"
  },
  peopleGroupContainer: {
    alignItems: "flex-start",
    marginLeft: 20,
    marginBottom: 41
    // backgroundColor: "gray"
  },
  peopleScrollView: {
    flexDirection: "row"
    // marginVertical: 18
  },
  people: {
    flex: 1,
    backgroundColor: "rgb(44,69,180)", //"rgb(25,19,64)",
    height: 68,
    width: 68,
    marginRight: 18,
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
  activityCaption: {
    alignItems: "flex-start",
    marginBottom: 14,
    color: "#fff"
  },
  activitiesContainer: {
    marginLeft: 20,
    flex: 1
    //backgroundColor: "gray"
  },
  activities: {
    flex: 1
    //backgroundColor: "gray"
  },
  activitiesScrollView: {
    flex: 1
    //backgroundColor: "gray"
  }
});

export default Bills;
