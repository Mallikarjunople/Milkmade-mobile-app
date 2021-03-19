import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
// import Header from "../components/Header";
import TopTabNavigator from "./TopTabNavigator";
import { OrderDetailsScreen ,SubsDetailsScreen} from "../screens";

const Stack = createStackNavigator();

const StackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="PreviousOrderScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: "black",
        },
        headerShown:false
      }}
    >
      <Stack.Screen
        name="TopTabScreen"
        component={TopTabNavigator}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="OrderDetailsScreen"
        component={OrderDetailsScreen}
      />
      <Stack.Screen
        name="SubsDetailsScreen"
        component={SubsDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export { StackNavigator };
