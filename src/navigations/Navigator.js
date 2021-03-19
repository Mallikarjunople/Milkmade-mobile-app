import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Home,
  MyAccountScreen,
  MyCartScreen,
  MyOrdersScreen,
  ProductDetailScreen,
  ProductsScreen,
  SelectAddress,
  AddNewAddress,
  CheckoutScreen,
  SubscribeCheckout,
  OrderConfirmedScreen,
  LoginScreen,
  RegisterScreen,
  MySubscriptions,
  NotificationScreen,
  WishlistScreen,
  AllProductsScreen
} from "../screens";
import Tabs from "./Tabs";

const Stack = createStackNavigator();
const screenOptionStyle = {
  headerShown: false,
};

const HomeStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName="Tabs">
      {/* <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} /> */}

      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="AllProductsScreen" component={AllProductsScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
      />
      {/* <Stack.Screen name="ProductsScreen" component={ProductsScreen} /> */}
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="WishlistScreen" component={WishlistScreen} />
      <Stack.Screen name="MyCartScreen" component={MyCartScreen} />
      <Stack.Screen name="MyOrdersScreen" component={MyOrdersScreen} />
      <Stack.Screen name="MySubscriptions" component={MySubscriptions} />
      <Stack.Screen name="MyAccountScreen" component={MyAccountScreen} />
      <Stack.Screen name="SelectAddress" component={SelectAddress} />
      <Stack.Screen name="AddNewAddress" component={AddNewAddress} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="SubscribeCheckout" component={SubscribeCheckout} />
      <Stack.Screen
        name="OrderConfirmedScreen"
        component={OrderConfirmedScreen}
      />
    </Stack.Navigator>
  );
};
export default HomeStackNavigator;
