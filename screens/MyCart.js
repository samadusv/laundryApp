import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import firestore from "@react-native-firebase/firestore"
import { useSelector, useDispatch } from "react-redux"

const MyCart = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const { uid } = route.params
  const [cartData, setCartData] = useState([])
  const [date, setDate] = useState()
  const [cost, setCost] = useState(0)
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    userCartData()
  }, [2])

  const userCartData = async () => {
    try {
      const userDoc = await firestore().collection('users').doc(uid).get();

      if (userDoc.exists) {
        const orderItems = userDoc?.data()?.order;
        const dateDetails = userDoc?.data()?.pickUpDetails;
        setDate(dateDetails)
        const orderItemsMap = Object.values(orderItems)
        const totalPrice = orderItemsMap.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0)
        setCost(totalPrice)
        setCartData(orderItemsMap.map((item) => ({ ...item })));
      } else {
        setToggle(true);
      }
    } catch (error) {
      console.error('Error fetching user cart data:', error);
    }
  }

  const handleDeleteCart = async () => {
    try {
      await firestore().collection('users').doc(uid).delete();
      setToggle(true);
    } catch (error) {
      console.error('Error deleting user cart:', error);
    }
  }
  return (
    <>
      {toggle ? (<View style={styles.container}>
        <Text style={styles.message}>Sorry! Your Cart is empty</Text>
      </View>) : (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <View>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ padding: 10, paddingTop: 20, alignSelf: "center" }}
              data={cartData}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ alignItems: "center" }} key={index}>
                    <Image
                      source={{ uri: item.image }}
                      style={{ height: 100, width: 100, resizeMode: "stretch", borderRadius: 8 }}
                    />
                    <Text style={{ textAlign: "center", fontSize: 19, color: "#4a646c" }}>{item.name}</Text>
                  </View>
                )

              }}
            />
          </View>
          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalPriceLabel}>Total price</Text>
            <Text style={styles.totalPriceValue}>Rs {cost}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>{date?.date}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Delivery Date</Text>
              <Text style={styles.detailValue}>{date?.deliveryDate}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Delivery Time</Text>
              <Text style={styles.detailValue}>{date?.time}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={handleDeleteCart}
            style={styles.cancelButton}>
            <Text style={styles.cancelText}>Delete</Text>
          </TouchableOpacity>
        </SafeAreaView>)}
    </>
  )
}

export default MyCart

const styles = StyleSheet.create({
  itemsListContainer: {
    padding: 10,
    margin: 10,
    justifyContent: "center",
    height: 150,
  },
  itemContainer: {
    alignItems: "center",
    marginRight: 10,
  },
  itemImage: {
    height: 100,
    width: 100,
    resizeMode: "stretch",
    borderRadius: 8,
  },
  itemName: {
    textAlign: "center",
    fontSize: 19,
    color: "#4a646c",
  },
  totalPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  totalPriceLabel: {
    fontSize: 20,
    color: "#4a646c"
  },
  totalPriceValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3cb371"
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  detailItem: {
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  detailLabel: {
    fontSize: 19,
    color: "#4a646c"
  },
  detailValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000"
  },
  cancelButton: {
    backgroundColor: '#f44336',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 20,
  },
  cancelText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  }
})