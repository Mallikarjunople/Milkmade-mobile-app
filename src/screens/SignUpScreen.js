import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
// import LinearGradient from 'react-native-linear-gradient';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import {
//   FontAwesome,
//   Fontisto,
//   MaterialCommunityIcons,
//   AntDesign,
//   Feather,
// } from "react-native-vector-icons";
import { AuthContext } from "../components/context";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { COLORS } from "../constants/theme";
import Spinner from "react-native-loading-spinner-overlay";
import { Axiosapi } from "../../App";

const SignUpScreen = ({ navigation }) => {
  const [spinner, setSpinner] = React.useState(false);
  const [feedData, setFeedData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const { signUp } = React.useContext(AuthContext);

  const onSubmit = () => {
    console.log(feedData);

    if (
      feedData.name === "" ||
      feedData.email === "" ||
      feedData.phoneNumber === "" ||
      feedData.password === ""
    ) {
      Alert.alert("All Fields are required", "");
    } else {
      // else if (feedData.phoneNumber.length != 10) {
      //   Alert.alert("Invalid Phone Number", "");
      // }

      navigation.navigate("SignInScreen");

      //   setSpinner(!spinner);
      Axiosapi.post("/api/signup", feedData)
        .then(async (res) => {
          console.log(res.data);
          // navigation.navigate("SignInScreen");
          // setSpinner(!spinner);
          setFeedData({
            name: "",
            email: "",
            phoneNumber: "",
            password: "",
          });
        })
        .catch((err) => {
          // setSpinner(!spinner);
          console.log(err);
        });
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.bg} barStyle="light-content" />
      <Spinner
        visible={spinner}
        textContent={"Loading..."}
        textStyle={{ color: "white" }}
      />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome to Milkwale</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>Name</Text>
          <View style={styles.action}>
            {/* <FontAwesome name="user-o" color="#05375a" size={20} /> */}
            <TextInput
              placeholder="Name"
              style={styles.textInput}
              autoCapitalize="none"
              name="name"
              onChangeText={(e) => setFeedData({ ...feedData, name: e })}
            />
          </View>
          {/* <Text style={styles.text_footer}>Date Of Birth</Text>
          <View style={styles.action}>
            <Fontisto name="date" color="#05375a" size={20} />
            <TextInput
              placeholder="dd-mm-yyyy"
              style={styles.textInput}
              autoCapitalize="none"
              name="email"
              onChangeText={(e) => setFeedData({ ...feedData, email: e })}
            />
          </View> */}
          <Text style={styles.text_footer}>E-mail</Text>
          <View style={styles.action}>
            {/* <MaterialCommunityIcons
              name="email-outline"
              color="#05375a"
              size={22}
            /> */}
            <TextInput
              placeholder="E-mail"
              style={styles.textInput}
              autoCapitalize="none"
              name="email"
              onChangeText={(e) => setFeedData({ ...feedData, email: e })}
            />
          </View>
          <Text style={styles.text_footer}>Phone No.</Text>
          <View style={styles.action}>
            {/* <AntDesign name="phone" color="#05375a" size={20} /> */}
            <TextInput
              placeholder="Phone No."
              style={styles.textInput}
              autoCapitalize="none"
              keyboardType="numeric"
              name="phoneNumber"
              onChangeText={(e) => setFeedData({ ...feedData, phoneNumber: e })}
            />
          </View>
          {/* <Text style={styles.text_footer}>Address</Text>
          <View style={styles.action}>
          <FontAwesome name="address-book-o" color="#05375a" size={20} /> 
            <TextInput
              placeholder="Address"
              style={styles.textInput}
              autoCapitalize="none"
              name="address"
              onChangeText={(e) => setFeedData({ ...feedData, address: e })}
            />
          </View> */}
          <Text style={styles.text_footer}>Password</Text>
          <View style={styles.action}>
            {/* <Feather name="lock" color="#05375a" size={20} /> */}
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              style={styles.textInput}
              autoCapitalize="none"
              name="password"
              onChangeText={(e) => setFeedData({ ...feedData, password: e })}
            />
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => onSubmit()}
              style={[
                styles.signIn,
                {
                  borderColor: COLORS.primary,
                  borderWidth: 2,
                  marginTop: 15,
                },
              ]}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: COLORS.primary,
                  },
                ]}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => navigation.navigate("SignInScreen")}
            style={[
              styles.signIn,
              {
                backgroundColor: COLORS.primary,
                // borderWidth: 1,
                marginTop: 15,
              },
            ]}
          >
            <Text
              style={[
                styles.textSign,
                {color:'white'}
              ]}
            >
              Sign In
            </Text>
          </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    // borderWidth:1,
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 10,
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 5,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  color_textPrivate: {
    color: "grey",
  },
});
