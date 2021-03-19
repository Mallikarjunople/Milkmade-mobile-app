import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackBase,
} from "react-native";
import Modal from "react-native-modal";
import { icons, images, COLORS, SIZES, FONTS } from "../constants/index";
import Separator from "../common/Separator";

const Cheesecard = ({ onPress }) => {
  const [isActive, setIsActive] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [variant, setVariant] = useState({});
  const [number, setNumber] = useState(1);
  const minus = () => {
    setNumber((prev) => prev - 1);
  };
  const plus = () => {
    setNumber((prev) => prev + 1);
  };

  const addButton = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            setIsActive(true);
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
                // backgroundColor:'black',
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
  const quantity = () => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: COLORS.primary,
            width: "70%",
            margin: 3,
            borderRadius: 30,
            alignSelf:'center'
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              margin: 3,
              borderRadius: 30,
            }}
            onPress={() => {
              if(number == 1)
              setIsActive(false)
              else
              minus()
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

          <Text style={{ fontSize: 15, margin: 5 }}>{number}</Text>
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
              plus()
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

  return (
    <TouchableOpacity
      
      // onPress={onPress}
      style={{
        backgroundColor: "#FFF",
        height: SIZES.height * 0.29,
        width: SIZES.width * 0.4,
        elevation: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: SIZES.height * 0.01,
        marginHorizontal: SIZES.width * 0.005,
        marginVertical: SIZES.height * 0.005,
      }}
    >
      <Image
        source={images.yoghurt}
        resizeMode="cover"
        style={{
          width: "100%",
          height: "60%",
          borderRadius: 10,
          borderWidth: 1,
        }}
      />

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
          Fresh Yoghurt
        </Text>
      </View>
      {/* <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",

          //   borderWidth:1,
          //   backgroundColor:'red',
        }}
      >
        <Image
          source={icons.heartRed}
          resizeMode="contain"
          style={{
            width: 10,
            height: 10,
            marginHorizontal: 1,
            marginVertical: 5,
          }}
        />
        <Image
          source={icons.heartRed}
          resizeMode="contain"
          style={{ width: 10, height: 10, marginHorizontal: 1 }}
        />
        <Image
          source={icons.heartRed}
          resizeMode="contain"
          style={{ width: 10, height: 10, marginHorizontal: 1 }}
        />
        <Image
          source={icons.heartRed}
          resizeMode="contain"
          style={{ width: 10, height: 10, marginHorizontal: 1 }}
        />
        <Image
          source={icons.heartRed}
          resizeMode="contain"
          style={{ width: 10, height: 10, marginHorizontal: 1 }}
        />
      </View> */}
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
          1 Kg-{" "}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "bold",
            color: COLORS.primary,
            paddingLeft: 2,
          }}
        >
          Rs. 80
        </Text>
        <Image
          source={icons.arrowDownGreen}
          resizeMode="contain"
          style={{ height: 10, width: 10, marginHorizontal: 4 }}
        />
      </TouchableOpacity>

      {isActive ? quantity() : addButton()}

      {/*  */}
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
      {/*  */}

      {/* <View
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
              // backgroundColor:'black',
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
            <Text style={{ color: "white", fontWeight: "bold", paddingTop: 1 }}>
              Add
            </Text>
           
          </View>
        </View>
      </View> */}

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
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.bg,
          // borderWidth: 1,
          borderRadius: 10,
          marginVertical: 300,
        }}
      >
        <View
          style={{
            // borderWidth: 1,
            height: "100%",
            borderRadius: 10,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
            }}
            style={{
              width: "90%",
              borderWidth: 1,
              borderColor: COLORS.gray,
              borderRadius: 10,
              marginVertical: 5,
              marginHorizontal: 20,
              padding: 5,
            }}
          >
            <Text
              style={{
                padding: 10,
              }}
            >
              1 ltr. - Rs. 60
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
            }}
            style={{
              width: "90%",
              borderWidth: 1,
              borderRadius: 10,
              borderColor: COLORS.gray,
              marginVertical: 5,
              marginHorizontal: 20,
              padding: 10,
            }}
          >
            <Text
              style={{
                padding: 5,
              }}
            >
              2 ltr. - Rs. 120
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setVariant();
              setModalVisible(false);
            }}
            style={{
              width: "90%",
              borderWidth: 1,
              borderRadius: 10,
              borderColor: COLORS.gray,
              marginVertical: 5,
              marginHorizontal: 20,
              padding: 10,
            }}
          >
            <Text
              style={{
                padding: 5,
              }}
            >
              3 ltr. - Rs. 180
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
          onPress={()=>{setModalVisible(false)}}
          
            style={{
              width: "90%",
              borderWidth: 1,
              borderColor: COLORS.gray,
              marginVertical: 5,
              marginHorizontal: 20,
              padding: 10,
            }}
          >
            <Text>2 lt. - Rs. 120</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
          onPress={()=>{setModalVisible(false)}}
          
            style={{
              width: "90%",
              borderWidth: 1,
              borderColor: COLORS.gray,
              marginVertical: 5,
              marginHorizontal: 20,
              padding: 10,
            }}
          >
            <Text>2 lt. - Rs. 120</Text>
          </TouchableOpacity> */}
        </View>
      </Modal>
    </TouchableOpacity>
  );
};
export default Cheesecard;
