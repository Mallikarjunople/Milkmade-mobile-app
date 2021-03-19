import React, { useState, useEffect } from "react";
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";

import { icons, COLORS, SIZES, FONTS, images } from "../constants";
import Icon from "react-native-vector-icons/MaterialIcons";
import Card from "../common/Card";
import { Axiosapi, baseURL } from "../../App";
const { width } = Dimensions.get("screen");
const cardWidth = width / 2 - 20;

const AllProductsScreen = (props) => {
  let vendorData = [
    {
      id: "1",
      name: "Milk",
      ingredients: "Milk",
      price: "8.30",
      image: images.milk4,
    },
    {
      id: "2",
      name: "Yoghurt",
      ingredients: "Yoghurt",
      price: "8.30",
      image: images.yoghurt,
    },
    {
      id: "3",
      name: "Cheese",
      ingredients: "Cheese",
      price: "8.30",
      image: images.cheese,
    },
    {
      id: "4",
      name: "Paneer",
      ingredients: "Paneer",
      price: "8.30",
      image: images.paneer,
    },
    {
      id: "5",
      name: "Milk",
      ingredients: "Milk",
      price: "8.30",
      image: images.milk3,
    },
    {
      id: "6",
      name: "Cheese",
      ingredients: "Cheese",
      price: "8.30",
      image: images.cheese2,
    },
    {
      id: "7",
      name: "Milk",
      ingredients: "Milk",
      price: "8.30",
      image: images.milk,
    },
    {
      id: "8",
      name: "Cheese",
      ingredients: "Cheese",
      price: "8.30",
      image: images.cheese,
    },
    {
      id: "9",
      name: "Paneer",
      ingredients: "Paneer",
      price: "8.30",
      image: images.paneer2,
    },
    {
      id: "10",
      name: "Yoghurt",
      ingredients: "Yoghurt",
      price: "8.30",
      image: images.yoghurt,
    },
    {
      id: "11",
      name: "Yoghurt",
      ingredients: "Yoghurt",
      price: "8.30",
      image: images.yoghurt2,
    },
    {
      id: "12",
      name: "Milk",
      ingredients: "Milk",
      price: "8.30",
      image: images.milk2,
    },
  ];

  const categories = [
    {
      id: "1",
      name: "All Products",
      image: images.banner,
    },
    {
      id: "2",
      name: "Milk",
      image: images.milk3,
    },
    {
      id: "3",
      name: "Yoghurt",
      image: images.yoghurt,
    },
    {
      id: "4",
      name: "Cheese",
      image: images.cheese,
    },
    {
      id: "5",
      name: "Paneer",
      image: images.paneer,
    },
  ];

  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [loadOnce, setLoadOnce] = React.useState(true);
  const [dataCategories, setDataCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const variantSelected = () => {};

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    //  Alert.alert("Products Screen","")
    Axiosapi.get("/api/category/all-category")
      .then((res) => {
        //  console.log(res.data)
        setDataCategories(res.data.Categories);
      })
      .catch((err) => console.log(err));

    Axiosapi.get("/api/product/all-product")
      .then((res) => {
        //  console.log(res.data)
        setAllProducts(res.data.Products);
      })
      .catch((err) => console.log(err));
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
          <TouchableOpacity onPress={() => props.navigation.navigate("Tabs")}>
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
  // for all products by default
  // useEffect(() => {
  //   onSelectCategory("All Products")
  // }, [])

  function onSelectCategory(category) {
    //filter restaurant
    setLoadOnce(false);
    if (category === "All-Products") {
      setData(allProducts);
    } else {
      let filteredProducts = allProducts.filter((a) =>
        a.pCategory.cName.includes(category)
      );
      setData(filteredProducts);
    }
    // console.log(category)
  }

  const filterCategoryDetails = (name) => {
    return vendorData.filter((item) => item.ingredients === name);
    // console.log(data)
  };

  function renderHeader() {
    return (
      <View style={styles.header}>
        <Icon
          name="arrow-back-ios"
          size={24}
          onPress={props.navigation.goBack}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Add Product</Text>
      </View>
    );
  }

  const ListCategories = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesListContainer}
        style={{ margin: 10 }}
      >
        <TouchableOpacity
          key={0}
          activeOpacity={0.8}
          onPress={() => {
            setSelectedCategoryIndex(0);
            onSelectCategory('All-Products');
            // setfilterCategory(category.name);
            // filterCategoryDetails(category.name);
          }}
        >
          <View
            style={{
              backgroundColor:
                selectedCategoryIndex == 0 ? COLORS.primary : COLORS.gray,
              ...styles.categoryBtn,
            }}
          >
            <View style={styles.categoryBtnImgCon}>
              <Image
                source={images.emptycart}
                resizeMode="cover"
                style={{
                  height: 35,
                  width: 35,
                  resizeMode: "cover",
                  borderRadius: 50,
                }}
              />
            </View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                marginHorizontal: 5,
                color: COLORS.white,
              }}
            >
              All Products
            </Text>
          </View>
        </TouchableOpacity>
        {dataCategories.map((category, index) => (
          <TouchableOpacity
            key={index+1}
            activeOpacity={0.8}
            onPress={() => {
              setSelectedCategoryIndex(index+1);
              onSelectCategory(category.cName);
              // setfilterCategory(category.name);
              // filterCategoryDetails(category.name);
            }}
          >
            <View
              style={{
                backgroundColor:
                  selectedCategoryIndex == index+1 ? COLORS.primary : COLORS.gray,
                ...styles.categoryBtn,
              }}
            >
              <View style={styles.categoryBtnImgCon}>
                <Image
                  source={{
                    uri: `${baseURL}/uploads/categories/${category.cImage}`,
                  }}
                  resizeMode="cover"
                  style={{
                    height: 35,
                    width: 35,
                    resizeMode: "cover",
                    borderRadius: 50,
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginHorizontal: 5,
                  color: COLORS.white,
                }}
              >
                {category.cName}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  //   const Card = ({ food }) => {
  //     return (
  //       <TouchableHighlight underlayColor={COLORS.white} activeOpacity={1} style={{}} >
  //         <View
  //           style={
  //             (styles.card,
  //             {
  //               backgroundColor: "#FFF",
  //               height: SIZES.height * 0.25,
  //               width: SIZES.width /2,
  //               elevation: 1,
  //               borderRadius: 10,
  //               paddingHorizontal: 12,
  //               paddingVertical: SIZES.height * 0.01,
  //               marginHorizontal: SIZES.width * 0.005,
  //               marginVertical: SIZES.height * 0.005,
  //             })
  //           }
  //         >

  //           <Image
  //             source={images.milk2}
  //             resizeMode="cover"
  //             style={{
  //               width: "100%",
  //               height: "60%",
  //               borderRadius: 10,
  //               borderWidth: 1,
  //             }}
  //           />
  //           {/* <View style={{ alignItems: "center", paddingTop: 10 }}>
  //             <Image
  //               source={food.image}
  //               resizeMode="cover"
  //               style={{ height: 100, width: 120, borderRadius: 10 }}
  //             />
  //           </View> */}
  //           <View
  //             style={{
  //               flexDirection: "row",
  //               justifyContent: "space-between",
  //               alignItems: "center",
  //             }}
  //           >
  //             <View style={{ marginHorizontal: 20, width: "50%" }}>
  //               <Text style={{ fontSize: 15, fontWeight: "bold" }}>
  //                 {food.name}
  //               </Text>
  //               <Text style={{ fontSize: 13, color: COLORS.grey, marginTop: 2 }}>
  //                 {food.ingredients}
  //               </Text>
  //             </View>
  //             <TouchableOpacity
  //               style={{
  //                 marginTop: 10,
  //                 marginRight: 10,
  //               }}
  //               onPress={() => {
  //                 Alert.alert("Action", "Product Added");
  //               }}
  //             >
  //               <View style={styles.addToCartBtn}>
  //                 <Icon name="add" size={20} color={COLORS.white} />
  //               </View>
  //             </TouchableOpacity>
  //           </View>
  //         </View>
  //       </TouchableHighlight>
  //     );
  //   };

  function renderCategory() {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        keyExtractor={(item) => item._id}
        data={loadOnce ? allProducts : data}
        renderItem={({ item, index }) => {
          // let imagesingle = item.pImages[3];
          return (
            <Card
              key={index}
              variantSelected={variantSelected}
              food={{ name: item.pName }}
              productName={item.pName}
              productPrice={item.pPrice}
              product={item}
              productImages={item.pImages[1]}
              onPress={() =>
                props.navigation.navigate("ProductDetailScreen", {
                  item: item,
                })
              }
            />
          );
        }}
        // style={{borderWidth:2}}
        style={{ marginHorizontal: 10 }}
      />
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {Header()}
      {ListCategories()}
      {renderCategory()}
    </SafeAreaView>
  );
};

export default AllProductsScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: COLORS.lightGray2,
    paddingBottom: 110,
  },
  header: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
  },
  categoriesListContainer: {
    padding: 10,
    alignItems: "center",
  },
  categoryBtn: {
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: "center",
    paddingHorizontal: 5,
    flexDirection: "row",
  },
  cardList: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding * 3,
    borderBottomColor: COLORS.lightGray2,
    borderBottomWidth: 2,
  },
  OrderButton: {
    width: "40%",
    padding: SIZES.padding,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.radius,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: COLORS.light,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryBtn: {
    height: 45,
    minWidth: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: "center",
    paddingHorizontal: 5,
    flexDirection: "row",
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    // height: 220,
    // borderWidth:1,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 10,
    paddingBottom: 10,
    borderRadius: 15,
    elevation: 1,
    backgroundColor: COLORS.white,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
