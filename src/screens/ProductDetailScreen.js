import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  ActivityIndicator,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  ToastAndroid,
} from "react-native";
import Icon from "@expo/vector-icons/Entypo";
import { icons, images, theme, COLORS, SIZES, FONTS } from "../constants";
import Card from "../common/Card";
import AddToWishlist from "../common/AddToWishlist";
// import ModalSelector from "react-native-modal-selector";
import Modal from "react-native-modal";

import { Axiosapi, baseURL } from "../../App";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

function ProductDetailScreen({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [number, setNumber] = useState(1);

  const [isModalVisible, setModalVisible] = useState(false);

  const [productData, setProductData] = useState(route.params.item);
  // console.log(productData.pVariant);
  const [state, setState] = useState({
    quantity: null,
  });
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [rating, setRating] = useState(["1", "1", "1", "1", "1"]);
  const [userId, setUserId] = useState("");

  const [categories, setCategories] = useState([]);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState({});
  const [fav, setfav] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const addToCart = (id) => {
    let obj = {
      id: userId,
      cartItems: {
        product: id,
        quantity: 1,
        value: selectedVariant.value,
        unit: selectedVariant.unit,
      },
      // action: "increase",
    };
    Axiosapi.post("/api/cart/add-to-cart", obj)
      .then((res) => {
        // console.log(res.data);
        // Alert.alert("product added successfully");
        ToastAndroid.show("Product added Successfully !!", ToastAndroid.SHORT);
      })
      .catch((err) => console.log(err));
  };

  const addButton = (productId) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            // setIsActive(true);
            addToCart(productId);
          }}
          style={{
            // flexDirection: "row",
            // justifyContent: "center",
            // alignItems: "center",
            // backgroundColor: COLORS.primary,
            // width: "30%",
            // marginHorizontal: 3,
            // borderRadius: 30,
            // alignSelf: "center",
            marginVertical: 10,
            backgroundColor: COLORS.primary,
            borderRadius: 15,
            width: SIZES.width / 5,
            paddingVertical: 8,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 2,
          }}
        >
          <Text style={{ color: "white" }}>Add</Text>
        </TouchableOpacity>
      </>
    );
  };

  const minus = () => {
    setNumber((prev) => prev - 1);
  };
  const plus = () => {
    setNumber((prev) => prev + 1);
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
            width: "30%",
            marginHorizontal: 3,
            borderRadius: 30,
            // alignSelf: "center",
            marginVertical: 10,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              margin: 3,
              borderRadius: 30,
            }}
            onPress={() => {
              if (number == 1) setIsActive(false);
              else minus();
            }}
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
          <View>
            <Text style={{ fontSize: 15, margin: 5 }}>{number}</Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              margin: 3,
              borderRadius: 30,
            }}
            onPress={() => {
              // if(number == 0)
              // setIsActive(false)
              // else
              plus();
            }}
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

  const addToWishlist = (userId, productId) => {
    let obj = {
      userId: userId,
      productId: productId,
    };
    Axiosapi.post("/api/user/add-to-wishlist", obj)
      .then((res) => {
        // console.log(res.data);
        if (res.data.message == "Product-present") {
          ToastAndroid.show(
            "Already present in Wishlist !!",
            ToastAndroid.SHORT
          );
        } else {
          ToastAndroid.show("Added to Wishlist !!", ToastAndroid.SHORT);
          userData();
        }
        // Alert.alert("product added successfully");
      })
      .catch((err) => console.log(err));
  };
  const removeFromWishlist = (userId, productId) => {
    let obj = {
      userId: userId,
      productId: productId,
    };
    Axiosapi.post("/api/user/delete-from-wishlist", obj)
      .then((res) => {
        // console.log(res.data);
        // Alert.alert("product added successfully");
        ToastAndroid.show("Removed From Wishlist !!", ToastAndroid.SHORT);
        userData();
      })
      .catch((err) => console.log(err));
  };
  const [textInputValue, setValue] = useState("");

  const [data1, setData1] = useState([]);

  const fetchProductsByCategory = (categoryId) => {
    Axiosapi.post("/api/product/product-by-category", {
      catId: categoryId,
    })
      .then((res) => {
        // console.log(res.data)
        setRelatedProducts(res.data.Products);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const fetchData = async () => {
      // You can await here
      const id = await AsyncStorage.getItem("userId");
      setUserId(id);
    };

    fetchData();
    setSelectedVariant({
      value: productData.pVariant[0].value,
      unit: productData.pVariant[0].unit,
      price: productData.pPrice,
    });
    fetchProductsByCategory(productData.pCategory._id);
  }, []);

  const userData = () => {
    Axiosapi.post("/api/user/single-user", {
      uId: userId,
    }).then((res) => {
      // console.log(res.data.User.wishlist);
      setWishlist(res.data.User.wishlist);
    });
  };

  useEffect(() => {
    userData();
  }, []);
  function renderRelatedProducts() {
    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={(item) => item.id}
        data={relatedProducts}
        renderItem={({ item, index }) => {
          return (
            <View key={index}>
              <Card
                food={{ name: item.pName }}
                productName={item.pName}
                productPrice={item.pPrice}
                productImages={item.pImages[1]}
                product={item}
                onPress={() =>
                  navigation.push("ProductDetailScreen", {
                    item: item,
                  })
                }
              />
            </View>
          );
        }}
        style={{ marginHorizontal: 10 }}
      />
    );
  }

  const checkWishlist = () => {
    let isPresentProduct = wishlist.find((c) => c.productId == productData._id);
    console.log(isPresentProduct);
    if (isPresentProduct) {
      return (
        <TouchableOpacity
          style={{
            borderRadius: 20,
            borderColor: COLORS.primary,
            backgroundColor: "white",
            padding: 4,
          }}
          onPress={() => {
            removeFromWishlist(userId, productData._id);
          }}
        >
          <Image
            source={icons.heartGreenFilled}
            resizeMode="contain"
            style={{ width: 23, height: 23, tintColor: COLORS.primary }}
          />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={{
          borderRadius: 20,
          borderColor: COLORS.primary,
          backgroundColor: "white",
          padding: 4,
        }}
        onPress={() => {
          addToWishlist(userId, productData._id);
        }}
      >
        <Image
          source={icons.heartGreenOutline}
          resizeMode="contain"
          style={{ width: 23, height: 23, tintColor: COLORS.primary }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={{ backgroundColor: "#F5F5F5", marginBottom: 35 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            // marginTop: 20,
            // marginHorizontal: 20,
            // margin: 10,
            // height:'10%',
            padding: 15,
            backgroundColor: COLORS.primary,
          }}
        >
          <View style={{ width: "10%" }}>
            <TouchableOpacity onPress={() => navigation.navigate("Tabs")}>
              <Image
                resizeMode="contain"
                style={{ height: 25, width: 25 }}
                source={icons.leftarrowwhite}
              />
            </TouchableOpacity>
          </View>
          <View style={{ width: "80%", alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Image
                source={images.milkbottle}
                style={{ height: 25, width: 25, tintColor: "white" }}
              />
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontWeight: "bold",
                  fontSize: 24,
                  color: "white",
                }}
              >
                Milk
              </Text>
            </View>
          </View>
          {/* Add to wishlist */}
          <View style={{ width: "12%" }}>
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
              {checkWishlist()}
            </View>
            {/* <AddToWishlist /> */}
          </View>
        </View>
        <ScrollView style={{ marginBottom: 40 }}>
          <Image
            source={{
              uri: `${baseURL}/uploads/products/${productData.pImages[1]}`,
            }}
            resizeMode="contain"
            style={{
              height: SIZES.height * 0.3,
              width: SIZES.width,
              alignSelf: "center",
              padding: 10,
              margin: 10,
            }}
          />
          {/* <View
                    style={{
                        flexDirection:"row",
                        alignSelf:"center",
                        alignItems:"center",
                        backgroundColor:"#f6f3fb",
                        paddingHorizontal:20,
                        paddingVertical:8,
                        borderRadius:20
                    }}
                   >
                      <TouchableOpacity
                       onPress={addQuantity}
                      >
                          <Text style={{
                              fontWeight:"bold",
                              fontSize:18
                          }}>+</Text>
                      </TouchableOpacity> 
                      
                      <Text style={{
                          fontSize:18,
                          fontWeight:"bold",
                          paddingHorizontal:20
                      }}>
                          {state.quantity}
                      </Text>

                      <TouchableOpacity
                       onPress={subtractQuantity}
                      >
                          <Text style={{
                              fontWeight:"bold",
                              fontSize:18
                          }}>-</Text>
                      </TouchableOpacity> 
                   </View> */}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 25,
              marginTop: 10,
              // borderWidth:1,
            }}
          >
            <Text
              style={{
              fontFamily:'Roboto-Bold',

                // fontWeight: "bold",
                fontSize: 28,
                color: "grey",
                alignSelf: "flex-start",
              }}
            >
              {productData.pName}
            </Text>

            <Text
              style={{
                fontWeight: "bold",
                fontSize: 28,
                marginLeft: 80,
                alignSelf: "flex-end",
                color: COLORS.primary,
              }}
            >
              Rs. {productData.pPrice}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 20,
              // marginTop: 30,
              // borderWidth: 1,
            }}
          >
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
                // width: "100%",
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

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: 5,
                //   borderWidth:1,
                //   backgroundColor:'red',
              }}
            >
              {rating.map((item, index) => {
                return (
                  <View key={index}>
                    <Image
                      source={icons.heartRed}
                      resizeMode="contain"
                      style={{ width: 14, height: 14, marginHorizontal: 2 }}
                    />
                  </View>
                );
              })}
            </View>
          </View>
          {/* Modal */}

          <Modal
            isVisible={isModalVisible}
            deviceWidth={SIZES.width}
            deviceHeight={SIZES.height}
            onBackdropPress={() => setModalVisible(false)}
          >
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: COLORS.bg,
                borderRadius: 10,
                borderRadius: 10,
                // width: "90%",
                padding: 5,
              }}
            >
              {productData.pVariant.length > 0 &&
                productData.pVariant.map((item, index) => {
                  return (
                    <TouchableOpacity
                      style={{
                        width: "95%",
                        borderWidth: 1,
                        borderColor: COLORS.primary,
                        borderRadius: 10,
                        marginVertical: 5,
                        // marginHorizontal: 20,
                        // paddingHorizontal: 15,
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      key={index}
                      onPress={() => {
                        setModalVisible(false);
                        setSelectedVariant({
                          value: item.value,
                          unit: item.unit,
                          price: item.value * productData.pPrice,
                        });
                      }}
                    >
                      <Text
                        style={{
                          padding: 10,
                          fontSize: 20,
                        }}
                      >
                        {item.value} - {item.unit}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
            </View>
          </Modal>
          {/* Modal */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SubscribeCheckout", {
                  productData: productData,
                })
              }
              style={{
                //   borderWidth: 1,
                backgroundColor: COLORS.primary,
                borderRadius: 15,
                width: SIZES.width / 5,
                paddingVertical: 8,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 2,
              }}
            >
              <Text style={{ color: "white" }}>Subscribe</Text>
            </TouchableOpacity>

            {/* {isActive ? quantity() : addButton()} */}
            {/* {isActive ? notAdded() : added()} */}
            {addButton(productData._id)}
            {/* <TouchableOpacity
              onPress={() => navigation.navigate("MyCartScreen")}
              style={{
                //   borderWidth: 1,
                backgroundColor: COLORS.primary,
                borderRadius: 15,
                width: SIZES.width / 6,
                padding: 8,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white" }}>Add +</Text>
            </TouchableOpacity> */}
          </View>
          {/* line break */}
          <View
            style={{
              borderTopWidth: 0.5,
              borderTopColor: "grey",
              margin: 20,
            }}
          ></View>
          {/* line break */}

          <Text
            style={{
              fontSize: 20,
              marginHorizontal: 20,
            }}
          >
            Description
          </Text>
          <Text
            style={{
              color: "#a4a4a9",

              fontSize: 15,
              marginTop: 10,
              marginHorizontal: 20,
              textAlign: "justify",
            }}
          >
            {productData.pDescription}
            The most unique fire grilled patty, flame grilled, charred, seared,
            well-done All natural beef, grass-feed beef, Fiery, juicy, greacy.
            delicous moist The most unique fire grilled patty, flame grilled,
            charred, seared, well-done All natural beef, grass-feed beef, Fiery,
            juicy, greacy. delicous moist
          </Text>

          {/* <View
        style={{
          position: "absolute",
          backgroundColor: "#000",
          height: 50,
          width: 50,
          bottom: 20,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          borderRadius: 25,
        }}
      >
        <Icon name="shopping-cart" size={24} color="#FFF" />
      </View> */}

          <View
            style={{
              alignItems: "center",
              marginHorizontal: 20,
              flexDirection: "row",
              marginVertical: 20,
            }}
          >
            <View
              style={{
                width: "50%",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                }}
              >
                Related Products
              </Text>
            </View>
            {/* <View style={{
                           width:"50%",
                           alignItems:"flex-end"
                       }}>
                           <TouchableOpacity style={{
                               backgroundColor:'#3CB371',
                               borderRadius:15,
                               paddingHorizontal:8,
                               paddingVertical:4,
                               
                           }}
                           onPress={()=>{navigation.navigate('ProductDetailScreen')}} ><Text style={{color:'white'}}>View all</Text></TouchableOpacity>
                       </View> */}
          </View>

          {/* <ScrollView
              style={{
                height: "100%",
                width: SIZES.width,
                marginHorizontal: SIZES.width * 0.03,
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <Card
                src={images.milk}
                name="Beautiful Card"
                product={{ name: "Cheese", image: images.cheese2 }}
                onPress={() => {
                  navigation.navigate("ProductDetailScreen");
                }}
              />
              <Card
                src={images.milk2}
                name="Beautiful Card"
                product={{ name: "Cheese", image: images.cheese2 }}
                onPress={() => navigation.navigate("ProductDetailScreen")}
              />
              <Card
                src={images.milk}
                name="Beautiful Card"
                product={{ name: "Cheese", image: images.cheese2 }}
                onPress={() => navigation.navigate("ProductDetailScreen")}
              />
            </ScrollView> */}
          {renderRelatedProducts(productData.pCategory._id)}
        </ScrollView>
      </View>
    </>
  );
}
export default ProductDetailScreen;
