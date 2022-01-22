import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacityComponent,
  FlatList,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from "react-native";
import { icons, images, theme, COLORS, SIZES, FONTS } from "../constants";

const RegisterScreen = (props) => {
  //  }
  const [name, setName] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          // borderWidth: 1,
          justifyContent: "center",
          alignItems: "flex-start",
          height: SIZES.height * 0.2,
          backgroundColor: "rgba(123,212,162, 1)",
          borderBottomRightRadius: 80,
          borderBottomLeftRadius: 80,
          // backgroundColor: COLORS.white,
          // marginHorizontal:10,
        }}
      >
        <Text
          style={{
            fontSize: 39,
            fontWeight: "bold",
            color: COLORS.white,
            margin: 40,
          }}
        >
          MilkMade
        </Text>
      </View>
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          // borderWidth: 1,
          height: SIZES.height * 0.6,
          borderTopRightRadius: 40,
          borderBottomRightRadius: 40,
          borderTopLeftRadius: 40,
          borderBottomLeftRadius: 40,
          // backgroundColor: "rgba(0,221,162, 0.4)",
          marginHorizontal: 20,
          marginTop: 20,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-start",
            // borderWidth: 1,
            // backgroundColor: COLORS.gray,
            width: SIZES.width - 40,
          }}
        >
          {/* <Text
            style={{
              fontSize: 35,
              fontWeight: "bold",
              marginTop: 20,
              marginHorizontal: 20,
            }}
          >
            Register
          </Text> */}
          {/* <Text
            style={{ fontSize: 15, fontWeight: "bold", margin: 20 }}
          >
            Please Register to continue
          </Text> */}
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: SIZES.width,
            // borderWidth: 1,
            // margin: 30,
            // backgroundColor: COLORS.gray,
          }}
        >
          <TextInput
            style={{
              height: 60,
              width: "70%",
              fontSize: 20,
              color: COLORS.darkGray,
              paddingTop: 10,
              paddingLeft: 10,
              // marginTop: 10,
              // marginHorizontal: 10,
              borderColor: "gray",
              borderBottomWidth: 1,
              borderRadius: 10,
            }}
            onChangeText={(name) => setName(name)}
            value={name}
            placeholder="Full Name"
            textContentType="name"
          />
          <TextInput
            style={{
              height: 60,
              width: "70%",
              fontSize: 20,
              color: COLORS.darkGray,
              paddingTop: 10,
              paddingLeft: 10,
              // marginTop: 10,
              // marginHorizontal: 10,
              borderColor: "gray",
              borderBottomWidth: 1,
              borderRadius: 10,
            }}
            onChangeText={(email) => setEmail(email)}
            value={email}
            placeholder="Email"
            textContentType="emailAddress"
          />
          <TextInput
            style={{
              height: 60,
              width: "70%",
              fontSize: 20,
              color: COLORS.darkGray,
              paddingTop: 10,
              paddingLeft: 10,
              // marginTop: 10,
              // marginHorizontal: 10,
              borderColor: "gray",
              borderBottomWidth: 1,
              borderRadius: 10,
            }}
            onChangeText={(number) => setNumber(number)}
            value={number}
            placeholder="Phone Number"
            textContentType="username"
          />
          <TextInput
            style={{
              height: 60,
              width: "70%",
              fontSize: 20,
              color: COLORS.darkGray,
              paddingTop: 10,
              paddingLeft: 10,
              marginBottom: 10,
              // marginHorizontal: 10,
              borderColor: "gray",
              borderBottomWidth: 1,
              borderRadius: 10,
            }}
            onChangeText={(password) => setPassword(password)}
            value={password}
            placeholder="Password"
            textContentType="password"
            secureTextEntry
          />
          <TextInput
            style={{
              height: 60,
              width: "70%",
              fontSize: 20,
              color: COLORS.darkGray,
              paddingTop: 10,
              paddingLeft: 10,
              marginBottom: 10,
              // marginHorizontal: 10,
              borderColor: "gray",
              borderBottomWidth: 1,
              borderRadius: 10,
            }}
            onChangeText={(confirmPassword) =>
              setConfirmPassword(confirmPassword)
            }
            value={confirmPassword}
            placeholder="Confirm password"
            textContentType="password"
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("LoginScreen");
          }}
          style={{
            backgroundColor: COLORS.back,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 30,
            marginBottom: SIZES.height * 0.05,
            marginTop: 20,
            width: "30%",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              padding: 10,
              color: "white",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          // borderWidth: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          height: SIZES.height * 0.3,
          // backgroundColor: "rgba(123,281,162, 1)",
          backgroundColor: " rgba(123,212,162, 1)",
          borderTopRightRadius: 80,
          borderTopLeftRadius: 80,
          marginTop: 20,
          // backgroundColor: COLORS.white,
          // marginHorizontal:10,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            // fontWeight: "bold",
            color: COLORS.darkGray,
            margin: 5,
          }}
        >
          Already Have an account ?
        </Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("LoginScreen");
          }}
          style={{
            backgroundColor: COLORS.white,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            marginBottom: SIZES.height * 0.05,
            width: "40%",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: COLORS.black,
              padding: 10,

              // margin: 20,
            }}
          >
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;