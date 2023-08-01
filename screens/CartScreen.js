import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import Icon from "react-native-vector-icons/Ionicons"
import { decrementQty, incrementQty } from '../redux/ProductReducer'
import { cleanCart, decrementQuantity, incrementQuantity } from '../redux/CartReducer'
import auth from "@react-native-firebase/auth"
import firestore from '@react-native-firebase/firestore';

const CartScreen = ({ navigation, route }) => {
    const { date, time, deliveryDate } = route.params;
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart.cart)
    const totalPrice = cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0)
    const currentUserUid = auth().currentUser;

    const placeOrder = async () => {
        navigation.navigate('Order');
        dispatch(cleanCart());
        await firestore().collection('users').doc(currentUserUid.uid).set({
            order: { ...cart },
            pickUpDetails: route.params,
        },
            {
                merge: true,
            })
    }
    return (<>
        <ScrollView style={{ marginTop: 5 }}>
            {totalPrice === 0 ? (
                <View style={styles.container}>
                    <Text style={styles.emptyCartText}>Your cart is empty</Text>
                    <TouchableOpacity 
                    onPress={()=>navigation.replace("Home")}
                    style={styles.backToHomeButton} ><Text  style={styles.backToHomeButtonText}>Back to Home screen</Text></TouchableOpacity>
                </View>
            ) : (
                <>
                    {/* <View style={{ padding: 10, flexDirection: "row", alignItems: "center", gap: 5 }}>
                        <Icon onPress={() => navigation.goBack()} name="arrow-back-circle-outline" size={30} color="#000" />
                        <Text style={{ color: "grey" }}>Your Bucket</Text>
                    </View> */}
                    <TouchableOpacity style={{
                        flexDirection: "row", alignItems: "center", gap: 10, marginTop: 15, marginBottom: 19, marginLeft: 8
                    }}
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name="arrow-back" color="#000" size={30} />
                        <Text style={{ color: "#000", fontSize: 19, fontWeight: 500 }}>Back</Text>
                    </TouchableOpacity>
                    <View style={{
                        borderRadius: 12, marginLeft: 10, marginRight: 10, padding: 0

                    }}>
                        {cart.map((item, index) => (
                            <View key={index} style={{
                                flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#fff", marginBottom: 10,
                                borderRadius: 10, padding: 9, elevation: 4,margin:15,width:"93%"
                            }}>
                                <Text style={{ width: 90, fontSize: 18, fontWeight: 500,color:"#4c516d" }}>{item.name}</Text>

                                <Text style={{ width: 80, fontSize: 18, fontWeight: 500 ,color:"#4c516d"}}>{"Rs " + item.price * item.quantity}</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 10, padding: 12 }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            dispatch(decrementQty(item))
                                            dispatch(decrementQuantity(item))
                                        }}
                                        style={{ backgroundColor: "#3cb371", width: 30, height: 30, borderRadius: 7, alignItems: "center", justifyContent: "center" }}>
                                        <Text style={{ fontSize: 23, color: "#fff" }}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 24 ,color:"#4c516d"}}>{item.quantity}</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            dispatch(incrementQty(item))
                                            dispatch(incrementQuantity(item))
                                        }}
                                        style={{ backgroundColor: "#3cb371", width: 30, height: 30, borderRadius: 7, alignItems: "center", justifyContent: "center" }}>
                                        <Text style={{ fontSize: 22, color: "#fff" }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>

                    <View style={{ marginHorizontal: 10 }}>
                        <Text style={{ fontSize: 17, fontWeight: 400, marginTop: 30,color:"#4c516d" }}>Billing Details</Text>
                        <View style={{ backgroundColor: "#fff", borderRadius: 7, padding: 10, marginTop: 15 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <Text style={{ fontSize: 18, fontWeight: 400, color: "grey" }}>Item Total</Text>
                                <Text style={{ fontSize: 18, fontWeight: 400 ,color:"#4c516d"}}>{"Rs" + totalPrice}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 8 }}>
                                <Text style={{ fontSize: 18, fontWeight: 400, color: "grey" }}>
                                    Delivery Fee | 1.2Km
                                </Text>
                                <Text style={{ fontSize: 18, fontWeight: 400, color: "#228b22" }}>
                                    Free
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={{ fontSize: 17, fontWeight: 400, color: "#228b22" }}>
                                    Free Delivery on your order
                                </Text>
                            </View>
                            <View style={{ borderColor: "#4c516d", height: 1, borderWidth: 0.5, marginTop: 10 }} />
                            <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between", marginVertical: 10 }}>
                                <Text style={{ fontSize: 18, fontWeight: 400, color: "grey" }}>
                                    Selected Date
                                </Text>
                                <Text style={{ fontSize: 19, fontWeight: 400, color: "#004953" }}>{date}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <Text style={{ fontSize: 18, fontWeight:400, color: "grey" }}>No of Days</Text>
                                <Text style={{ fontSize: 19, fontWeight: 400, color: "#004953" }}>{deliveryDate}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 10 }}>
                                <Text style={{ fontSize: 18, fontWeight:400, color: "grey" }}>Selected Pickup Time</Text>
                                <Text style={{ fontSize: 19, fontWeight: 400, color: "#004953" }}>{time}</Text>
                            </View>
                            <View style={{ borderColor: "#4c516d", height: 1, borderWidth: 0.5, marginTop: 10 }} />
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 10, padding: 10 }}>
                                <Text style={{ fontSize: 18, fontWeight: 500, color: "#000" }}>To Pay</Text>
                                <Text style={{ fontSize: 20, fontWeight: 500, color: "#000" }}>{"Rs " + totalPrice}</Text>
                            </View>

                        </View>
                    </View>
                </>
            )}
        </ScrollView>

        {totalPrice === 0 ? (
            null
        ) : (
            <View
                style={{
                    backgroundColor: "#2e8b57", padding: 10, marginBottom: 30, margin: 15, borderRadius: 7, flexDirection: "row",
                    alignItems: "center", justifyContent: "space-between", marginTop: "auto"
                }}
            >
                <View>
                    <Text style={{ fontSize: 15, fontWeight: 500, color: "#fff" }}>{cart.length} items | {totalPrice + " ₹"}</Text>
                    <Text style={{ fontSize: 14, fontWeight: 400, color: "#fff" }}>extra charges may apply</Text>
                </View>
                <TouchableOpacity
                    onPress={placeOrder}
                >
                    <Text style={{ fontSize: 17, fontWeight: 600, color: "#fff" }}>Place Order</Text>
                </TouchableOpacity>
            </View >
        )}
    </>
    )
}

export default CartScreen

const styles = StyleSheet.create({container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    marginTop:"50%"
  },
  emptyCartText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  backToHomeButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  backToHomeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },})