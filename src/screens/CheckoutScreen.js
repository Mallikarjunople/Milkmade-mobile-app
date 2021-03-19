import AsyncStorage from "@react-native-community/async-storage";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Axiosapi } from "../../App";
import Separator from "../common/Separator";
import { icons, images, theme, COLORS, SIZES, FONTS } from "../constants";

const CheckoutScreen = ({ navigation, route }) => {
  const [address, setAddress] = useState(route.params.addressData);
  const [action, setAction] = useState(route.params.action);
  const [productData, setProductData] = useState(route.params.productData);
  const [selectedData, setSelectedData] = useState(route.params.selectedData);
  const [originalPrice, setOriginalPrice] = useState(
    route.params.originalPrice
  );
  const [discountedPrice, setDiscountedPrice] = useState(
    route.params.discountedPrice
  );
  const [allProducts, setAllProducts] = useState([
    {
      product: "",
      quantity: 0,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    originalPrice: 0,
    discountedPrice: 0,
    totalOffer: 0,
    cartItems: [],
    total_cost: 0,
  });
  const [subBill, setSubBill] = useState({
    originalPrice: 0,
    discountedPrice: 0,
    totalOffer: 0,
   
  });
  const [userId, setUserId] = useState("");

  const createSubscription = () => {
    let obj = {
      user: userId,
      subscriptionProduct: productData._id,
      address: address,
      morningTime: selectedData.morningTime,
      eveningTime: selectedData.eveningTime,
      package: selectedData.package,
      credits: selectedData.credits,
    };
    console.log(obj);
    Axiosapi.post(`/api/subscription/create-subscription`, obj)
      .then((res) => {
        console.log(res.data.success);
        // Alert.alert("subscription created successfully");
        navigation.navigate("OrderConfirmedScreen");
      })
      .catch((err) => console.log(err));
  };
  const createOrder = () => {
    Axiosapi.post(`/api/order/create-order`, {
      user: userId,
      allProduct: data.cartItems,
      amount: data.discountedPrice,
      address: address,
    })
      .then((res) => {
        console.log(res.data.success);
        // Alert.alert("Order created successfully");
        navigation.navigate("OrderConfirmedScreen");
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    // console.log(action);
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
              setLoading(false);
              // setScreenLoading(false);
            })
            .catch((err) => console.log(err));
        }
      } catch (error) {
        console.log(error);
      }
    };
    _retrieveData();
  }, []);

  const Header = () => {
    return (
      <View
        style={{
          backgroundColor: COLORS.primary,
          padding: 20,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <View style={{ width: "10%" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              resizeMode="contain"
              style={{ height: 23, width: 23 }}
              source={icons.leftarrowwhite}
            />
          </TouchableOpacity>
        </View>

        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginHorizontal: 15,
            color: "white",
          }}
        >
          Checkout
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
            paddingTop: 20,
            paddingBottom: 40,
            marginBottom: 50,
          }}
        >
          <View>
          {action == "createSubscription" ?  <View style={{ flex: 1, marginHorizontal: 30 }}>
            <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 15,
                }}
              >
                <Text style={{ fontSize: 16 }}>Total amount</Text>
                <Text style={{ fontSize: 16 }}>Rs. {originalPrice.toFixed(2)}</Text>
              </View>
              <Separator />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 15,
                }}
              >
                <Text style={{ fontSize: 16 }}>Discount percentage</Text>
                <Text style={{ fontSize: 16 }}>{selectedData.offer.toFixed(2)} %</Text>
              </View>
              <Separator />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 15,
                }}
              >
                <Text style={{ fontSize: 16 }}>Discounted Price</Text>
                <Text style={{ fontSize: 16 }}>Rs. {discountedPrice.toFixed(2)}</Text>
              </View>
              <Separator />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 15,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Amount to pay
                </Text>
                <Text style={{ fontSize: 16 ,fontWeight:'bold'}}>Rs. {discountedPrice.toFixed(2)}</Text>
              </View>
              <Separator />
            </View> :  <View style={{ flex: 1, marginHorizontal: 30 }}>
            <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 15,
                }}
              >
                <Text style={{ fontSize: 16 }}>Total amount</Text>
                <Text style={{ fontSize: 16 }}>Rs. {data.total_cost.toFixed(2)}</Text>
              </View>
              <Separator />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 15,
                }}
              >
                <Text style={{ fontSize: 16 }}>Discount percentage</Text>
                <Text style={{ fontSize: 16 }}>{data.totalOffer.toFixed(2)} %</Text>
              </View>
              <Separator />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 15,
                }}
              >
                <Text style={{ fontSize: 16 }}>Discounted Price</Text>
                <Text style={{ fontSize: 16 }}>Rs. {data.discountedPrice.toFixed(2)}</Text>
              </View>
              <Separator />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 15,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Amount to pay
                </Text>
                <Text style={{ fontSize: 16 ,fontWeight:'bold'}}>Rs. {data.discountedPrice.toFixed(2)}</Text>
              </View>
              <Separator />
            </View> }
           
            <View
              style={{
                width: "100%",
                backgroundColor: COLORS.gray,
                padding: 15,
                marginTop: 30,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: COLORS.darkGray,
                }}
              >
                Payment With
              </Text>
            </View>
            <View>
              {action === "createOrder" ? (
                <TouchableOpacity
                  onPress={() => {
                    if (action === "createOrder") createOrder();
                    console.log(action);

                    if (action === "createSubscription") createSubscription();
                    console.log(action);
                  }}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      paddingLeft: 10,
                    }}
                  >
                    <Image
                      source={icons.cod}
                      resizeMode="contain"
                      style={{ width: 30, height: 30, margin: 15 }}
                    />
                    <Text style={{ margin: 15, fontSize: 18 }}>
                      Cash On delivery
                    </Text>
                  </View>

                  <Image
                    source={icons.rightarrowblack}
                    resizeMode="contain"
                    style={{ width: 23, height: 23, margin: 15 }}
                  />
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                onPress={() => {
                  if (action === "createOrder") createOrder();
                  console.log(action);

                  if (action === "createSubscription") createSubscription();
                  console.log(action);
                }}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    paddingLeft: 10,
                  }}
                >
                  <Image
                    source={icons.payment}
                    resizeMode="contain"
                    style={{ width: 30, height: 30, margin: 15 }}
                  />
                  <Text style={{ margin: 15, fontSize: 18 }}>Pay Online</Text>
                </View>

                <Image
                  source={icons.rightarrowblack}
                  resizeMode="contain"
                  style={{ width: 23, height: 23, margin: 15 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        {/* <Checkout/> */}
      </>
    );
  };

  return (
    <>
      {Header()}
      {Body()}
    </>
  );
};

export default CheckoutScreen;
