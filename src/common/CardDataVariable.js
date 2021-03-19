import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackBase,
} from "react-native";
// import {} from 'react-native-gesture-handler';
import { icons, images, COLORS, SIZES, FONTS } from "../constants/index";

const CardDataVariable = () => {
  const [fav, setfav] = useState(false);
  return (
    <View
      style={{
        backgroundColor: "#FFF",
        height: SIZES.height * 0.25,
        width: SIZES.width * 0.4,
        elevation: 2,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: SIZES.height * 0.01,
        marginHorizontal: SIZES.width * 0.02,
        marginVertical: SIZES.height * 0.01,
      }}
    >
      <Image
        source={images.milk2}
        resizeMode="cover"
        style={{
          width: "100%",
          height: "60%",
          borderRadius: 10,
          borderWidth: 1,
        }}
      />
      <View
        style={{
          borderRadius: 15,
          // borderWidth: 1,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          position: "absolute",
          right: 3,
          top: 3,
          margin: 5,
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 20,
            borderColor: COLORS.primary,
            backgroundColor: "white",
            padding: 4,
          }}
          onPress={() => {
            setfav(!fav);
          }}
        >
          <Image
            source={fav ? icons.heartGreenFilled : icons.heartGreenOutline}
            resizeMode="contain"
            style={{ width: 23, height: 23 }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Text
          style={{
            color: "#4f4a4a",
            fontSize: 18,
          }}
        >
          Regular Milk
        </Text>
      </View>
      {/* <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",

          //   borderWidth:1,
          //   backgroundColor:'red',
        }}
      >
        <Image
          source={icons.heartRed}
          resizeMode="contain"
          style={{
            width: 10,
            height: 10,
            marginHorizontal: 1,
            marginVertical: 5,
          }}
        />
        <Image
          source={icons.heartRed}
          resizeMode="contain"
          style={{ width: 10, height: 10, marginHorizontal: 1 }}
        />
        <Image
          source={icons.heartRed}
          resizeMode="contain"
          style={{ width: 10, height: 10, marginHorizontal: 1 }}
        />
        <Image
          source={icons.heartRed}
          resizeMode="contain"
          style={{ width: 10, height: 10, marginHorizontal: 1 }}
        />
        <Image
          source={icons.heartRed}
          resizeMode="contain"
          style={{ width: 10, height: 10, marginHorizontal: 1 }}
        />
      </View> */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingVertical: 3,
          borderRadius: 15,
          width: '40%',
        //   borderWidth: 1,
        //   borderColor: COLORS.primary,
         
        }}
      >
          <Text>1 Ltr.</Text>
        {/* <Text style={{ fontSize: 10 }}>1 Ltr.</Text>
        <Image
          source={icons.arrowDownGreen}
          resizeMode="contain"
          style={{ height: 10, width: 10, marginHorizontal:4 }}
        /> */}
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",

          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <View
            style={{
              width: "80%",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: COLORS.primary,
              }}
            >
              Rs. 80
            </Text>
          </View>
          <View
            style={{
              width: "20%",
              // backgroundColor:'black',
              borderRadius: 15,
              padding: 3,
              borderColor: COLORS.primary,
              borderWidth: 2,
            }}
          >
            <Image
              source={icons.plus}
              resizeMode="contain"
              style={{
                alignSelf: "flex-end",
                width: 18,
                height: 18,
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
export default CardDataVariable;
