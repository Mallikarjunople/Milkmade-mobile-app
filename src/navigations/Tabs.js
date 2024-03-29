import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  createBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/bottom-tabs";
import { StackNavigator } from './StackNavigator';
// import Svg, { Path } from 'react-native-svg';
import { isIphoneX } from "react-native-iphone-x-helper";
// import { FontAwesome5 } from '@expo/vector-icons';

import {
  MyCartScreen,
  MyOrdersScreen,
  Home,
  MyAccountScreen,
} from "../screens";

import { icons, images, theme, COLORS, SIZES, FONTS } from "../constants";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {
  var isSelected = accessibilityState.selected;

  // if (isSelected) {
  //     return (
  //         <View style={{ flex: 1, alignItems: "center" }}>
  //             <View style={{ flexDirection: 'row', position: 'absolute', top: 0 }}>
  //                 <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
  //                 <Svg
  //                     width={75}
  //                     height={61}
  //                     viewBox="0 0 75 61"
  //                 >
  //                     <Path
  //                         d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
  //                         fill={COLORS.white}
  //                     />
  //                 </Svg>
  //                 <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
  //             </View>

  //             <TouchableOpacity
  //                 style={{
  //                     top: -22.5,
  //                     justifyContent: 'center',
  //                     alignItems: 'center',
  //                     width: 50,
  //                     height: 50,
  //                     borderRadius: 25,
  //                     backgroundColor: COLORS.white
  //                 }}
  //                 onPress={onPress}
  //             >
  //                 {children}
  //             </TouchableOpacity>
  //         </View>
  //     )
  // } else {
  //     return (
  //         <TouchableOpacity
  //             style={{
  //                 flex: 1,
  //                 height: 60,
  //                 backgroundColor: COLORS.white
  //             }}
  //             activeOpacity={1}
  //             onPress={onPress}
  //         >
  //             {children}
  //         </TouchableOpacity>
  //     )
  // }
  if (isSelected) {
    return (
      <View style={{ flex: 1, alignItems: "center",backgroundColor:COLORS.primary, }}>
        <TouchableOpacity
          style={{
            top: -20.5,
            justifyContent: "center",
            alignItems: "center",
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: COLORS.white,
            borderWidth: 0.5,
            borderColor: COLORS.lightGray,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 1,
            shadowRadius: 2,
            elevation: 15,
          }}
          onPress={onPress}
        >
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: COLORS.primary,
        }}
        // activeOpacity={1}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    );
  }
};

const CustomTabBar = (props) => {
  if (isIphoneX()) {
    return (
      <View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 30,
            backgroundColor: COLORS.white,
          }}
        ></View>
        <BottomTabBar {...props.props} />
      </View>
    );
  } else {
    return <BottomTabBar {...props.props} />;
  }
};

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          left: 0,
          bottom: 0,
          right: 0,
          borderTopWidth: 0,
          backgroundColor: COLORS.lightGray4,
          elevation: 0,
        },
      }}
      tabBar={(props) => <CustomTabBar props={props} />}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home Icon"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.homeblack}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : 'white',
              }}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Basket"
        component={MyCartScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.shoppingcart}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : 'white',
              }}
            />
            // <FontAwesome5 name="shopping-cart" size={25} color={col}/>
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
       <Tab.Screen
        name="MyOrdersScreen"
        component={StackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.order}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : 'white',
              }}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="User"
        component={MyAccountScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.user}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : 'white',
              }}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
