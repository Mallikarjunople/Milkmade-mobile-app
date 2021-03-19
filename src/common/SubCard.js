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
import SubItem from "./SubItem";
const SubCard = ({navigation,route}) => {
  return (
    <TouchableOpacity style={{ backgroundColor: "white" }}
    onPress={()=>{
      navigation.navigate("SubsDetailsScreen")
    }}>
      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 10,
          borderWidth: 0.4,
          borderColor: "#D3D3D3",
          //   elevation: 1,
          //   shadowOffset: 2,
          //   shadowRadius: 5,
          //   shadowOpacity: 1,
          //   shadowColor: "grey",
          borderRadius: 20,
          padding: 10,
          flexDirection: "row",
          backgroundColor: "white",
          // justifyContent:"space-around"
        }}
      >
        <View>
          <Image
            source={images.milk4}
            style={{ height: 100, width: 100, borderRadius: 25 }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              marginLeft: 30,
              paddingHorizontal: 10,
            //   flexDirection: "row",
            //   justifyContent: "space-between",
            }}
          >
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text
              style={{
                fontSize: 16,
                color: COLORS.black,
                // alignSelf: "flex-end",
                fontWeight: "bold",
              }}
            >
              {" "}
              Package :
            </Text>
            <View
              style={{
                backgroundColor: "#FFD700",
                padding: 5,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.black,
                  alignSelf: "flex-end",
                  fontWeight: "bold",
                }}
              >
                Gold
              </Text>
            </View>
              </View>
           

            <SubItem title="Subscription ID :" value="#12345" />
            <SubItem title="Product name :" value="Fresh Milk" />
            <SubItem title="Credits Left :" value="12" />
            <View
              style={{
                borderTopWidth: 2,
                borderTopColor: "#f5f5f5",
                marginVertical: 5,
                marginHorizontal: 10,
              }}
            ></View>
            {/* <OrderTotal /> */}
          </View>
          <View
            style={{
              marginLeft: 30,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                backgroundColor: COLORS.primary,
                width: "50%",
                margin: 3,
                borderRadius: 30,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  margin: 3,
                  borderRadius: 30,
                }}
              >
                <Image
                  source={icons.minus}
                  style={{
                    width: 15,
                    height: 15,
                    // backgroundColor: "white",
                    margin: 5,
                    borderRadius: 10,
                  }}
                />
              </TouchableOpacity>

              <Text style={{ fontSize: 15, margin: 5 }}>10</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  margin: 3,
                  borderRadius: 30,
                }}
              >
                <Image
                  source={icons.plus}
                  style={{
                    width: 15,
                    height: 15,
                    // backgroundColor: "white",
                    margin: 5,
                    borderRadius: 10,
                  }}
                />
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
      </View>
      {/* <View
        style={{
          borderTopWidth: 2,
          borderTopColor: "#f5f5f5",
          marginVertical: 5,
          marginHorizontal: 20,
        }}
      ></View> */}
    </TouchableOpacity>
  );
};

export default SubCard;
