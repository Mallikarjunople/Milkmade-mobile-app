import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import OrderCard from "../common/OrderCard";
import { icons, images, theme, COLORS, SIZES, FONTS } from "../constants";

const NotificationScreen = (props) => {
  const Header = () => {
    return (
      <View
        style={{
          backgroundColor: COLORS.primary,
          padding: 20,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <View style={{ width: "10%" }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image
              resizeMode="contain"
              style={{ height: 23, width: 23 }}
              source={icons.leftarrowwhite}
            />
          </TouchableOpacity>
        </View> */}

        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginHorizontal: 15,
            color: COLORS.black,
          }}
        >
          Notifications
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
            // paddingTop: 20,
            paddingBottom: 40,
            marginBottom: 50,
          }}
        >
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
        </ScrollView>
        {/* <Checkout/> */}
      </>
    );
  };
  return (
    <>
      {Header()}
      {Body()}
      {/* <View style={{ flex: 1,padding:5 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            width: "90%",
            height: "30%",
            backgroundColor:'green'
          }}
        >
          <WebView
            source={{
              html:
                '<iframe width="100%" height="30%" src="https://www.youtube.com/embed/cqyziA30whE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
            }}
          />
        </View>
      </View> */}
    </>
  );
};

export default NotificationScreen;
