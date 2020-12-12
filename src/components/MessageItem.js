import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import firebase, { firestore } from "./../database/firebase";
import { Feather } from "@expo/vector-icons";

function getTime(date) {
  try {
    date = date.toDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var newformat = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + minutes + " " + newformat;
  } catch (err) {
    console.log(err);
    return "";
  }
}

const MessageItem = ({ item, image, message }) => {
  const userID = firebase.auth().currentUser.uid;
  function messageView() {
    if (userID === item.senderId) {
      return (
        <View style={styles.SentContainer}>
          <View style={styles.sentBubble}>
            <Text style={styles.sentMessage}>{item.message}</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.duration}>{item.senderEmail}</Text>
            <Text style={styles.duration}>
              {item.date_time !== undefined && item.date_time != null
                ? getTime(item.date_time)
                : ""}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.receivedContainer}>
          <Image source={{ uri: image }} style={styles.img} />
          <View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.recievedBubble}>
                <Text style={styles.message}>{item.message}</Text>
              </View>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: 10
                }}
                // onPress={() => props.navigation.navigate("AddGroup")}
              >
                <Feather name="trending-up" size={20} color="lightgrey" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-separated"
              }}
            >
              <Text style={styles.recievedDuration}>{item.senderEmail}</Text>
              <Text style={styles.recievedDuration}>
                {item.date_time !== undefined && item.date_time != null
                  ? getTime(item.date_time)
                  : ""}
              </Text>
            </View>
          </View>
        </View>
      );
    }
  }
  return messageView();
};

export default MessageItem;
const styles = StyleSheet.create({
  duration: {
    color: "#b6b6b6",
    fontSize: 11,
    marginLeft: 15,
    marginTop: 5,
    fontFamily: "Montserrat_600SemiBold",
    textAlign: "right"
  },

  recievedDuration: {
    color: "#b6b6b6",
    fontSize: 11,
    marginRight: 15,
    marginTop: 5,
    fontFamily: "Montserrat_600SemiBold",
    textAlign: "left"
  },
  receivedContainer: {
    flexDirection: "row",
    marginTop: 20,
    width: 250
  },
  SentContainer: {
    marginVertical: 15,
    alignSelf: "flex-end",
    borderRadius: 30
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#000",
    marginRight: 10
  },
  message: {
    fontSize: 14,
    marginHorizontal: 15,
    fontFamily: "Montserrat_700Bold"
  },
  sentMessage: {
    fontSize: 14,
    marginHorizontal: 15,
    fontFamily: "Montserrat_700Bold",
    color: "#FFF"
  },
  sentBubble: {
    backgroundColor: "#147efb",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomRightRadius: 5
  },
  recievedBubble: {
    backgroundColor: "lightgrey",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 5
  }
});
