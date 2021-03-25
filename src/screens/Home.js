import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Card from "../common/Card";
import { icons, images, theme, COLORS, SIZES, FONTS } from "../constants";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { Axiosapi, baseURL } from "../../App";
import image1 from "../images/milk2.jpg";

function Home({ navigation }) {
  const [slideImages, setSlideImages] = useState([]);
  const [products1, setProducts1] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [category1, setcategory1] = useState("");
  const [category2, setcategory2] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataCategories, setDataCategories] = useState([]);

  const [imagesList, setImagesList] = useState([]);

  const getData = () => {
    Axiosapi.get("/api/category/all-category")
      .then((res) => {
        //  console.log(res.data.Categories)
         setcategory1(res.data.Categories[0])
         setcategory2(res.data.Categories[1])

         fetchProductsByCategory(res.data.Categories[0]._id,res.data.Categories[1]._id,)

      })
      .catch((err) => console.log(err));
  };
  const fetchData = () => {
    Axiosapi.get("/api/product/all-product")
      .then((res) => {
        // console.log(res.data);
        // setProducts(res.data.Products);
      })
      .catch((err) => console.log(err));
  };

  const getImages = () => {
    Axiosapi.get("/api/customize/get-slide-image")
      .then((res) => {
        // console.log(res.data)
        //  setSlideImages(res.data.Images)
        setImagesList(res.data.Images);
        // res.data.Images.map((item,index)=>{
        //  })

        //  console.log(imagesList);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const fetchProductsByCategory = (categoryId,categoryId2) => {
    Axiosapi.post("/api/product/product-by-category", {
      catId: categoryId,
    })
      .then((res) => {
        // console.log(res.data)
        setProducts1(res.data.Products);
      })
      .catch((err) => console.log(err));

  Axiosapi.post("/api/product/product-by-category", {
    catId: categoryId2,
  })
    .then((res) => {
      // console.log(res.data)
      setProducts2(res.data.Products);
    })
    .catch((err) => console.log(err));
};

  // const _retrieveData = async () => {
  //   try {
  //     const id = await AsyncStorage.getItem("userId");

  //     if (id !== null) {
  //       Axiosapi.post("/api/cart/getCartItems", {
  //         id: id,
  //       })
  //         .then((res) => {
  //           // console.log(res.data);
  //           setData({
  //             cartItems: res.data.cartItems,
  //             total_cost: res.data.total_cost,
  //           });

  //           // setScreenLoading(false);
  //         })
  //         .catch((err) => console.log(err));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    setLoading(true);
    // _retrieveData();
    getData()
    getImages();
    
    // fetchData();
  }, []);

  const Header = () => {
    return (
      <View
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
          // marginTop: 30,
          backgroundColor: COLORS.primary,
          width: SIZES.width,
          // borderBottomRightRadius: 30,
          // borderBottomLeftRadius: 30,
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            width: SIZES.width,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            // marginBottom: 10,
            paddingHorizontal: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ borderWidth: 0 }}
          >
            <Image
              resizeMode="contain"
              source={icons.menu}
              style={{ width: 24, height: 24, margin: 10, tintColor: "white" }}
            />
          </TouchableOpacity>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 30, fontWeight: "bold", color: COLORS.white }}
            >
              Milkwale
            </Text>
          </View>
          <View
            style={{
              width: "16%",
              // borderWidth:1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              margin: 10,
            }}
          >
            {/* <TouchableOpacity
              onPress={() => {
                navigation.navigate("NotificationScreen");
              }}
            >
              <Image
                resizeMode="contain"
                source={icons.bell}
                style={{
                  width: 22,
                  height: 22,
                  marginVertical: 10,
                  tintColor: "white",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                resizeMode="contain"
                source={icons.searchblack}
                style={{
                  width: 22,
                  height: 22,
                  marginVertical: 10,
                  tintColor: "white",
                }}
              />
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    );
  };
  const SwipeComponent = (src) => {
    return (
      <View
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: COLORS.bg,
          width: SIZES.width,
          borderBottomRightRadius: 30,
          borderBottomLeftRadius: 30,
          paddingBottom: 120,
          // borderWidth: 1,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            backgroundColor: COLORS.primary,
            width: SIZES.width,
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
            paddingBottom: 100,
            // borderWidth: 1,
          }}
        ></View>
        <View
          style={{
            // borderWidth: 1,
            paddingHorizontal: 20,
            paddingBottom: 30,
            borderRadius: 20,
            position: "absolute",
            width: "100%",
            height: 240,
            top: 10,
          }}
        >
          <Image
            resizeMode="cover"
            source={{ uri: `${baseURL}/uploads/customize/${src}` }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 10,
              // borderWidth: 1,
            }}
          />
        </View>
      </View>
    );
  };
  const Body = () => {
    return (
      <ScrollView
        style={{
          // flex: 1,
          // borderWidth: 1,
          // marginTop: 110,
          padding: 10,
          // paddingBottom: 30,
          marginBottom: 50,
          backgroundColor: COLORS.bg,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <View
              style={{
                width: "50%",
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                }}
              >
                {category1.cName}
              </Text>
            </View>
            <View
              style={{
                width: "50%",
                alignItems: "flex-end",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.primary,
                  borderRadius: 15,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                }}
                onPress={() => {
                  navigation.navigate("AllProductsScreen");
                }}
              >
                <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                  View all
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            style={{ width: "100%", height: SIZES.height * 0.34 }}
            horizontal
            data={products1}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => {
              return (
                <View key={index}>
                  <Card
                    food={{ name: item.pName }}
                    productName={item.pName}
                    productPrice={item.pPrice}
                    productImages={item.pImages[0]}
                    product={item}
                    onPress={() =>
                      navigation.navigate("ProductDetailScreen", {
                        item: item,
                      })
                    }
                  />
                </View>
              );
            }}
            showsHorizontalScrollIndicator={false}
          ></FlatList>
          {/* <ScrollView
            style={{ width: "100%", height: SIZES.height * 0.34 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          > */}
          {/* <Card
              src={images.milk}
              name="Beautiful Card"
              food={{name:'Milk',image:images.milk3}}
              // navigation={navigation}
              onPress={() => {
                navigation.navigate("TestScreen");
              }}
            />
            <Card
              src={images.milk}
              name="Beautiful Card"
              food={{name:'Milk',image:images.milk3}}
              onPress={() => navigation.navigate("TestScreen")}
            />
            <Card
              src={images.milk}
              name="Beautiful Card"
              food={{name:'Milk',image:images.milk3}}
              onPress={() => navigation.navigate("TestScreen")}
            /> */}
          {/* </ScrollView> */}
        </View>

        <View style={{ paddingBottom: 25 }}>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <View
              style={{
                width: "50%",
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                }}
              >
                 {category2.cName}
              </Text>
            </View>
            <View
              style={{
                width: "50%",
                alignItems: "flex-end",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.primary,
                  borderRadius: 15,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                }}
                onPress={() => {
                  navigation.navigate("AllProductsScreen");
                }}
              >
                <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                  View all
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            style={{ width: "100%", height: SIZES.height * 0.34 }}
            horizontal
            data={products2}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => {
              return (
                <View key={index}>
                  <Card
                    food={{ name: item.pName }}
                    productName={item.pName}
                    productPrice={item.pPrice}
                    productImages={item.pImages[0]}
                    product={item}
                    onPress={() =>
                      navigation.navigate("ProductDetailScreen", {
                        item: item,
                      })
                    }
                  />
                </View>
              );
            }}
            showsHorizontalScrollIndicator={false}
          >
            {/* <Card
              src={images.cheese}
              name="Beautiful Card"
              food={{name:'Cheese',image:images.cheese}}
              // navigation={navigation}
              onPress={() => {
                navigation.navigate("TestScreen");
              }}
            />
            <Card
              src={images.cheese}
              name="Beautiful Card"
              food={{name:'Cheese',image:images.cheese2}}
              onPress={() => navigation.navigate("TestScreen")}
            />
            <Card
              src={images.cheese}
              name="Beautiful Card"
              food={{name:'Cheese',image:images.cheese}}
              onPress={() => navigation.navigate("TestScreen")}
            /> */}
          </FlatList>
        </View>
      </ScrollView>
    );
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        {Header()}
        <ScrollView>
          <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
            <SwiperFlatList
              autoplay
              autoplayDelay={2}
              autoplayLoop
              index={0}
              showPagination
              data={imagesList}
              renderItem={({ item, index }) => (
                <View key={index}>{SwipeComponent(item.slideImage)}</View>
              )}
            />
          </View>
          {Body()}
        </ScrollView>
        {/* <View
          style={{
            // borderWidth: 1,
            paddingHorizontal: 20,
            paddingBottom: 20,
            borderRadius: 20,
            // marginHorizontal: 10,
            position: "absolute",
            width: "100%",
            height: 250,
            top: 80,
          }}
        >
          <Image
            resizeMode="cover"
            source={images.banner}
            style={{
              width: "100%",
              height: "100%",
              marginVertical: 10,
              borderRadius: 20,
            }}
          />
        </View> */}
      </SafeAreaView>
    </>
  );
}

export default Home;
