import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { useEffect } from "react";

import { Provider } from "react-redux";
import store from "./redux/store";

import Detail from "./pages/Detail";
import Home from "./pages/Home";

// import mobileAds from 'react-native-google-mobile-ads';

// mobileAds()
//   .initialize()
//   .then(adapterStatuses => {
//     // Initialization complete!
//   });

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {});

  return (
    <RootSiblingParent>
      <Provider store={store}>
        <StatusBar></StatusBar>
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                  headerTransparent: true,
                  headerTintColor: "white",
                  headerShown: false,
                  animation: "none",
                }}
              >
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{ title: "" }}
                />
                <Stack.Screen
                  name="Details"
                  component={Detail}
                  options={{ title: "" }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </SafeAreaProvider>
      </Provider>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
