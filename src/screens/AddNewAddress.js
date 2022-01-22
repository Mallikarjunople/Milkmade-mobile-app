import AsyncStorage from "@react-native-community/async-storage";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Axiosapi } from "../../App";
import { icons, images, theme, COLORS, SIZES, FONTS } from "../constants";

const AddNewAddress = (props) => {
  const [userId, setUserId] = useState("");

  const [houseNo, setHouseNo] = useState("");
  const [areaName, setAreaName] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [addressType, setAddressType] = useState("");
  console.log("Start")
  const fetchUserId = async () => {
    let getUserId = await AsyncStorage.getItem("userId");
    setUserId(getUserId);
  };
  const onSubmit = () => {
    let obj = {
      userId: userId,
      payload: {
        address: {
          houseNo,
          areaName,
          landmark,
          pincode,
          addressType
        },
      },
    };
    console.log(obj)
    // Axiosapi.post(`/api/address/create`, obj)
    //   .then((res) => console.log(res.data))
    //   .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchUserId();
    console.log(userId);
  }, []);

  const Header = () => {
    return (
      <View
        style={{
          backgroundColor: COLORS.primary,
          padding: 20,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <View style={{ width: "10%" }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image
              resizeMode="contain"
              style={{ height: 23, width: 23 }}
              source={icons.leftarrowwhite}
            />
          </TouchableOpacity>
        </View>

        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginHorizontal: 15,
            color: "white",
          }}
        >
          Add New Address
        </Text>
      </View>
    );
  };

  const Body = () => {
    return (
      <>
        <ScrollView
          style={{
            backgroundColor: "f5f5f5",
            flex: 1,
            paddingTop: 20,
            paddingBottom: 40,
            marginBottom: 50,
          }}
        >
          <View>
            <View style={{ flex: 1, marginHorizontal: 30 }}>
              <View style={{ margin: 10 }}>
                <Text style={{ color: COLORS.primary, fontSize: 18 }}>
                  House No.
                </Text>
                <TextInput
                  style={{
                    margin: 5,
                    height: 40,
                    borderColor: COLORS.primary,
                    borderBottomWidth: 1,
                  }}
                  underlineColorAndroid="transparent"
                  placeholder="House No."
                  placeholderTextColor={COLORS.gray}
                  autoCapitalize="none"
                  onChangeText={(value) => {
                    setHouseNo(value);
                  }}
                />
              </View>
              <View style={{ margin: 10 }}>
                <Text style={{ color: COLORS.primary, fontSize: 18 }}>
                  Area Name
                </Text>
                <TextInput
                  style={{
                    margin: 5,
                    height: 40,
                    borderColor: COLORS.primary,
                    borderBottomWidth: 1,
                  }}
                  underlineColorAndroid="transparent"
                  placeholder="Area Name"
                  placeholderTextColor={COLORS.gray}
                  autoCapitalize="none"
                  onChangeText={(value) => {
                    setAreaName(value);
                  }}
                />
              </View>
              <View style={{ margin: 10 }}>
                <Text style={{ color: COLORS.primary, fontSize: 18 }}>
                  Landmark
                </Text>
                <TextInput
                  style={{
                    margin: 5,
                    height: 40,
                    borderColor: COLORS.primary,
                    borderBottomWidth: 1,
                  }}
                  underlineColorAndroid="transparent"
                  placeholder="Landmark"
                  placeholderTextColor={COLORS.gray}
                  autoCapitalize="none"
                  onChangeText={(value) => {
                    setLandmark(value);
                  }}
                />
              </View>
              <View style={{ margin: 10 }}>
                <Text style={{ color: COLORS.primary, fontSize: 18 }}>
                  Pincode
                </Text>
                <TextInput
                  style={{
                    margin: 5,
                    height: 40,
                    borderColor: COLORS.primary,
                    borderBottomWidth: 1,
                  }}
                  underlineColorAndroid="transparent"
                  placeholder="Pincode"
                  placeholderTextColor={COLORS.gray}
                  autoCapitalize="none"
                  onChangeText={(value) => {
                    setPincode(value);
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 10,
                  marginHorizontal: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    // backgroundColor:'red',
                    width: "70%",
                  }}
                >
                  <Image
                    source={icons.homeblack}
                    resizeMode="contain"
                    style={{ width: 20, height: 20, marginHorizontal: 10 }}
                  />
                  <Text style={{ marginHorizontal: 10, fontSize: 15 }}>
                    Home
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderRadius: 30,
                    width: 20,
                    height: 20,
                  }}
                  onPress={()=>{
                    setAddressType('Home')
                  }}
                >
                  {/* active/selected view class */}
                  {/* <View
                    style={{
                      backgroundColor: COLORS.primary,
                      width: 10,
                      height: 10,
                      margin: 4,
                      borderRadius: 10,
                    }}
                  ></View> */}
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 10,
                  marginHorizontal: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    // backgroundColor:'red',
                    width: "70%",
                  }}
                >
                  <Image
                    source={icons.suitcase}
                    resizeMode="contain"
                    style={{ width: 20, height: 20, marginHorizontal: 10 }}
                  />
                  <Text style={{ marginHorizontal: 10, fontSize: 15 }}>
                    Work
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderRadius: 30,
                    width: 20,
                    height: 20,
                  }}
                  onPress={()=>{
                    setAddressType('Work')
                  }}
                >
                  {/* active/selected view class */}
                  <View
                    style={{
                      backgroundColor: COLORS.primary,
                      width: 10,
                      height: 10,
                      margin: 4,
                      borderRadius: 10,
                    }}
                  ></View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 10,
                  marginHorizontal: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    // backgroundColor:'red',
                    width: "70%",
                  }}
                >
                  <Image
                    source={icons.location}
                    resizeMode="contain"
                    style={{ width: 20, height: 20, marginHorizontal: 10 }}
                  />
                  <Text style={{ marginHorizontal: 10, fontSize: 15 }}>
                    Other
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderRadius: 30,
                    width: 20,
                    height: 20,
                  }}
                  onPress={()=>{
                    setAddressType('Other')
                  }}
                >
                  {/* active/selected view class */}
                  {/* <View
                    style={{
                      backgroundColor: COLORS.primary,
                      width: 10,
                      height: 10,
                      margin: 4,
                      borderRadius: 10,
                    }}
                  ></View> */}
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.primary,
                    width: "40%",
                    borderRadius: 20,
                  }}
                  onPress={() => {
                    onSubmit();
                    props.navigation.navigate("SelectAddress");
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      padding: 10,
                      color: "white",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    Add
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        {/* <Checkout/> */}
      </>
    );
  };
  return (
    <>
      {Header()}
      {Body()}
    </>
  );
};

export default AddNewAddress;
