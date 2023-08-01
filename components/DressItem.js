import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { addToCart, decrementQuantity, incrementQuantity } from '../redux/CartReducer'
import { decrementQty, incrementQty } from '../redux/ProductReducer'

const DressItem = ({ item, index }) => {
  const cart = useSelector((state) => state.cart.cart)

  const dispatch = useDispatch()
  const addItemToCart = () => {
    dispatch(addToCart(item))
    dispatch(incrementQty(item))
  }

  return (
    <View key={index} style={{
      flexDirection: "row", justifyContent: "space-between",
      backgroundColor: "#fff", marginBottom: 17, width: "93.5%", alignItems: "center",
      borderRadius: 10, elevation: 5,
    }}>
      <View style={{ margin: 15 }}>
        <Image
          source={{uri:item.image}}
          style={{ resizeMode: "stretch", height: 60, width: 60 }}
        />
      </View>
      <View style={{ margin: 15, alignItems: "center" }}>
        <Text style={{ fontSize: 17, fontWeight: 500, color: "#696969" }}>{item.name}</Text>
        <Text style={{ fontSize: 17, color: "#778899", fontWeight: 500 }}>{item.price + "₹"}</Text>
      </View>
      {cart.find((carts) => carts.id === item.id) ? ( 
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10, padding: 12 }}>
          <TouchableOpacity
            onPress={() => {
              dispatch(decrementQuantity(item))
              dispatch(decrementQty(item))
            }
            }
            
            style={{ backgroundColor: "#3cb371", width: 30, height: 30, borderRadius: 7, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 23, color: "#fff" }}>-</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 24 ,color:"#000"}}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => {
              dispatch(incrementQty(item))
              dispatch(incrementQuantity(item))
            }}
            style={{ backgroundColor: "#3cb371", width: 30, height: 30, borderRadius: 7, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 22, color: "#fff" }}>+</Text>
          </TouchableOpacity>
        </View>
      
      )
       : (
        <TouchableOpacity
          onPress={addItemToCart}
          style={{
            margin: 15, backgroundColor: "#3cb371", width: 60, height: 27, borderRadius: 6,
            alignItems: "center", justifyContent: "center"
          }}>
          <Text style={{ color: "#fff", fontWeight: 500 }}>Add</Text>
        </TouchableOpacity>
      )
      }



    </View>
  )
}

export default DressItem

const styles = StyleSheet.create({})