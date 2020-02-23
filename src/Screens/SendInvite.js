import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import HomeIconFrame from "../components/HomeIconFrame";
import CustomButton from "../components/CustomButton";
import * as Random from "../Utils/RandomCodeGenerator";
import * as SMS from "expo-sms";

const SendInvite = ({ navigation }) => {
  navigation.setOptions({ headerLeft: null });

  const getNewCode = () => {
    let code = Random.TextCode(3);
    code = code.toUpperCase();
    code = code + "-" + Random.NumCode(3);
    return code;
  };

  const code = getNewCode();

  const sendSMS = async () => {
    //const { status } = await Expo.Permissions.askAsync(Expo.Permissions.SMS);
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync(
        "",
        `Join my SplitEven! Use my invite code ${code}. Download the app here: URL`
      );
      Alert.alert("Successfully sent an invite.");
    } else {
      Alert.alert("Opps! There is no SMS App available!");
    }
  };

  const onInvite = () => {
    // navigation.navigate("JoinGroup");
    sendSMS();
  };
  return (
    <HomeIconFrame
      title='Send Invite'
      subTitle='Apartment Rent:'
      showProfile={false}
    >
      <View style={styles.container}>
        <View style={styles.codeContainer}>
          <Text style={styles.code}>{code}</Text>
        </View>
        <View style={styles.instructionContainer}>
          <Text style={styles.instruction}>
            Share this code with the people you want to split your payment
          </Text>
        </View>
        <CustomButton onPress={onInvite} title='Send Invite' />
      </View>
    </HomeIconFrame>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "6.75%"
  },
  codeContainer: {},
  code: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold"
  },
  instructionContainer: {
    marginBottom: "6%",
    width: "69%",
    justifyContent: "center",
    alignItems: "center"
  },
  instruction: {
    fontSize: 14,
    color: "#fff",
    textAlignVertical: "center",
    textAlign: "center"
  },
  buttonContainer: {}
});

export default SendInvite;
