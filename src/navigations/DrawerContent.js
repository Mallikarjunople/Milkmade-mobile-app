import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Linking,
  TouchableOpacity,
  Share,
} from "react-native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import {Fontisto} from "react-native-vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthContext } from "../components/context";
// import axios from "axios";
import { icons, images, theme, COLORS, SIZES, FONTS } from "../constants";
import { Axiosapi } from "../../App";

const DrawerContent = (props) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [link, setLink] = useState("https://play.google.com/store");

  const myCustomShare = async (link) => {
    try {
      const result = await Share.share({
        message: link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    const _retrieveData = async () => {
      try {
        const id = await AsyncStorage.getItem("userId");
        // console.log(id)
        if (id !== null) {
          // We have data!!
          // console.log(id);
          Axiosapi.post(`/api/user/single-user`, { uId: id }).then((res) => {
            console.log(res.data.User);
            setName(res.data.User.name);
            setNumber(res.data.User.phoneNumber);
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    _retrieveData();
  }, []);

  const { signOut } = React.useContext(AuthContext);
  return (
    <View style={{ flex: 1, backgroundColor: "rgba(0,221,162, 0.8)" }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View
              style={{
                // flexDirection: "row",
                paddingVertical: 10,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  marginLeft: 3,
                  flexDirection: "column",
                  borderWidth: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={images.avatar}
                  resizeMode="cover"
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
                <Title style={styles.title}>{name ? name : ""}</Title>
                <Caption style={styles.caption}>{number}</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            {/* <DrawerItemList {...props} /> */}
            <DrawerItem
              icon={() => (
                <Image
                  source={icons.home}
                  resizeMode="contain"
                  style={{ width: 20, height: 20, marginHorizontal: 20 }}
                />
              )}
              label="Home"
              labelStyle={{ color: "white" }}
              onPress={() => {
                props.navigation.navigate("Tabs");
              }}
            />
            {/* <DrawerItem
              icon={() => (
                <Image
                  source={icons.question}
                  resizeMode="contain"
                  style={{ width: 20, height: 20, marginHorizontal: 20 }}
                />
              )}
              label="Help Center"
              labelStyle={{ color: "white" }}
              onPress={() => {
                props.navigation.navigate("MyCartScreen");
              }}
            /> */}
            <DrawerItem
              icon={() => (
                <Image
                  source={icons.like}
                  resizeMode="contain"
                  style={{ width: 20, height: 20, marginHorizontal: 20 }}
                />
              )}
              label="Wishlist"
              labelStyle={{ color: "white" }}
              onPress={() => {
                props.navigation.navigate("WishlistScreen");
              }}
            />
            <DrawerItem
              icon={() => (
                <Image
                  source={icons.facebook}
                  resizeMode="contain"
                  style={{ width: 20, height: 20, marginHorizontal: 20 }}
                />
              )}
              label="Share"
              labelStyle={{ color: "white" }}
              onPress={() => {
                myCustomShare("https://www.logyanasolutions.com/");
              }}
            />

            {/* <DrawerItem
              icon={() => (
                <View></View> 
                
                // <FontAwesome5
                //   name="clipboard-list"
                //   size={20}
                //   color="black"
                // />
              )}
              label="आमचे कार्य"
              onPress={() => {
                props.navigation.navigate("GovtWork");
              }}
            />
            <DrawerItem
              icon={() => (
                
                <Ionicons
                  name="call"
                  size={20}
                  color="black"
                />
              )}
              label="थेट संपर्क"
              onPress={() => {
                props.navigation.navigate("ContactUs");
              }}
            />
            <DrawerItem
              icon={() => (
                
                <MaterialIcons
                  name="notifications-active"
                  size={20}
                  color="black"
                />
              )}
              label="नागरिकांसाठी सूचना"
              onPress={() => {
                props.navigation.navigate("Notification");
              }}
            />
            <DrawerItem
              icon={() => (
                <Ionicons
                  name="person"
                  size={20}
                  color="black"
                />
              )}
              label="आमच्याबद्दल माहिती"
              onPress={() => {
                props.navigation.navigate("AboutUs");
              }}
            />*/}
          </Drawer.Section>
          <Drawer.Section>
            <DrawerItem
              icon={() => (
                <Image
                  source={icons.turnoff}
                  resizeMode="contain"
                  style={{ width: 20, height: 20, marginHorizontal: 20 }}
                />
              )}
              label="Log out"
              labelStyle={{ color: "white" }}
              onPress={() => {
                console.log("Log outt");
                signOut();
                // props.navigation.navigate("MyOrdersScreen");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>

      <TouchableOpacity
        style={{
          paddingLeft: 15,
          marginBottom: 20,
          // borderWidth:1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          Linking.openURL("https://www.logyanasolutions.com/");
        }}
      >
        <Text>
          Designed And Developed By
          <View>
            <Text
              style={{
                flexWrap: "wrap",
                fontSize: 16,
                fontWeight: "bold",
                marginHorizontal: 4,
              }}
            >
              Logyana Solutions Pvt. Ltd
            </Text>
          </View>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 5,
    margin: 10,
    borderBottomColor: "#e8e8e8",
    // borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    marginTop: 3,
    // fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "white",
  },
  caption: {
    fontSize: 16,
    // lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    // marginTop: 15,
    // backgroundColor:'black',
    // opacity:.4,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    maxWidth: 50,
    paddingHorizontal: 10,
    flexWrap: "wrap",
    // borderWidth:1
    // borderTopColor: "#f4f4f4",
    // borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
