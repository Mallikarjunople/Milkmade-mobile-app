import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
// import {  } from "react-native-gesture-handler";
import { icons, images, theme, COLORS, SIZES, FONTS } from "../constants";

// while using checkout make sure to give it << navigation={props.navigation} >> from respective screen
const Checkout = (props) => {
  return (
    <View
      style={{
        width: "100%",
        height: "8%",
        backgroundColor: "#304150",
        marginBottom: 45,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
      }}
    >
     <View style={{ flexDirection: "column", paddingBottom: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            Rs.{" "}
          </Text>
          <Text
            style={{
              textDecorationLine: "line-through",
              color: "white",
            }}
          >
            {" "}
            {props.total_cost || ""}
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            {props.discountedPrice || ""}
          </Text>
        </View>
      </View>


      <TouchableOpacity
        onPress={() => props.navigation.navigate("SelectAddress",{
          action:'createOrder'
        })}
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          width: "30%",
          //   backgroundColor: "#304150",
          padding: 10,
          borderWidth: 1,
          borderColor: "white",
          borderRadius: 5,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
          Checkout
        </Text>
        <Image
          source={icons.rightarrowwhite}
          resizeMode="contain"
          style={{ width: 16, height: 16, marginHorizontal: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Checkout;
