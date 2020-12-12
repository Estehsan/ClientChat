import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions
} from "react-native";
import firebase from "../../database/firebase";

export default function App({ ...props }) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        props.navigation.navigate("Chat");
      }
    });
  }, []);

  return (
    <View style={styles.getStarted}>
      <View>
        <View
          style={{
            //display: "flex",
            alignSelf: "center"
            //marginTop: 10

            //marginBottom: 30
          }}
        >
          <Image
            source={require("../../../assets/logo-outline.png")}
            style={{ width: 150, height: 150 }}
          />
        </View>

        <View>
          <Text style={styles.Stockchat}> Stock Chat</Text>
        </View>

        <View>
          <Text style={styles.subtext}>Connect with investors</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.getstartedButton}
          onPress={() => props.navigation.push("ChoosingUsername")}
        >
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              color: "white",
              fontWeight: "600"
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>

        <View>
            <Text onPress={() => props.navigation.push("Login")} style={styles.HaveAccount}>
              Already have an account? Sign In
            </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  getstartedButton: {
    backgroundColor: "#147efb",
    padding: 15,
    borderRadius: 30,
    width: 300,
    marginTop: 150
  },
  getStarted: {
    flex: 1,
    paddingTop: 150,
    alignItems: "center",
    //alignSelf: "center",
    //backgroundColor: "#1E2429",
    backgroundColor: "white",
    width: Dimensions.get("screen").width
  },

  HaveAccount: {
    color: "black",
    textAlign: "center",
    top: 35,
    fontSize: 15
  },
  Stockchat: {
    color: "#1E2429",
    textAlign: "center",
    fontSize: 50,
    fontWeight: "800"
    //fontFamily: "Montserrat_700Bold"
  },
  subtext: {
    color: "black",
    textAlign: "center",
    //top: 35,
    paddingVertical: 20,
    fontSize: 20,
    marginHorizontal: 40
  }
});
