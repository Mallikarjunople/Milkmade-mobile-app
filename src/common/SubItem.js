import React from "react";
import { View, Text } from "react-native";

const SubItem = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:'center',
      }}
    >
      <View
        // style={{
        //   flexDirection: "row",
        //   justifyContent: "space-around",
        // }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16, color: "#404040" }}>
          {props.title}
        </Text>

        {/* <Text
          style={{
            fontSize: 14,
            color: "#404040",
            marginVertical: 3,
            marginHorizontal: 5,
          }}
        >
          1 Ltr.
        </Text> */}
      </View>

      <Text style={{ fontSize: 14, color: "#404040" }}>{props.value}</Text>
    </View>
  );
};

export default SubItem;
