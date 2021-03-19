  
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import { icons, images, SIZES, COLORS, FONTS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {MyOrdersScreen,MySubscriptions } from "../screens";

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
  function renderHeader() {
    return (
      <View style={{ flexDirection: "row", height: 50, marginTop: 10 }}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: "center",
          }}
        >
          <Image
            source={icons.user}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
            }}
          />
        </TouchableOpacity>

        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View
            style={{
              width: "70%",
              height: "100%",
              backgroundColor: COLORS.lightGray3,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: SIZES.radius,
              flexDirection: "row",
            }}
          >
            <Text>Search by....</Text>
            <Image
              source={icons.search}
              resizeMode="contain"
              style={{
                width: 15,
                height: 15,
                marginLeft: 10,
              }}
            />
          </View>
        </View>

        {/* <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: "center",
          }}
        >
          <Ionicons name="notifications" size={24} color="black" />
        </TouchableOpacity> */}
      </View>
    );
  }
  return (
    <Tab.Navigator
      initialRouteName="My Orders"
      // lazyLoad={true}
      // tabBarPosition="top"
      // swipeEnabled={true}
      tabBarOptions={{
        activeTintColor: COLORS.white,
        style: {
          backgroundColor: COLORS.primary,
          padding:10,
        },
        
        indicatorStyle: {
          backgroundColor: COLORS.white,
          height: 3,
        },
        labelStyle: {
          fontWeight: 'bold',
          fontSize:20,
          textTransform:'none'
        },
        showIcon: true,
        
      }}
    >
    
      <Tab.Screen name="My Orders" component={MyOrdersScreen} />
      <Tab.Screen name="My Subscription" component={MySubscriptions} />
    </Tab.Navigator>
  );
};

export default TopTabNavigator;

const styles = StyleSheet.create({});