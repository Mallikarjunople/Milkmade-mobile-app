import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { icons, images, COLORS, SIZES, FONTS } from "../constants/index";
const AddToWishlist = () => {
  const [fav, setfav] = useState(false);
  return (
    <View
      style={{
        borderRadius: 15,
        // borderWidth: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        // position: "absolute",
        // right: 3,
        // top: 3,
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

          if (!fav) ToastAndroid.show("Added to Wishlist ", ToastAndroid.SHORT);
        }}
      >
        <Image
          source={fav ? icons.heartGreenFilled : icons.heartGreenOutline}
          resizeMode="contain"
          style={{ width: 23, height: 23, tintColor: COLORS.primary }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AddToWishlist;
