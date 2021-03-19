import React, { useState,useEffect } from "react";
import { View, Text, Image, Alert } from "react-native";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { icons, images, theme, COLORS, SIZES, FONTS } from "../constants";
import { data } from "../common/milkData";
import { data2 } from "../common/cheeseData";
import Card from "../common/Card";
import Cheesecard from "../common/Cheesecard";
import {Axiosapi} from '../../App';
import axios from "axios";


const ProductsScreen = (props) => {
  const [state, setstate] = useState(data);
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(true);


  
    // useEffect(() => {
    //  getData();
    // }, [])
    
    // const getData=()=>{
    //   Alert.alert("Products Screen","")
    //   Axiosapi.get('/api/delboy/all-delboy')
    //   .then(res=>{console.log(res.data)
    //     // setCategories(res.data.Categories)
    //   })
    //   .catch(err => console.log(err))
    // }

  const renderItem = ({ item, index }) => {
    return <View>{show ? <Card  food={{name:item.cName}}/> : <Cheesecard />}</View>;
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
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
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
          All Products
        </Text>
      </View>
    );
  };
  return (
    <>
      {Header()}

      <View
        style={{
          flexDirection: "column",
          marginHorizontal: 10,
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: 5,
          marginHorizontal: 25,
        }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: 20 }}
        >
          <TouchableOpacity
            onPress={() => {
              setShow(true);
              setstate(data);
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: COLORS.primary,
              marginHorizontal: 10,
              borderRadius: 25,
              paddingVertical: 5,
              paddingHorizontal: 8,
            }}
          >
            <Image
              source={images.milk}
              style={{ height: 40, borderRadius: 25, width: 40 }}
            />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                paddingLeft: 10,
                paddingRight: 5,
              }}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShow(true);
              setstate(data);
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#e5e4eb",
              marginHorizontal: 10,
              borderRadius: 25,
              paddingVertical: 5,
              paddingHorizontal: 8,
            }}
          >
            <Image
              source={images.milk}
              style={{ height: 40, borderRadius: 25, width: 40 }}
            />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                paddingLeft: 10,
                paddingRight: 5,
              }}
            >
              Milk
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // setShow(false);
              // setstate(data2);
            }}
            style={{
              alignItems: "center",
              flexDirection: "row",
              backgroundColor:"#e5e4eb",
              marginHorizontal: 15,
              borderRadius: 25,
              paddingVertical: 5,
              paddingHorizontal: 8,
            }}
          >
            <Image
              source={images.yoghurt}
              style={{ height: 40, borderRadius: 25, width: 40 }}
            />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                paddingLeft: 10,
                paddingRight: 5,
              }}
            >
              Yoghurt
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              alignItems: "center",
              flexDirection: "row",
              backgroundColor: "#e5e4eb",
              marginHorizontal: 15,
              borderRadius: 25,
              paddingVertical: 5,
              paddingHorizontal: 8,
            }}
          >
            <Image
              source={images.yoghurt}
              style={{ height: 40, borderRadius: 25, width: 40 }}
            />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                paddingLeft: 10,
                paddingRight: 5,
              }}
            >
              Butter
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              alignItems: "center",
              flexDirection: "row",
              backgroundColor: "#e5e4eb",
              marginHorizontal: 15,
              borderRadius: 25,
              paddingVertical: 5,
              paddingHorizontal: 8,
            }}
          >
            <Image
              source={images.yoghurt2}
              style={{ height: 40, borderRadius: 25, width: 40 }}
            />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                paddingLeft: 10,
                paddingRight: 5,
              }}
            >
              Paneer
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* <View
          style={{
            width: "80%",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            Milk
          </Text>
        </View> */}
      </View>

      <View style={{ flex: 1 }}>
        <View
          style={{
            // borderWidth: 1,
            // marginBottom: 30,
            width: SIZES.width * 0.9,
            alignSelf: "center",
            // marginBottom: 40,
          }}
        >
          <FlatList
            columnWrapperStyle={{
              // justifyContent: "space-between",
              paddingHorizontal: 20,
            }}
            contentContainerStyle={{ paddingTop: 10 }}
            data={categories}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
          />
        </View>
      </View>
    </>
  );
};

export default ProductsScreen;
