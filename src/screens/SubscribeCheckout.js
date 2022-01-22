import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { icons, images, theme, COLORS, SIZES, FONTS } from "../constants";
import Modal from "react-native-modal";
import ModalSelector from "react-native-modal-selector";

import { Switch } from "react-native-gesture-handler";
import { Colors } from "react-native/Libraries/NewAppScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CheckoutSubscribe from "../common/CheckoutSubscribe";

const SubscribeCheckout = ({ route, navigation }) => {
  const [productData, setProductData] = useState(route.params.productData);

  // const [isActive, setIsActive] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible3, setModalVisible3] = useState(false);
  const [isModalVisible4, setModalVisible4] = useState(false);
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subpacks, setSubpacks] = useState([]);
  const [selected, setSelected] = useState({
    morningTime: "",
    eveningTime: "",
    package: "",
  });
  let index1 = 0;
  let index2 = 0;
  let index3 = 0;
  let index4 = 0;

  useEffect(() => {
    setLoading(true);
    // console.log(productData);
    setSubpacks(productData.pSubpacks);

    setLoading(false);
  }, []);

  const data1 = [
    { key: index1++, section: true, label: "Choose Quantity" },
    { key: index1++, label: " 0.5 Litres" },
    {
      key: index1++,
      label: " 1 Litres",
      accessibilityLabel: "Tap here for cranberries",
    },
    // etc...
    // Can also add additional custom keys which are passed to the onChange callback
    { key: index1++, label: " 2 Litres", customKey: "Not a fruit" },
    { key: index1++, label: " 3 Litres" },
  ];

  const data3 = [
    { label: "6.00 - 7.00 AM" },
    {
      label: "7.00 - 8.00 AM",
    },
    // etc...
    // Can also add additional custom keys which are passed to the onChange callback
    { label: "8.00 - 9.00 AM" },
    { label: "9.00 - 10.00 AM" },
  ];
  const data4 = [
    // { key: index4++, section: true, label: "Select evening delivery time" },
    { key: index4++, label: "6.00 - 7.00 PM" },
    {
      key: index4++,
      label: "7.00 - 8.00 PM",
      accessibilityLabel: "Tap here for cranberries",
    },
    // etc...
    // Can also add additional custom keys which are passed to the onChange callback
    { key: index4++, label: "8.00 - 9.00 PM", customKey: "Not a fruit" },
  ];
  const [textInputValue, setValue] = useState("");

  const popupModal = () => {
    return (
      <Modal
        isVisible={popup}
        deviceWidth={SIZES.width}
        deviceHeight={SIZES.height}
        onBackdropPress={() => setPopup(false)}
        //custom backdrop clears the default background while Modal is open
        // Have to set the background manually
        // customBackdrop={
        //   <TouchableWithoutFeedback onPress={() => setModalVisible4(false)}>
        //     <View style={{ flex: 1 ,}} />
        //   </TouchableWithoutFeedback>
        // }
      >
        <View
          style={{
            // borderWidth: 1,
            // height: "100%",
            borderRadius: 10,
            width: "100%",

            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.bg,
            // borderWidth: 1,
            paddingBottom: 10,
          }}
        >
          <View
            style={{
              // marginHorizontal: 30,
              marginVertical: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              resizeMode="contain"
              style={{ height: 40, width: 40, color: COLORS.white }}
              source={icons.check}
            />
            <Text
              style={{
                fontSize: 27,
                fontWeight: "bold",
                color: COLORS.black,
                paddingVertical: 5,
              }}
            >
              Great!
            </Text>
          </View>
          <View style={{ width: "80%" }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: COLORS.black,
                padding: 10,
                textAlign: "center",
              }}
            >
              Thank you for choosing subscription package {selected.package}.
              Now, you can get {productData.pName} upto {selected.credits}{" "}
              {productData.pVariant[0].unit}
            </Text>
          </View>
          <TouchableOpacity
            style={{ backgroundColor: "#B22222", borderRadius: 20 }}
            onPress={()=>setPopup(false)}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 16,
                color: "white",
                paddingHorizontal: 15,
                paddingVertical: 7,
              }}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const select1 = (data) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          // paddingVertical: 0,
          borderRadius: 10,
          width: "100%",
          borderWidth: 1.5,
          borderColor: COLORS.primary,
          // marginVertical: 2,
        }}
      >
        <ModalSelector
          data={data}
          initValue="Select something yummy!"
          // keyExtractor={(item) => item.id}
          accessible={true}
          scrollViewAccessibilityLabel="Scrollable options"
          cancelButtonAccessibilityLabel="Cancel Button"
          onChange={(option) => {
            setValue(option.label);
          }}
          style={{
            backgroundColor: "white",
            width: "100%",
            borderRadius: 10,
          }}
        >
          <TextInput
            style={{
              // borderWidth: 1,
              // borderColor: "#ccc",
              padding: 10,
              height: 40,
            }}
            // editable={false}
            placeholder="Choose field"
            value={textInputValue}
          />
        </ModalSelector>
      </View>
    );
  };

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
          <TouchableOpacity onPress={() => navigation.navigate("Tabs")}>
            <Image
              resizeMode="contain"
              style={{ height: 23, width: 23, color: COLORS.white }}
              source={icons.leftarrowwhite}
            />
          </TouchableOpacity>
        </View>

        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginHorizontal: 15,
            color: COLORS.white,
          }}
        >
          SubscribeCheckout
        </Text>
      </View>
    );
  };
  const picker = (subarray) => {
    return (
      <>
        <View
          style={{
            backgroundColor: COLORS.bg,
            // borderWidth: 1,
            // flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              // paddingVertical: 0,
              borderRadius: 5,
              width: "100%",
              borderWidth: 1,
              borderColor: COLORS.primary,
              backgroundColor: COLORS.white,
              // marginVertical: 2,
            }}
          >
            <Text style={{ fontSize: 15, padding: 8, color: "black" }}>
              {selected.package
                ? `${selected.package}: ${selected.credits} ${
                    productData.pVariant[0].unit.split(".")[0]
                  } -${selected.offer}% OFF`
                : ""}
            </Text>
            <Image
              source={icons.arrowDownGreen}
              resizeMode="contain"
              style={{ height: 10, width: 10, marginHorizontal: 20 }}
            />
          </TouchableOpacity>
        </View>
        <Modal
          isVisible={isModalVisible}
          deviceWidth={SIZES.width}
          deviceHeight={SIZES.height}
          onBackdropPress={() => setModalVisible(false)}
          //custom backdrop clears the default background while Modal is open
          // Have to set the background manually
          // customBackdrop={
          //   <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          //     <View style={{ flex: 1 ,}} />
          //   </TouchableWithoutFeedback>
          // }
        >
          <View
            style={{
              // borderWidth: 1,
              // height: "100%",
              borderRadius: 10,
              width: "100%",

              justifyContent: "center",
              alignItems: "center",
              backgroundColor: COLORS.bg,
              // borderWidth: 1,
            }}
          >
            {/* {console.log(subarray)} */}
            {subarray &&
              subarray.map((item, index) => {
                return (
                  <>
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setPopup(true);
                        setModalVisible(false);
                        setSelected({
                          ...selected,
                          package: item.name,
                          credits: item.credits,
                          offer: item.offer,
                        });
                      }}
                      style={{
                        width: "90%",
                        borderWidth: 1,
                        borderColor: COLORS.gray,
                        borderRadius: 10,
                        marginVertical: 5,
                        marginHorizontal: 20,
                        padding: 5,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: COLORS.primary,
                          borderRadius: 10,
                        }}
                      >
                        <Text
                          style={{
                            margin: 10,
                            fontWeight: "bold",
                            color: "white",
                            paddingHorizontal: 10,
                            fontSize: 15,
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            margin: 10,
                            fontWeight: "bold",
                            fontSize: 16,
                          }}
                        >
                          
                          {/* {productData.pVariant[0].unit.split(".")[0]} :{" "} */}
                          {item.credits} Credits
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            margin: 10,
                            fontWeight: "bold",
                            fontSize: 16,
                          }}
                        >
                          {item.offer}% OFF
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </>
                );
              })}
          </View>
        </Modal>
      </>
    );
  };

  const picker3 = (subarray) => {
    return (
      <>
        <View
          style={{
            backgroundColor: COLORS.bg,
            // borderWidth: 1,
            // flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setModalVisible3(true);
            }}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              // paddingVertical: 0,
              borderRadius: 5,
              width: "100%",
              borderWidth: 1,
              borderColor: COLORS.primary,
              backgroundColor: COLORS.white,
              // marginVertical: 2,
            }}
          >
            <Text style={{ fontSize: 15, padding: 8, color: "black" }}>
              {selected.morningTime}
            </Text>
            <Image
              source={icons.arrowDownGreen}
              resizeMode="contain"
              style={{ height: 10, width: 10, marginHorizontal: 20 }}
            />
          </TouchableOpacity>
        </View>
        <Modal
          isVisible={isModalVisible3}
          deviceWidth={SIZES.width}
          deviceHeight={SIZES.height}
          onBackdropPress={() => setModalVisible3(false)}
          //custom backdrop clears the default background while Modal is open
          // Have to set the background manually
          // customBackdrop={
          //   <TouchableWithoutFeedback onPress={() => setModalVisible4(false)}>
          //     <View style={{ flex: 1 ,}} />
          //   </TouchableWithoutFeedback>
          // }
        >
          <View
            style={{
              // borderWidth: 1,
              // height: "100%",
              borderRadius: 10,
              width: "100%",

              justifyContent: "center",
              alignItems: "center",
              backgroundColor: COLORS.bg,
              // borderWidth: 1,
              paddingBottom: 10,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  marginVertical: 5,
                  marginHorizontal: "auto",
                }}
              >
                Choose Morning Time
              </Text>
            </View>
            {subarray &&
              subarray.map((item, index) => {
                return (
                  <>
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setModalVisible3(false);
                        setSelected({ ...selected, morningTime: item.label });
                      }}
                      style={{
                        // width: "90%",
                        borderWidth: 1,
                        borderColor: COLORS.gray,
                        borderRadius: 10,
                        marginTop: 5,
                        marginBottom: 10,

                        marginHorizontal: 20,
                        // padding: 5,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: COLORS.primary,
                          borderRadius: 10,
                          width: "100%",
                        }}
                      >
                        <Text
                          style={{
                            margin: 10,
                            fontWeight: "bold",
                            color: "black",
                            paddingHorizontal: 10,
                            fontSize: 15,
                            alignSelf: "center",
                          }}
                        >
                          {item.label}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </>
                );
              })}
          </View>
        </Modal>
      </>
    );
  };
  const picker4 = (subarray) => {
    return (
      <>
        <View
          style={{
            backgroundColor: COLORS.bg,
            // borderWidth: 1,
            // flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setModalVisible4(true);
            }}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              // paddingVertical: 0,
              borderRadius: 5,
              width: "100%",
              borderWidth: 1,
              borderColor: COLORS.primary,
              backgroundColor: COLORS.white,
              // marginVertical: 2,
            }}
          >
            <Text style={{ fontSize: 15, padding: 8, color: "black" }}>
              {selected.eveningTime}
            </Text>
            <Image
              source={icons.arrowDownGreen}
              resizeMode="contain"
              style={{ height: 10, width: 10, marginHorizontal: 20 }}
            />
          </TouchableOpacity>
        </View>
        <Modal
          isVisible={isModalVisible4}
          deviceWidth={SIZES.width}
          deviceHeight={SIZES.height}
          onBackdropPress={() => setModalVisible4(false)}
          //custom backdrop clears the default background while Modal is open
          // Have to set the background manually
          // customBackdrop={
          //   <TouchableWithoutFeedback onPress={() => setModalVisible4(false)}>
          //     <View style={{ flex: 1 ,}} />
          //   </TouchableWithoutFeedback>
          // }
        >
          <View
            style={{
              // borderWidth: 1,
              // height: "100%",
              borderRadius: 10,
              width: "100%",

              justifyContent: "center",
              alignItems: "center",
              backgroundColor: COLORS.bg,
              // borderWidth: 1,
              paddingBottom: 10,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  marginVertical: 5,
                  marginHorizontal: "auto",
                }}
              >
                Choose Evening Time
              </Text>
            </View>
            {subarray &&
              subarray.map((item, index) => {
                return (
                  <>
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setModalVisible4(false);
                        setSelected({ ...selected, eveningTime: item.label });
                      }}
                      style={{
                        // width: "90%",
                        borderWidth: 1,
                        borderColor: COLORS.gray,
                        borderRadius: 10,
                        marginTop: 5,
                        marginBottom: 10,

                        marginHorizontal: 20,
                        // padding: 5,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: COLORS.primary,
                          borderRadius: 10,
                          width: "100%",
                        }}
                      >
                        <Text
                          style={{
                            margin: 10,
                            fontWeight: "bold",
                            color: "black",
                            paddingHorizontal: 10,
                            fontSize: 15,
                            alignSelf: "center",
                          }}
                        >
                          {item.label}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </>
                );
              })}
          </View>
        </Modal>
      </>
    );
  };
  const Body = () => {
    const [value, setValue] = useState("");
    const [items, setItems] = useState(["one", "two"]);
    return (
      <>
        <View style={{ flex: 1 }}>
          <View
            style={{
              marginRight: 30,
              marginVertical: 30,
              backgroundColor: COLORS.back,
              borderTopRightRadius: 30,
              borderBottomRightRadius: 30,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                color: COLORS.black,
                fontWeight: "bold",
                paddingVertical: 10,
                paddingHorizontal: 25,
              }}
            >
              Customize your subscription{textInputValue}
            </Text>
          </View>
          {/* <View style={{ marginHorizontal: 30, marginVertical: 10 }}>
            <Text
              style={{
                fontSize: 20,
                color: COLORS.darkGray,
                paddingVertical: 10,
              }}
            >
              How many litres
            </Text>
            {select1(data1)}
          </View> */}
          <View style={{ marginHorizontal: 30, marginVertical: 10 }}>
            <Text
              style={{
                fontSize: 20,
                color: COLORS.darkGray,
                paddingVertical: 10,
              }}
            >
              Choose Subscription package
            </Text>
            {/* {select2(arraySub)} */}
            {picker(subpacks)}
          </View>
          <View style={{ marginHorizontal: 30, marginVertical: 10 }}>
            <Text
              style={{
                fontSize: 20,
                color: COLORS.darkGray,
                paddingVertical: 10,
              }}
            >
              Select morning delivery time
            </Text>
            {/* {select3(data3)} */}
            {picker3(data3)}
          </View>
          <View style={{ marginHorizontal: 30, marginVertical: 10 }}>
            <Text
              style={{
                fontSize: 20,
                color: COLORS.darkGray,
                paddingVertical: 10,
              }}
            >
              Select evening delivery time
            </Text>
            {/* {select4(data4)} */}
            {picker4(data4)}
          </View>
          {/* {selected.package === "" ? null : (
            <View style={{ marginHorizontal: 30, marginVertical: 10 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: COLORS.black,
                  paddingVertical: 10,
                }}
              >
                Note: Thank you for choosing subscription package{" "}
                {selected.package}. Now, you can get {productData.pName} upto{" "}
                {selected.credits} {productData.pVariant[0].unit}
              </Text>
            </View>
          )} */}
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <>
          {Header()}
          {Body()}
          {popupModal()}
        </>
      )}

      <CheckoutSubscribe
        navigation={navigation}
        discountedPrice={
          productData.pPrice * selected.credits -
          productData.pPrice *
            selected.credits *
            (parseInt(productData.pOffer) / 100)
        }
        originalPrice={productData.pPrice * selected.credits}
        productData={productData}
        selectedData={selected}
      />
    </SafeAreaView>
  );
};

export default SubscribeCheckout;
