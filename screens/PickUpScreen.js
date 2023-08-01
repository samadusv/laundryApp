import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker';
import { getCurrentDate, getNextMonthDate} from '../services/DateServices';
import { useSelector } from "react-redux"
import Icon from "react-native-vector-icons/Ionicons"

const PickUpScreen = ({ navigation }) => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState([])
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState([])
  const cart = useSelector((state) => state.cart.cart)
  const totalPrice = cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0)
  const [toggle, setToggle] = useState(false)



  useEffect(() => {
    const currentDate = getCurrentDate()
    const endDates = getNextMonthDate(currentDate)
    setTimeout(()=>{
      setStartDate(currentDate)
      setEndDate(endDates)
    },500)
   
  }, [])
  const deliveryTime = [
    {
      id: "0",
      name: "2-3 Days"
    },
    {
      id: "1",
      name: "3-4 Days"
    },
    {
      id: "2",
      name: "4-5 Days"
    },
    {
      id: "3",
      name: "5-6 Days"
    },
    {
      id: "4",
      name: "Tomorrow",
    },
  ]
  const Time = [
    {
      id: "0",
      time: "11:00 PM"
    },
    {
      id: "1",
      time: "12:00 AM"
    },
    {
      id: "2",
      time: "1:00 AM"
    },
    {
      id: "3",
      time: "2:00 PM"
    },
    {
      id: "4",
      time: "3:00 PM"
    },
    {
      id: "5",
      time: "4:00 PM"
    },
  ]
  console.log(startDate);
  console.log(endDate);
  const proceedToCart = () => {
    if (!selectedDate || !selectedTime || !selectedDeliveryDate) {
      Alert.alert('Empty or Invalid', 'Please select above fields', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
        },
      ]);
    }
    else if (selectedDate && selectedTime && selectedDeliveryDate) {
      setToggle(true)

      function formatDateOnly(inputDate) {
        const dateObj = new Date(inputDate);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
      }
      const dates = formatDateOnly(selectedDate)
      setTimeout(() => {
        setToggle(false)

        navigation.replace("Cart", {
          date: dates,
          time: selectedTime,
          deliveryDate: selectedDeliveryDate
        })
      }, 500)

    }
  }

  return (
    <>
      <TouchableOpacity style={{
        flexDirection: "row", alignItems: "center", gap: 10, marginTop: 15, marginBottom: 19, marginLeft: 8
      }}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" color="#000" size={30} />
        <Text style={{ color: "#000", fontSize: 19, fontWeight: 500 }}>Back</Text>
      </TouchableOpacity>
      <SafeAreaView>
        <Text style={{ fontSize: 16, fontWeight: 500, marginHorizontal: 10, color: "#4c516d" }}>Enter Address</Text>
        <TextInput
          style={{ marginBottom: 12, padding: 40, borderWidth: 0.7, borderColor: "grey", paddingVertical: 80, borderRadius: 9, margin: 10, }}
        />
        <Text style={{ fontSize: 16, fontWeight: 500, marginHorizontal: 10, color: "#4c516d" }}>PickUp dates</Text>
        <View style={{ marginBottom: 10 }}>
          <HorizontalDatepicker
            mode="gregorian"
            startDate={new Date(startDate)}
            endDate={new Date(endDate)}
            initialSelectedDate={new Date('')}
            onSelectedDateChange={(date) => setSelectedDate(date)}
            selectedItemWidth={170}
            unselectedItemWidth={38}
            itemHeight={38}
            itemRadius={10}
            selectedItemTextStyle={styles.selectedItemTextStyle}
            unselectedItemTextStyle={styles.selectedItemTextStyle}
            selectedItemBackgroundColor="#222831"
            unselectedItemBackgroundColor="#ececec"
            flatListContainerStyle={styles.flatListContainerStyle}
          />
        </View>
        <Text style={{ fontSize: 16, fontWeight: 500, marginHorizontal: 10, color: "#4c516d" }}>Select Time</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginBottom: 12 }}
        >
          {Time.map((item, index) => {
            return (
              <TouchableOpacity key={index}
                onPress={() => setSelectedTime(item.time)}
                style={selectedTime.includes(item.time) ?
                  {
                    margin: 10, padding: 15, borderRadius: 7, borderColor: "#ff6347", borderWidth: 1.9
                  } : {
                    margin: 10, padding: 15, borderRadius: 7, borderColor: "grey", borderWidth: 0.7
                  }}
              >
                <Text style={{ fontSize: 17, fontWeight: 600, color: "#4c516d" }}>{item.time}</Text>
              </TouchableOpacity>)

          })}
        </ScrollView>
        <Text style={{ fontSize: 16, fontWeight: 500, marginHorizontal: 10, color: "#4c516d" }}>Delivery Period</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{}}
        >
          {deliveryTime.map((item, index) => {
            return (
              <TouchableOpacity key={index}
                onPress={() => setSelectedDeliveryDate(item.name)}
                style={selectedDeliveryDate.includes(item.name) ?
                  {
                    margin: 10, padding: 15, borderRadius: 7, borderColor: "#ff6347", borderWidth: 1.9
                  } : {
                    margin: 10, padding: 15, borderRadius: 7, borderColor: "grey", borderWidth: 0.7
                  }}
              >
                <Text style={{ fontSize: 17, fontWeight: 600, color: "#4c516d" }}>{item.name}</Text>
              </TouchableOpacity>)

          })}
        </ScrollView>

      </SafeAreaView>
      {totalPrice === 0 ? (
        null
      ) : (
        <TouchableOpacity
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
            onPress={proceedToCart}
          >
            <Text style={{ fontSize: 17, fontWeight: 600, color: "#fff" }}>Proceed to cart</Text>
          </TouchableOpacity>
        </TouchableOpacity >
      )}
      {toggle ? <View style={{ position: "absolute", top: "89.3%", left: "83%" }}>
        <ActivityIndicator
          size="100" color={"#fff"} style={{}}
        />
      </View> : null}
    </>
  )
}

export default PickUpScreen

const styles = StyleSheet.create({})