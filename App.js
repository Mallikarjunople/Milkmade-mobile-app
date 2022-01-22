import React, { useState, useEffect } from "react";
import HomeStackNavigator from "./src/navigations/Navigator";
import { StatusBar } from "react-native";
import { COLORS } from "./src/constants";
import DrawerNavigator from "./src/navigations/DrawerNavigator";
import axios from "axios";
import RootStackScreen from "./src/screens/RootStackScreen";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import { View, ActivityIndicator, Text, Image } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
enableScreens();
import { AuthContext } from "./src/components/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

// for adding auth later
export const Axiosapi = axios.create({
  baseURL: "https://milkmade.herokuapp.com/",
  // headers: {
  //   Authorization: `Bearer ${token}`,
  // },
});
// for image use from uploads folder
export const baseURL = "https://milkmade.herokuapp.com/";

function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState("");

  const authContext = React.useMemo(
    () => ({
      signIn: async () => {
        let token = await AsyncStorage.getItem("token");
        let userId = await AsyncStorage.getItem("userId");

        setUserToken(token);
        // await AsyncStorage.setItem('token',"secretToken")
        setIsLoading(false);
      },
      signOut: async () => {
        setUserToken("");
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("userId");
        setIsLoading(false);
        console.log("Singed out");
      }
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");
      setUserToken(token);

      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("./assets/images/splashLogo.png")}
          resizeMode="contain"
          style={{
            height:159,
            width:159
          }}
        />
        <Text style={{color:COLORS.primary,fontSize:22,fontWeight:'bold'}}>MilkMade</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <StatusBar
            barStyle="dark-content"
            hidden={true}
            backgroundColor={COLORS.primary}
            translucent={false}
          />
          {userToken !== "" ? <DrawerNavigator /> : <RootStackScreen />}
        </NavigationContainer>
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}
export default App;
