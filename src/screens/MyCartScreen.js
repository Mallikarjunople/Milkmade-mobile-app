import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  RefreshControl,
  ToastAndroid,
} from "react-native";
import CartCard from "../common/CartCard";
import Checkout from "../common/Checkout";
import { Axiosapi, baseURL } from "../../App";
const cardWidth = SIZES.width / 2 - 20;

import { icons, images, theme, COLORS, SIZES, FONTS } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const MyCartScreen = ({ navigation }) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [screenLoading, setScreenLoading] = useState(false);
  // const [number, setNumber] = useState(1);

  const [data, setData] = useState({
    discountedPrice: 0,
    totalOffer: 0,
    cartItems: [],
    total_cost: 0,
  });
  const [dataCategories, setDataCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [userId, setUserId] = useState("");
  const [cardImage, setCardImage] = useState("");

  // const wait = (timeout) => {
  //   return new Promise((resolve) => setTimeout(resolve, timeout));
  // };

  // const [refreshing, setRefreshing] = React.useState(false);

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   setLoading(false);

  //   wait(2000).then(() =>{ setRefreshing(false)
  //   }
  //   );
  // }, []);

  const minus = (productId, currentQuantity, value, unit, cartId, action) => {
    if (currentQuantity == 1) {
      removeCartItem(cartId);
    } else {
      currentQuantity = currentQuantity - 1;
      // console.log(currentQuantity);
      addToCart(productId, currentQuantity, value, unit, action);
    }
  };
  const plus = (productId, currentQuantity, value, unit, cartId, action) => {
    currentQuantity = currentQuantity + 1;
    // console.log(currentQuantity);
    addToCart(productId, currentQuantity, value, unit, action);
  };
  const removeCartItem = (cartItemId) => {
    Axiosapi.post("/api/cart/removeItem", {
      payload: { cartItemId: cartItemId },
      userId: userId,
    })
      .then((res) => {
        _retrieveData();
        // console.log("removing");
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const addToCart = (id, quantity, value, unit, action) => {
    let obj = {
      id: userId,
      cartItems: {
        product: id,
        quantity: 1,
        value: value,
        unit: unit,
      },
      action: action,
    };
    Axiosapi.post("/api/cart/add-to-cart", obj)
      .then((res) => {
        // console.log(res.data);

        Axiosapi.post("/api/cart/getCartItems", {
          id: userId,
        })
          .then((res) => {
            // console.log("working cart");
            setData({
              discountedPrice: res.data.discountedPrice,
              totalOffer: res.data.totalOffer,
              cartItems: res.data.cartItems,
              total_cost: res.data.total_cost,
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  // const fetchData = async () => {
  //   setLoading(true);
  //   // You can await here
  //   const id = await AsyncStorage.getItem("userId");
  //   setUserId(id);
  //   // console.log(id);
  //   if (userId) {
  //     // console.log("Getting id and cart");
  //     Axiosapi.post("/api/cart/getCartItems", {
  //       id: userId,
  //     })
  //       .then((res) => {
  //         // console.log(res.data);
  //         setData({
  //           cartItems: res.data.cartItems,
  //           total_cost: res.data.total_cost,
  //         });
  //         setLoading(false);
  //         // setScreenLoading(false);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  //   // getCartItems();
  // };
  // useFocusEffect(
  //   React.useCallback(() => {

  //     return () => console.log("lost focus");
  //   }, [])
  // );

  const _retrieveData = async () => {
    try {
      const id = await AsyncStorage.getItem("userId");
      setUserId(id);
      if (id !== null) {
        Axiosapi.post("/api/cart/getCartItems", {
          id: id,
        })
          .then((res) => {
            // console.log(res.data);
            setData({
              discountedPrice: res.data.discountedPrice,
              totalOffer: res.data.totalOffer,
              cartItems: res.data.cartItems,
              total_cost: res.data.total_cost,
            });

            // setScreenLoading(false);
          })
          .catch((err) => console.log(err));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      // setScreenLoading(true);

      _retrieveData();
    }, [])
  );

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
            color: COLORS.white,
          }}
        >
          My cart
        </Text>
      </View>
    );
  };
  const Body = () => {
    return (
      <>
        <ScrollView
          style={{ backgroundColor: "white", flex: 1, paddingTop: 20 }}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
        >
          {data.cartItems ? (
            data.cartItems.map((item, index) => {
              // console.log(item)
              return (
                <View key={index}>
                  <View
                    style={{
                      marginHorizontal: 20,
                      marginBottom: 10,
                      // borderWidth: 1,
                      borderRadius: 20,
                      padding: 10,
                      flexDirection: "row",
                      backgroundColor: "white",
                      // justifyContent:"space-around"
                    }}
                  >
                    <View>
                      <Image
                        source={{
                          uri: item.product.pImages[0]
                            ? item.product.pImages[0]
                            : null,
                        }}
                        style={{
                          height: 100,
                          width: 100,
                          borderRadius: 15,
                        }}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <View style={{ marginLeft: 30, paddingHorizontal: 10 }}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: 17,
                              color: "#404040",
                            }}
                          >
                            {item.product.pName}
                          </Text>
                          {/* <TouchableOpacity
                              style={{
                                borderWidth: 1,
                                borderColor: COLORS.primary,
                                borderRadius: 32,
                                backgroundColor: COLORS.white,
                              }}
                            >
                              <Image
                                source={icons.close}
                                resizeMode="contain"
                                style={{ width: 12, height: 12, margin: 5 }}
                              />
                            </TouchableOpacity> */}
                        </View>
                        <Text style={{ fontSize: 14, color: "#404040" }}>
                          {item.value} {item.unit}
                        </Text>
                        <Text style={{ fontSize: 14, color: "#404040" }}>
                          Rs. {item.product.pPrice * item.value}
                        </Text>
                      </View>
                      <View
                        style={{
                          marginLeft: 30,
                          flexDirection: "row",
                          justifyContent: "flex-end",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                            alignItems: "center",
                            // backgroundColor: COLORS.primary,
                            width: "50%",
                            margin: 3,
                            borderRadius: 30,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              setLoading(true);
                              // if (item.quantity == 0) setIsActive(false);
                              // else

                              {
                                ToastAndroid.show(
                                  "Updating Cart ...",
                                  ToastAndroid.SHORT
                                );
                                minus(
                                  item.product._id,
                                  item.quantity,
                                  item.value,
                                  item.unit,
                                  item._id,
                                  "decrease"
                                );
                              }

                              // addToCart(
                              //   item.product._id,
                              //   "decrease",
                              //   item.value,
                              //   item.unit
                              // );

                              setLoading(false);
                            }}
                            style={{
                              backgroundColor: COLORS.primary,
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
                                tintColor: "white",
                              }}
                            />
                          </TouchableOpacity>

                          <Text style={{ fontSize: 15, margin: 5 }}>
                            {item.quantity}
                          </Text>

                          <TouchableOpacity
                            onPress={() => {
                              setLoading(true);
                              // if (item.quantity == 0) setIsActive(false);
                              // else
                              {
                                ToastAndroid.show(
                                  "Updating Cart ...",
                                  ToastAndroid.SHORT
                                );
                                plus(
                                  item.product._id,
                                  item.quantity,
                                  item.value,
                                  item.unit,
                                  item._id,
                                  "increase"
                                );
                              }
                              // addToCart(
                              //   item.product._id,
                              //   "increase",
                              //   item.value,
                              //   item.unit
                              // );
                              setLoading(false);
                            }}
                            style={{
                              backgroundColor: COLORS.primary,
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
                                tintColor: "white",
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      borderTopWidth: 2,
                      borderTopColor: "#f5f5f5",
                      marginVertical: 5,
                      marginHorizontal: 20,
                    }}
                  ></View>
                </View>
              );
            })
          ) : (
            <>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Cart is Empty :(
                </Text>
              </View>
            </>
          )}
        </ScrollView>

        <View
          style={{
            width: "100%",
            height: "8%",
            backgroundColor: "#304150",
            marginBottom: 45,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          {/* <View style={{ flexDirection: "column", paddingBottom: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
              >
                Rs.{" "}
              </Text>
              <Text
                style={{
                  textDecorationLine: "line-through",
                  color: "white",
                }}
              >
                {" "}
            1600 {total_cost}{" "}
              </Text>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
              >
                {(data.discountedPrice && data.discountedPrice.toFixed(2)) || 0}
              </Text>
            </View>
          </View> */}
          <View style={{ flexDirection: "column", paddingBottom: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
              >
                Rs.{" "}
              </Text>
              <Text
                style={{
                  textDecorationLine: "line-through",
                  color: "white",
                  fontSize: 17,
                }}
              >
                {" "}
                {data.total_cost || ""}{" "}
              </Text>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
              >
                {data.discountedPrice || ""}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SelectAddress", {
                action: "createOrder",
              })
            }
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "30%",
              //   backgroundColor: "#304150",
              padding: 10,
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 5,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
              Checkout
            </Text>
            <Image
              source={icons.rightarrowwhite}
              resizeMode="contain"
              style={{ width: 16, height: 16, marginHorizontal: 5 }}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {Header()}
      {Body()}
    </SafeAreaView>
  );
};

export default MyCartScreen;
