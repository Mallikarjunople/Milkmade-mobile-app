import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Axiosapi } from "../../App";
import Separator from "../common/Separator";
import { icons, images, theme, COLORS, SIZES, FONTS } from "../constants";

const SelectAddress = ({ navigation, route }) => {
  const [userId, setUserId] = useState("");
  const [action, setAction] = useState(route.params.action);
  const [productData, setProductData] = useState(route.params.productData);
  const [selectedData, setSelectedData] = useState(route.params.selectedData);
  const [originalPrice, setOriginalPrice] = useState(
    route.params.originalPrice
  );
  const [discountedPrice, setDiscountedPrice] = useState(
    route.params.discountedPrice
  );

  const [selectedAddress, setSelectedAddress] = useState("");
  const [allAddresses, setAllAddresses] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const _retrieveData = async () => {
        try {
          const id = await AsyncStorage.getItem("userId");
          
          if (id !== null) {
            Axiosapi.post(`/api/address/getAllAddress`, { userId: id })
            .then(
              (res) => {
                console.log(res.data.userAddress);
                setAllAddresses(res.data.userAddress.address);
              }
            )
            .catch(err=>{
              console.log(err)
              setAllAddresses([])
              console.log("Request failed")
            })
          }
        } catch (error) {
          console.log(error);
        }
      };

      _retrieveData();
    }, [])
  );

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
          <TouchableOpacity onPress={() => navigation.goBack()}>
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
          Select address
        </Text>
      </View>
    );
  };

  const Body = () => {
    return (
      <>
        <View
          style={{
            backgroundColor: "f5f5f5",
            flex: 1,
            paddingTop: 20,
            paddingBottom: 40,
            marginBottom: 50,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddNewAddress");
            }}
          >
            <Text style={{ fontSize: 24, color: COLORS.primary }}>
              + Add Address
            </Text>
          </TouchableOpacity>
          <ScrollView style={{ flex: 1, width: "100%", marginTop: 20 }}>
            {allAddresses? (allAddresses.map((item, index) => {
              return (
                <View key={index}>
                  <TouchableWithoutFeedback
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      margin: 25,
                    }}
                    onPress={() => {
                      setSelectedAddress(item._id);
                    }}
                  >
                    <View
                      style={{
                        borderWidth: 1,
                        borderRadius: 30,
                        width: 20,
                        height: 20,
                      }}
                    >
                      {selectedAddress == item._id ? (
                        <View
                          style={{
                            backgroundColor: COLORS.primary,
                            width: 10,
                            height: 10,
                            margin: 4,
                            borderRadius: 10,
                          }}
                        ></View>
                      ) : null}
                    </View>
                    <View style={{ display: "flex", width: "60%" }}>
                      <Text style={{ fontWeight: "bold" }}>
                        {item.addressType || "Unknown"}
                      </Text>
                      <Text style={{ fontSize: 13, color: COLORS.gray }}>
                        {item.houseNo},{item.areaName},{item.landmark}-
                        <Text> </Text>
                        {item.pincode}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <View>
                    <Separator />
                  </View>
                </View>
              );
            })):(
              <View>
              <Text style={{fontSize:20,fontWeight:'bold'}}> 
                No addresses found
              </Text>
              </View>
            )}
          </ScrollView>
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
                if (selectedAddress) {
                  navigation.navigate("CheckoutScreen", {
                    addressData: selectedAddress,
                    action: action,
                    productData: productData,
                    selectedData: selectedData,
                    originalPrice: originalPrice,
                    discountedPrice: discountedPrice,
                  });
                } else {
                  Alert.alert("Please select address", "");
                }
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
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>

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

export default SelectAddress;
