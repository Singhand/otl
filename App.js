import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, LogBox, TouchableHighlight } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootSiblingParent } from 'react-native-root-siblings';

import { useEffect } from 'react';

import { Provider } from 'react-redux';
import store from './redux/store';

import Home from './components/Home';
import Detail from './components/Detail';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {

  });

  return (
    <RootSiblingParent>
      <Provider store={store}>
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Home" screenOptions={{
                headerTransparent: true, headerTintColor: 'white', headerShown: false,
              }}>
                <Stack.Screen name="Home" component={Home} options={{ title: '' }} />
                <Stack.Screen name="Details" component={Detail} options={{ title: '' }} />
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
