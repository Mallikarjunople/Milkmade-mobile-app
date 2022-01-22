import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { Axiosapi } from "../../App";
import { icons, images, theme, COLORS, SIZES, FONTS } from "../constants";

const MySubscriptions = ({ navigation, route }) => {
  const [userId, setUserId] = useState("");
  const [loading, setloading] = useState(false);
  const [allSubscriptions, setAllSubscriptions] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const _retrieveData = async () => {
        try {
          const id = await AsyncStorage.getItem("userId");
          setUserId(id);

          if (id !== null) {
            Axiosapi.post(`/api/subscription/subscription-by-user`, {
              uId: id,
            }).then((res) => {
              // console.log("------");

              // console.log(res.data.Subscription);
              setAllSubscriptions(res.data.Subscription);
            }).catch(err=>{
              console.log(err)
            });
          }
        } catch (error) {
          console.log(error);
        }
      };
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
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginHorizontal: 15,
            color: COLORS.white,
          }}
        >
          My Subscriptions
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
            paddingBottom: 40,
            marginBottom: 50,
          }}
        >
          {allSubscriptions &&
            allSubscriptions.map((item, idx) => {
              return (
                <View key={idx}>
                  <TouchableOpacity
                    style={{ backgroundColor: "white" }}
                    onPress={() => {
                      navigation.navigate("SubsDetailsScreen",{
                        data:item
                      });
                    }}
                  >
                    <View
                      style={{
                        marginHorizontal: 20,
                        marginVertical: 10,
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
                          style={{ height: 100, width: 100, borderRadius: 25 }}
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <View
                          style={{
                            marginLeft: 30,
                            paddingHorizontal: 10,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                color: COLORS.black,
                                fontWeight: "bold",
                              }}
                            >
                              {" "}
                              Package :
                            </Text>
                            <View
                              style={{
                                // backgroundColor: "#FFD700",
                                padding: 5,
                                borderRadius: 10,
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: COLORS.black,
                                  alignSelf: "flex-end",
                                  fontWeight: "bold",
                                }}
                              >
                                {item.package}
                              </Text>
                            </View>
                          </View>

                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                color: COLORS.black,
                                fontWeight: "bold",
                              }}
                            >
                              {" "}
                              Product Name :
                            </Text>
                            <View
                              style={{
                                // backgroundColor: "#FFD700",
                                padding: 5,
                                borderRadius: 10,
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: COLORS.black,
                                  alignSelf: "flex-end",
                                  fontWeight: "bold",
                                }}
                              >
                                {item.subscriptionProduct.subId.pName}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                color: COLORS.black,
                                fontWeight: "bold",
                              }}
                            >
                              {" "}
                              Credits :
                            </Text>
                            <View
                              style={{
                                // backgroundColor: "#FFD700",
                                padding: 5,
                                borderRadius: 10,
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: COLORS.black,
                                  alignSelf: "flex-end",
                                  fontWeight: "bold",
                                }}
                              >
                                {item.credits}
                              </Text>
                            </View>
                          </View>
                          {/* <SubItem title="Subscription ID :" value="#12345" />
            <SubItem title="Product name :" value="Fresh Milk" />
            <SubItem title="Credits Left :" value="12" /> */}
                          <View
                            style={{
                              borderTopWidth: 2,
                              borderTopColor: "#f5f5f5",
                              marginVertical: 5,
                              marginHorizontal: 10,
                            }}
                          ></View>
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
      </>
    );
  };
  return <>{Body()}</>;
};

export default MySubscriptions;
