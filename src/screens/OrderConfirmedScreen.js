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
} from "react-native";
import { icons, images, theme, COLORS, SIZES, FONTS } from "../constants";
const OrderConfirmedScreen = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center",
    backgroundColor: COLORS.white,
  }}>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          //   borderWidth: 1,
          margin: 10,
        }}
      >
        <Text
          style={{
            padding: 10,
            marginBottom: 40,
            color: COLORS.darkGray,
            fontWeight: "bold",
            fontSize: 30,
          }}
        >
          Order Confirmed !!
        </Text>
        <Image
          source={images.OrderConfirmed}
          resizeMode="contain"
          style={{ width: SIZES.width, height: SIZES.height * 0.5 }}
        />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Tabs");
          }}
          style={{
            backgroundColor: COLORS.primary,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            marginTop: 70,
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
            Continue shopping
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderConfirmedScreen;
