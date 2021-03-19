import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Axiosapi } from "../../App";
import { icons, images, theme, COLORS, SIZES, FONTS } from "../constants";
import Card from "../common/Card";

const WishlistScreen = ({ navigation, route }) => {
  const [userId, setUserId] = useState("");
  const [loading, setloading] = useState(false);
  const [show, setShow] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const _retrieveData = async () => {
    setloading(true);
    try {
      const id = await AsyncStorage.getItem("userId");
      setUserId(id);

      if (id !== null) {
        Axiosapi.post(`/api/user/single-user`, { uId: id }).then((res) => {
          setWishlist(res.data.User.wishlist);
          setloading(false);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
    
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
          My Wishlist
        </Text>
      </View>
    );
  };
  const Body = () => {
    return (
      <View style={{ height: "100%" }}>
        <ScrollView
          style={{
            backgroundColor: "f5f5f5",
            flex: 1,
            paddingBottom: 40,
            marginBottom: 50,
          }}
        >
          {allProducts &&
            allProducts.map((item, idx) => {
              return (
                <View key={idx}>
                  <TouchableOpacity
                    style={{ backgroundColor: "#f5f5f5" }}
                    onPress={() => {
                      navigation.navigate("OrderDetailsScreen", {
                        data: item,
                      });
                    }}
                  >
                    <View
                      style={{
                        marginHorizontal: 20,
                        marginVertical: 5,
                        borderWidth: 0.4,
                        borderColor: "#D3D3D3",
                        borderRadius: 20,
                        padding: 10,
                        flexDirection: "row",
                        backgroundColor: "white",
                      }}
                    >
                      <View>
                        <Image
                          source={images.milk4}
                          style={{ height: 100, width: 100, borderRadius: 15 }}
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <View style={{ marginLeft: 30, paddingHorizontal: 10 }}>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              style={{
                                fontWeight: "bold",
                                fontSize: 14,
                                color: "#404040",
                              }}
                            >
                              Products
                            </Text>
                            <Text
                              style={{
                                fontWeight: "bold",
                                fontSize: 14,
                                color: "#404040",
                              }}
                            >
                              Quantity
                            </Text>
                          </View>

                          {item.allProduct.map((item, index) => {
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

                                <Text
                                  style={{ fontSize: 12, color: "#404040" }}
                                >
                                  x {item.quantity}{" "}
                                </Text>
                              </View>
                            );
                          })}

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
                              style={{
                                fontWeight: "bold",
                                fontSize: 15,
                                color: "#404040",
                              }}
                            >
                              Total
                            </Text>

                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: "bold",
                                color: "#404040",
                              }}
                            >
                              Rs.{item.amount}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            marginLeft: 30,
                            flexDirection: "row",
                            justifyContent: "flex-end",
                          }}
                        ></View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
        </ScrollView>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {Header()}
      {/* {Body()} */}

      <View style={{ flex: 1 }}>
        <View
          style={{
            // borderWidth: 1,
            // marginBottom: 30,
            width: SIZES.width,
            alignSelf: "center",
            // marginBottom: 40,
          }}
        >
          {loading ? (
            <ActivityIndicator color="black" size="large" />
          ) : (
            <FlatList
              columnWrapperStyle={{
                // justifyContent: "space-around",
                paddingHorizontal: 20,
              }}
              // contentContainerStyle={{ paddingTop: 10 }}

              showsVerticalScrollIndicator={false}
              numColumns={2}
              style={{ width: "100%" }}
              data={wishlist}
              keyExtractor={(item) => item._id}
              renderItem={({ item, index }) => {
                return (
                  <View key={index}>
                    <Card
                    refreshScreen={_retrieveData}
                      cancelButton={true}
                      food={{ name: item.productId.pName }}
                      productName={item.productId.pName}
                      productPrice={item.productId.pPrice}
                      productImages={item.productId.pImages[0]}
                      product={item.productId}
                      onPress={() =>
                        navigation.navigate("ProductDetailScreen", {
                          item: item.productId,
                        })
                      }
                    />
                  </View>
                );
              }}
            ></FlatList>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WishlistScreen;
