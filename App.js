import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from './screens/HomeScreen'
import {Provider} from "react-redux"
import Store from './redux/Store'
import StackNavigator from './StackNavigator'


const App = () => {
  return (
    <Provider store={Store}>
      <StackNavigator/>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})