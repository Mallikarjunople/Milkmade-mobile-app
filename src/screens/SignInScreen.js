import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Spinner from "react-native-loading-spinner-overlay";
// import LinearGradient from "react-native-linear-gradient";
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from "react-native-paper";
import { Axiosapi } from "../../App";

import { AuthContext } from "../components/context";
import { COLORS } from "../constants";

// import Users from '../model/users';

const SignInScreen = ({ navigation }) => {
  const [spinner, setSpinner] = React.useState(false);

  const [data, setData] = React.useState({
    phoneNumber: "",
    password: "",
  });

  const { colors } = useTheme();

  const { signIn } = React.useContext(AuthContext);

  const loginHandle=(phoneNumber,password)=>{

if(!phoneNumber || !password)
{
  Alert.alert("Insufficient fields", "Please fill all data");
}
else{
  // setSpinner(!spinner);

    Axiosapi
      .post("/api/signin", data)
      .then(async (res) => {
        // console.log(res.data);
        await AsyncStorage.setItem("userId", res.data.userId._id);
        await AsyncStorage.setItem("token", res.data.token);
        signIn()
        // navigation.navigate("SignInScreen");

    Alert.alert("Success","Signed In successfully")
    // console.log(data);
        // setSpinner(!spinner);
        setData({
          phoneNumber: "",
          password: "",
        })
      })
      .catch((err) => {
        // setSpinner(!spinner);  
        console.log(err)});
   

// navigation.navigate('SignUpScreen')

}
 }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <Spinner
        visible={spinner}
        textContent={"Loading..."}
        textStyle={{ color: "white" }}
      />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome back!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
            },
          ]}
        >
          Phone Number
        </Text>
        <View style={styles.action}>
          {/* <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                /> */}
          <TextInput
            placeholder="Phone number"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}

            value={data.phoneNumber}
            keyboardType='numeric'
            onChangeText={(val) =>  setData({...data,phoneNumber:val})}
          />
        </View>
        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
              marginTop: 35,
            },
          ]}
        >
          Password
        </Text>
        <View style={styles.action}>
          {/* <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                /> */}
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            // secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            value={data.password}

            autoCapitalize="none"
            onChangeText={(val) => setData({...data,password:val})}
          />
          {/* <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    } 
          </TouchableOpacity> */}
        </View>


    
        <View style={styles.button}>
          <TouchableOpacity
           style={[
            styles.signIn,
            {
              borderColor: COLORS.primary,
              borderWidth: 2,
              marginTop: 15,
            },
          ]}
            onPress={() => {
              loginHandle(data.phoneNumber, data.password);
            }}
          >
           
              <Text
                style={[
                  styles.textSign,
                  {
                    color: COLORS.primary,
                  },
                ]}
              >
                Sign In
              </Text>
            {/* </LinearGradient> */}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("SignUpScreen")}
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
              ]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
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
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
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
    color:'white'
  },
});
