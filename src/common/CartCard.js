import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Axiosapi, baseURL } from "../../App";
// import {  } from "react-native-gesture-handler";
import { icons, images, theme, COLORS, SIZES, FONTS } from "../constants";
const CartCard = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [number, setNumber] = useState(1);
  const [productData, setProductData] = useState(props.card);
  const [cardImage, setCardImage] = useState("");

  const [data, setData] = useState({
    cartItems: [],
    total_cost: "",
  });
  const [userId, setUserId] = useState("");

  const minus = () => {
    setNumber((prev) => prev - 1);
  };
  const plus = () => {
    setNumber((prev) => prev + 1);
  };

  const addToCart = (id, action) => {
    let obj = {
      id: userId,
      cartItems: {
        product: id,
        quantity: 1,
        value: props.card.value,
        unit: props.card.unit,
      },
      action: action,
    };
    Axiosapi.post("/api/cart/add-to-cart", obj)
      .then((res) => {
        console.log(res.data);
        Alert.alert("product added successfully");
        // if (res.data.message) {
        //   toast.error(res.data.message);
        // } else {
        //   toast.success("Cart Updated");
        fetchData();
        // }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const fetchData = async () => {
      // You can await here
      const id = await AsyncStorage.getItem("userId");
      setUserId(id);
      if (userId) {
        // console.log("Getting id and cart");
        Axiosapi.post("/api/cart/getCartItems", {
          id: userId,
        })
          .then((res) => {
            // console.log(res.data);
            setData({
              cartItems: res.data.cartItems,
              total_cost: res.data.total_cost,
            });
          })
          .catch((err) => console.log(err));
      }
      // getCartItems();
    };

    fetchData();

    // setCardImage(props.cart.pImages[0]);
  }, []);
  return (
        {/* <View
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
                source={images.milk}
                style={{ height: 100, width: 100, borderRadius: 15 }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ marginLeft: 30, paddingHorizontal: 10 }}>
                <Text
                  style={{ fontWeight: "bold", fontSize: 17, color: "#404040" }}
                >
                  MILK
                </Text>
                <Text style={{ fontSize: 14, color: "#404040" }}>1 Ltr.</Text>
                <Text style={{ fontSize: 14, color: "#404040" }}>Rs. 180</Text>
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
                </View>
              </View>
            </View>
          </View> */}
  );
};

export default CartCard;
