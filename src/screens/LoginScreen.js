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

const LoginScreen = (props) => {
  //  const background=()=>{
  //      return (
  //          <>

  //          </>
  //      )
  //  }
  const [number, setNumber] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          // borderWidth: 1,
          justifyContent: "center",
          alignItems: "flex-start",
          height: SIZES.height * 0.3,
          // backgroundColor: "rgba(123,281,162, 1)",
          backgroundColor: COLORS.back,
          borderBottomRightRadius: 80,
          borderBottomLeftRadius: 80,
          // backgroundColor: COLORS.white,
          // marginHorizontal:10,
        }}
      >
        <Text
          style={{
            fontSize: 35,
            fontWeight: "bold",
            color: COLORS.white,
            margin: 20,
          }}
        >
          Welcome back !!
        </Text>
      </View>
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          // borderWidth: 1,
          height: SIZES.height * 0.5,
          borderTopRightRadius: 40,
          borderBottomRightRadius: 40,
          borderTopLeftRadius: 40,
          borderBottomLeftRadius: 40,
          // backgroundColor: "rgba(0,221,162, 0.4)",
          marginHorizontal: 10,
          marginTop: 20,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            // borderWidth: 1,
            // backgroundColor: COLORS.gray,
            width: SIZES.width,
          }}
        >
          <Text style={{ fontSize: 40, marginTop: 20 }}>Login</Text>
          {/* <Text style={{ fontSize: 15,  }}>
            Please Login to continue
          </Text> */}
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: SIZES.width,
            // borderWidth: 1,
            margin: 30,
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
              marginTop: 10,
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
        </View>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Tabs");
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
              color: COLORS.white,
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Sign In
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
          backgroundColor: COLORS.back,
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
          Don't Have an account ?
        </Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("RegisterScreen");
          }}
          style={{
            backgroundColor: COLORS.bg,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            marginBottom: SIZES.height * 0.05,
            width: "35%",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: COLORS.black,
            padding:8,

              // margin: 20,
            }}
          >
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

// import React, { useState } from "react";
// import {
//   View,
//   Image,
//   Text,
//   TouchableOpacityComponent,
//   FlatList,
//   ScrollView,
//   TouchableOpacity,
//   SafeAreaView,
//   StyleSheet,
//   TextInput,
// } from "react-native";
// import { icons, images, theme, COLORS, SIZES, FONTS } from "../constants";
// const LoginScreen = (props) => {
//   const { navigate } = props.navigation;
//   return (
//     <View style={{ backgroundColor: COLORS.smoke, height: "100%", }}>
//       {/* <Image source={images.milk} style={{ width: "100%", height: "43%" }} /> */}

//       <View
//         style={{
//           flexDirection: "row",
//           alignItems: "center",
//           marginHorizontal: 55,
//           borderWidth: 2,
//           marginTop: 50,
//           paddingHorizontal: 10,
//           borderColor: "#00716F",
//           borderRadius: 5,
//           paddingVertical: 10,
//         }}
//       >
//         {/* <Icon name="mail" color="#00716F" size={24} /> */}
//         <TextInput
//           style={{ paddingHorizontal: 10, fontSize: 20 }}
//           placeholder="Phone no."
//         />
//       </View>
//       <View
//         style={{
//           flexDirection: "row",
//           alignItems: "center",
//           marginHorizontal: 55,
//           borderWidth: 2,
//           marginTop: 15,
//           paddingHorizontal: 10,
//           borderColor: "#00716F",
//           borderRadius: 5,
//           paddingVertical: 10,
//         }}
//       >
//         {/* <Icon name="mail" color="#00716F" size={24} /> */}
//         <TextInput
//           style={{ paddingHorizontal: 10, fontSize: 20 }}
//           placeholder="Password"
//         />
//       </View>

//       <View
//         style={{
//           marginHorizontal: 55,
//           alignItems: "center",
//           justifyContent: "center",
//           marginTop: 30,
//           backgroundColor: "#00716F",
//           paddingVertical: 10,
//           borderRadius: 23,
//         }}
//       >
//         <Text
//           style={{
//             color: "white",
//             // fontFamily: "SemiBold",
//             fontWeight: "bold",
//           }}
//         >
//           Already a member
//         </Text>
//       </View>
//       <Text
//         onPress={() => navigate("Home")}
//         style={{
//           alignSelf: "center",
//           color: "#00716F",
//           //   fontFamily: "SemiBold",
//           paddingVertical: 30,
//         }}
//       >
//         New User
//       </Text>
//     </View>
//   );
// };

// export default LoginScreen;
