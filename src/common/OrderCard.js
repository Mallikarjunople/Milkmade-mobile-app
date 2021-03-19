import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
// import {  } from "react-native-gesture-handler";
import { icons, images, theme, COLORS, SIZES, FONTS } from "../constants";
const OrderCard = ({ navigation, route, cardData }) => {
  const [data, setData] = useState(cardData);
  return (
    <TouchableOpacity
      style={{ backgroundColor: "#f5f5f5" }}
      onPress={() => {
        navigation.navigate("OrderDetailsScreen", {
          data: data,
        });
      }}
    >
      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 5,
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
            source={images.milk}
            style={{ height: 100, width: 100, borderRadius: 15 }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ marginLeft: 30, paddingHorizontal: 10 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 14, color: "#404040" }}
              >
                Products
              </Text>
              <Text
                style={{ fontWeight: "bold", fontSize: 14, color: "#404040" }}
              >
                Quantity
              </Text>
            </View>
            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 17, color: "#404040" }}
              >
                MILK
              </Text>
              <Text style={{ fontSize: 14, color: "#404040" }}>1 Ltr.</Text>
              <Text style={{ fontSize: 14, color: "#404040" }}>2 units</Text>
            </View> */}
            {data.allProduct.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      width: "60%",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#404040",
                      }}
                    >
                      {item.productId.pName}
                    </Text>

                    <Text
                      style={{
                        fontSize: 12,
                        color: "#404040",
                        marginVertical: 2,
                        marginHorizontal: 5,
                      }}
                    >
                      [ {item.value} {item.unit} ]
                    </Text>
                  </View>

                  <Text style={{ fontSize: 12, color: "#404040" }}>
                    x {item.quantity}{" "}
                  </Text>
                </View>
              );
            })}

            {/* <OrderItem />
            <OrderItem /> */}
            <View
              style={{
                borderTopWidth: 2,
                borderTopColor: "#f5f5f5",
                marginVertical: 5,
                marginHorizontal: 10,
              }}
            ></View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 15, color: "#404040" }}
              >
                Total
              </Text>

              <Text
                style={{ fontSize: 15, fontWeight: "bold", color: "#404040" }}
              >
                Rs.{data.amount}
              </Text>
            </View>
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

export default OrderCard;
