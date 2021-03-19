import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Separator from "../common/Separator";
import { icons, images, theme, COLORS, SIZES, FONTS } from "../constants";
import { Axiosapi } from "../../App";

const SubsDetailsScreen = ({ navigation, route }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [addressData, setAddressData] = useState("");
  const [data, setData] = useState(route.params.data);

  useEffect(() => {
    Axiosapi.post(`/api/address/getSingleAddress`, {
      addressId: data.address,
      userId: data.user._id,
    })
      .then((res) => setAddressData(res.data.getAddr))
      .catch((err) => console.log(err));
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
          Subscription details
        </Text>
      </View>
    );
  };

  const Body = () => {
    return (
      <>
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginHorizontal: 20,
            }}
          >
            <View
              style={{
                width: 55,
                height: 55,
                borderRadius: 50,
                margin: 20,
                overflow: "hidden",
              }}
            >
              <Image
                source={images.avatar}
                resizeMode="cover"
                style={{
                  width: "100%",
                  height: "100%",

                  //   borderRadius: 100,
                }}
              />
            </View>
            <View
              style={{
                justifyContent: "flex-start",
                alignItems: "center",
                marginHorizontal: 10,
                marginVertical: 10,
              }}
            >
              <Text
                style={{
                  alignSelf: "center",

                  color: COLORS.darkGray,
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                {data.user.name}
              </Text>
              <Text
                style={{
                  alignSelf: "center",

                  color: COLORS.darkGray,
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                +91 {data.user.phoneNumber}
              </Text>
            </View>
          </View>

          <Separator />

          <View style={{ flex: 1, marginHorizontal: 30 }}>
            <View style={{ margin: 10 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  textDecorationLine: "underline",
                }}
              >
                Details:
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 10,
                marginVertical: 10,
              }}
            >
              <Text style={{ fontSize: 16 }}>Product Name :</Text>
              <Text style={{ fontSize: 16 }}>
                {data.subscriptionProduct.subId.pName}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 10,
                marginVertical: 10,
              }}
            >
              <Text style={{ fontSize: 16 }}>Package Name :</Text>
              <Text style={{ fontSize: 16 }}>{data.package}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 10,
                marginVertical: 10,
              }}
            >
              <Text style={{ fontSize: 16 }}>Morning Time :</Text>
              <Text style={{ fontSize: 16 }}>{data.morningTime}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 10,
                marginVertical: 10,
              }}
            >
              <Text style={{ fontSize: 16 }}>Evening Time :</Text>
              <Text style={{ fontSize: 16 }}>{data.eveningTime}</Text>
            </View>
            <Separator />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 10,
                marginVertical: 10,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Credit Left :
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>{data.credits}</Text>
            </View>

            <View
              style={{
                marginHorizontal: 10,
                marginTop: 30,
                marginBottom: 10,
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={icons.location}
                  resizeMode="contain"
                  style={{ height: 12, width: 12, margin: 3 }}
                />
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 16,
                    textDecorationLine: "underline",
                  }}
                >
                  Deliver to :
                </Text>
              </View>

              {addressData ? (
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      marginVertical: 5,
                      marginHorizontal: 5,
                    }}
                  >
                    {addressData.houseNo}, {addressData.areaName},{" "}
                    {addressData.landmark}, {addressData.pincode}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </ScrollView>
      </>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {Header()}
      {Body()}
    </SafeAreaView>
  );
};

export default SubsDetailsScreen;
