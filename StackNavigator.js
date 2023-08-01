import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from './screens/HomeScreen'
import PickUpScreen from './screens/PickUpScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import SplashScreen from './screens/SplashScreen'
import OrderScreen from './screens/OrderScreen'
import ProfileScreen from './screens/ProfileScreen'
import MyCart from './screens/MyCart'
import ImageScreen from './screens/ImageScreen'
import Add from './screens/Add'

const Stack = createNativeStackNavigator()
const StackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Splash'>
                <Stack.Screen name='Home' component={HomeScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name='Pickup' component={PickUpScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name='Cart' component={CartScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name='Login' component={LoginScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name='Register' component={RegisterScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name='Splash' component={SplashScreen}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen name='Order' component={OrderScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name='ProfileScreen' component={ProfileScreen}
                    options={{
                        headerShown: false
                    }}
                />
                  <Stack.Screen name='MyCart' component={MyCart}
                    options={{
                        headerShown: true
                    }}
                />
                 <Stack.Screen name='ImageScreen' component={ImageScreen}
                    options={{
                        headerShown: false
                    }}
                />
                  <Stack.Screen name='Add' component={Add}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})