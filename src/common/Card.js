import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import Modal from "react-native-modal";
import { icons, images, COLORS, SIZES, FONTS } from "../constants/index";
import Separator from "../common/Separator";
import { Axiosapi, baseURL } from "../../App";
import AsyncStorage from "@react-native-community/async-storage";

const Card = ({
  refreshScreen,
  cancelButton,
  productImages,
  productName,
  productPrice,
  onPress,
  product,
  variantSelected,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState("");

  const [number, setNumber] = useState(1);

  const [selectedVariant, setSelectedVariant] = useState({});
  const [data, setData] = useState({
    cartItems: [],
    total_cost: "",
  });
  const [proImages, setProImages] = useState([]);
  const [variantOptions, setVariantOptions] = useState([]);
  const [cardImage, setCardImage] = useState("");

  const minus = () => {
    setNumber((prev) => prev - 1);
    addToCart(product._id);
  };
  const plus = () => {
    setNumber((prev) => prev + 1);
    addToCart(product._id);
  };

  const removeFromWishlist = (userId, productId) => {
    let obj = {
      userId: userId,
      productId: productId,
    };
    Axiosapi.post("/api/user/delete-from-wishlist", obj)
      .then((res) => {
        console.log(res.data);
        // Alert.alert("product added successfully");
        ToastAndroid.show("Removed From Wishlist !!", ToastAndroid.SHORT);
        refreshScreen();
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
        // Axiosapi.post("/api/cart/getCartItems", {
        //   id: id,
        // })
        //   .then((res) => {
        //     // console.log(res.data);
        //     setData({
        //       cartItems: res.data.cartItems,
        //       total_cost: res.data.total_cost,
        //     });
        //   })
        //   .catch((err) => console.log(err));
      }
      // getCartItems();
    };

    fetchData();
    // setProImages(productImages);

    setCardImage(productImages);
    // setVariantOptions(productVariant)

    // setProduct(product)
    setVariantOptions(product.pVariant);
    setSelectedVariant({
      value: product.pVariant[0].value,
      unit: product.pVariant[0].unit,
      price: product.pVariant[0].value * product.pPrice,
    });
  }, []);

  const addToCart = (id) => {
    let obj = {
      id: userId,
      cartItems: {
        product: id,
        quantity: 1,
        value: selectedVariant.value,
        unit: selectedVariant.unit,
      },
      action: "increase",
    };
    Axiosapi.post("/api/cart/add-to-cart", obj)
      .then((res) => {
        console.log(res.data);
        ToastAndroid.show("Product added Successfully !!", ToastAndroid.SHORT);

        // Alert.alert("product added successfully");
        // if (res.data.message) {
        //   toast.error(res.data.message);
        // } else {
        //   toast.success("Cart Updated");
        //   getCartItems();
        // }
      })
      .catch((err) => console.log(err));
  };

  const addButton = (productid) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            addToCart(productid);
          }}
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
                width: "45%",
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                padding: 5,
                backgroundColor: COLORS.primary,
                borderColor: COLORS.primary,
                borderWidth: 2,
                // marginRight: 10,
                marginTop: 15,
              }}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", paddingTop: 1 }}
              >
                Add
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  let cartData = {
    user: "",
    cartItems: [
      {
        product: "",
        quantity: 0,
        value: 0,
        unit: "",
        price: "",
      },
    ],
    total_cost: 0,
  };

  const quantity = () => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: COLORS.primary,
            width: "90%",
            marginHorizontal: 3,
            borderRadius: 30,
            alignSelf: "center",
            marginVertical: 10,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              margin: 3,
              borderRadius: 30,
            }}
            // onPress={() => {
            //   if (number == 1) setIsActive(false);
            //   else minus();
            // }}
          >
            <Image
              source={icons.minus}
              style={{
                width: 12,
                height: 12,
                // backgroundColor: "white",
                margin: 5,
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>

          <Text style={{ fontSize: 15, margin: 5 }}>{number}</Text>
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              margin: 3,
              borderRadius: 30,
            }}
            // onPress={() => {
            //   if (number == 0) setIsActive(false);
            //   else plus();
            // }}
          >
            <Image
              source={icons.plus}
              style={{
                width: 12,
                height: 12,
                // backgroundColor: "white",
                margin: 5,
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <View
      style={{
        backgroundColor: "#FFF",
        height: SIZES.height * 0.33,
        width: SIZES.width * 0.43,
        elevation: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: SIZES.height * 0.01,
        marginHorizontal: SIZES.width * 0.02,
        marginVertical: SIZES.height * 0.005,
      }}
    >
      <Image
        source={{ uri: cardImage ? cardImage : null }}
        resizeMode="cover"
        style={{
          width: "100%",
          height: "60%",
          borderRadius: 10,
          borderWidth: 1,
        }}
      />
      {cancelButton == true ? (
        <TouchableOpacity
          style={{ position: "absolute", right: 5 }}
          onPress={() => removeFromWishlist(userId, product._id)}
        >
          <Image
            source={icons.cancel}
            resizeMode="contain"
            style={{ width: 28, height: 28 }}
          />
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            marginVertical: 4,
          }}
        >
          <Text
            style={{
              color: "#4f4a4a",
              fontSize: 18,
            }}
          >
            {/* {props.food.name} */}
            {productName}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          // paddingVertical: 0,
          borderRadius: 5,
          width: "100%",
          borderWidth: 1,
          borderColor: COLORS.primary,
          // marginVertical: 2,
        }}
      >
        <Text style={{ fontSize: 12, padding: 2, color: "black" }}>
          {selectedVariant.value} {selectedVariant.unit}-{" "}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "bold",
            color: COLORS.primary,
            paddingLeft: 2,
          }}
        >
          Rs. {selectedVariant.price}
        </Text>
        <Image
          source={icons.arrowDownGreen}
          resizeMode="contain"
          style={{ height: 10, width: 10, marginHorizontal: 4 }}
        />
      </TouchableOpacity>

      {addButton(product._id)}

      <Modal
        isVisible={isModalVisible}
        deviceWidth={SIZES.width}
        deviceHeight={SIZES.height}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.bg,
            borderRadius: 10,
            borderRadius: 10,
            width: "100%",
            paddingVertical: 5,
          }}
        >
          {variantOptions.length > 0 &&
            variantOptions.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    setSelectedVariant({
                      value: item.value,
                      unit: item.unit,
                      price: item.value * productPrice,
                    });
                  }}
                  style={{
                    width: "95%",
                    borderWidth: 1,
                    borderColor: COLORS.primary,
                    borderRadius: 10,
                    marginVertical: 5,
                    marginHorizontal: 20,
                    paddingHorizontal: 5,
                    alignItems: "center",
                  }}
                  key={index}
                >
                  <Text
                    style={{
                      padding: 10,
                      fontSize: 20,
                    }}
                  >
                    {item.value} {item.unit} - Rs.{item.value * productPrice}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </Modal>
    </View>
  );
};
export default Card;
