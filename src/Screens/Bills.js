import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform
} from "react-native";
import HomeIconFrame from "../components/HomeIconFrame";
import CustomButton from "../components/CustomButton";
import Card from "../components/Card";
import ProfileImage from "../components/ProfileImage";
import Activity, { Type } from "../components/Activity";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import data from "../backend/data";

const primaryImage = require("../../assets/me.png");
const addIcon = require("../../assets/inactive-add.png");
const profile1 = require("../../assets/profile1.png");
const profile2 = require("../../assets/profile2.png");

let isIos = false;
if (Platform.OS === 'ios')
  isIos = true;

const Bills = ({ navigation }) => {
  const [bills, setBills] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [members, setMembers] = useState([]);
  const [isBounces, setBounces] = useState(false);
  const carousel = useRef();

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

  const { width } = Dimensions.get('window');

  const getData = () => {
    data.db.getUserBills(data.userEmail).then((bills) => {
      // console.log('getData bills: ' + JSON.stringify(bills));  
      setBills(bills);
      const billMembers = data.db.getBillMembers(bills[0].name);
      setMembers(billMembers);
    });
  }

  const onAdd = () => {
    navigation.navigate("SendInvite");
  }

  const getPagination = () => {
    return (
      <Pagination
        dotsLength={bills.length}
        activeDotIndex={activeSlide}
        containerStyle={{ paddingVertical: 0, backgroundColor: 'transparent', marginBottom: "12%" }}
        dotStyle={{
          width: 6,
          height: 6,
          borderRadius: 3,
          marginHorizontal: 0.1,
          backgroundColor: 'rgba(255, 255, 255, 0.92)'
        }}
        inactiveDotStyle={{
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  useEffect(() => {
    data.db.setChangedCallback(getData);
    getData();
    navigation.addListener("focus", () => {
      setIconState(true);
    });
    const unsubscribe = navigation.addListener("blur", () => {
      setIconState(false);
    });

    return unsubscribe;
  }, []);


  const onSlideCard = (index) => {
    //setIndex(index);
    setActiveSlide(index);
    const members = data.db.getBillMembers(bills[index].name);
    setMembers(members);
  }

  _renderItem = ({ item }) => {
    console.log('bill len: ' + bills.length);
    console.log('item: ' + JSON.stringify(item));

    if (bills.length) {
      const bill = item;
      let yourDue = data.yourDue[bill.name];
      if (members.length) {
        var dueNumber = Number(yourDue.replace(/[^0-9\.]+/g, ""));
        // console.log("due number: " + dueNumber);
        //console.log("members len: " + members.length);
        yourDue = dueNumber / members.length;
        // console.log("due numb: " + yourDue);
        yourDue = "$" + yourDue.toString()
        // console.log("computed due: " + yourDue);
      }
      let payload = {
        bill: bill[bill.name],
        yourDue: yourDue
      }

      if (isIos) {
        return (
          <View style={styles.cardContainer}
            onStartShouldSetResponder={() => true} //this will make the card swipable on IOS
          >
            <Card payload={payload} />
          </View>
        );
      } else {
        return (
          <View style={styles.cardContainer}>
            <Card payload={payload} />
          </View>
        );
      }
    } else
      return <View style={styles.cardContainer} />
  }

  return (
    <HomeIconFrame
      title='Bills'
      hideHomeIcon={true}
      preTitle='Grouped payment'
      showPrimaryHolder={true}
    >
      <View style={styles.container} onStartShouldSetResponder={() => true}>
        <View style={{ height: 220 }}>
          <Carousel
            // ref={carousel}
            removeClippedSubviews={false} //without this, it won't display a singe card on IOS
            data={bills}
            style={{ width: width, maxHeight: 225 }}
            itemWidth={width - 50}
            sliderWidth={width}
            onSnapToItem={(index) => onSlideCard(index)}
            renderItem={_renderItem}
          />
          <View style={styles.paginationContainer}>
            {getPagination()}
          </View>
        </View>
        <View style={styles.peopleGroupContainer} >
          <Text style={styles.peopleCaption}>People in the group</Text>
          <ScrollView
            horizontal
            style={styles.peopleScrollView}
            contentContainerStyle={{ height: 80 }}
          >
            <View style={styles.people}>
              <TouchableOpacity onPress={onAdd}>
                <Image style={{ width: 24, height: 24 }} source={addIcon} />
              </TouchableOpacity>
            </View>
            {members.map((member, key) => {
              return (
                <View style={styles.people} key={key}>
                  <ProfileImage image={key == 0 ? primaryImage : null} isPrimary={member[member.name].isPrimary} name={member.name} />
                </View>
              )
            })}
          </ScrollView>
        </View>
        <View style={styles.activitiesContainer}>
          <Text style={styles.activityCaption}>Activities</Text>
          <ScrollView scrollEnabled={true} contentContainerStyle={{ flexGrow: 1 }}>
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
            <Activity
              title='Alex'
              type={Type.Paid}
              message='Alex has paid the split amount'
            />
            <Activity
              title='Notification'
              type={Type.Notification}
              message='A reminder was sent to everyone.'
            />
          </ScrollView>
        </View>
      </View>
    </HomeIconFrame>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //height: "85%"
    //backgroundColor: "green"
  },
  paginationContainer: {
    height: "5%",
    //backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5%"
  },
  cardContainer: {
    flex: 1,
    //height: 184,
    // marginTop: -30,
    alignItems: "center",
    marginBottom: 0,
    //backgroundColor: "gray"
  },
  peopleCaption: {
    alignItems: "flex-start",
    marginBottom: 14,
    color: "#fff"
  },
  peopleGroupContainer: {
    alignItems: "flex-start",
    marginLeft: 20,
    marginBottom: 20
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
    flex: 1,
    zIndex: 1001
    //height: "35%"
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
