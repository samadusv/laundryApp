import { StyleSheet, Text, View, FlatList, SafeAreaView, ScrollView, RefreshControl, TouchableOpacity, ActivityIndicator, PermissionsAndroid, Image, Alert, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Geolocation from 'react-native-geolocation-service';
import Icon from "react-native-vector-icons/Ionicons"
import ImageSlider from '../components/ImageSlider';
import Services from '../components/Services';
import { useSelector, useDispatch } from "react-redux"
import { addProduct } from '../redux/ProductReducer';
import DressItem from '../components/DressItem';
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import { SliderBox } from "react-native-image-slider-box";

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart.cart)
    const [lat, setLat] = useState()
    const [longi, setLongi] = useState()
    const [datas, setDatas] = useState([])
    const [toggle, setToggle] = useState(false)
    const [image, setImage] = useState(0);
    const [refresh, setRefresh] = useState(false)
    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the location');
            } else {
                console.log('location permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };
    const getLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                setLat(position.coords.latitude.toFixed(2))
                setLongi(position.coords.longitude.toFixed(2))
            },
            (error) => {
                // See error code charts below.
                // console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }
    // requestLocationPermission()
    const getDatas = async () => {
        const data = await firestore().collection('types').get()
        const typesData = data.docs.map(doc => ({ ...doc.data() }));
        typesData.forEach((item) => {
            if (product.length === 0) {
                dispatch(addProduct(item))
            }

        })
    }

    const getDataImage = async () => {

        const info = await firestore().collection("profile").get();
        const typesData = info.docs.map((doc) => ({ ...doc.data() }));

        if (typesData.length > 0) {
            setImage(typesData[0].image);
        }else{
            setImage(null)
        }
    };
    useEffect(() => {

        getDatas()

        getDataImage()
        getLocation()
    }, [])
    const product = useSelector((state) => state.product.product)
    const totalPrice = cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0)
    const handleNext = () => {
        setToggle(true)
        setTimeout(() => {
            setToggle(false)
            navigation.navigate("Pickup")
        }, 600)
    }
    const pullMe = () => {
        setRefresh(true)
        
        setTimeout(() => {
            getDataImage()
            setRefresh(false)
        }, 1500)
    }
    return (
        <>
            <SafeAreaView showsVerticalScrollIndicator={false} style={{ backgroundColor: "#F0F0F0", flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refresh}
                            onRefresh={() => pullMe()}
                        />
                    }
                >
                    <View style={{
                        flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10,
                        marginTop: 0
                    }}>
                        <View style={{ backgroundColor: "#F0F0F0" }}
                            onPress={getDataImage}
                        >
                            <Icon name="location" size={30} color="#ff6347" />
                            <Text style={{ color: "grey", fontSize: 19, fontWeight: 600 }}>Home</Text>
                            <Text
                                style={{ color: "grey", fontSize: 17 }}
                            >latitude {lat} : longitude {longi}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ProfileScreen")}
                        >
                            {image ? <Image
                                source={{
                                    uri: image
                                }}
                                style={{ height: 50, width: 50, borderRadius: 25, resizeMode: "cover" }}
                            /> :
                                <Image
                                    source={require("../images/profile.png")}
                                    style={{ height: 50, width: 50, borderRadius: 25 }}
                                />}
                        </TouchableOpacity>
                    </View>
                    <View style={{}}>
                        <ImageSlider />
                    </View>
                    <View style={{ padding: 3, }}>
                        <Services />
                    </View>
                </ScrollView>
                {product.length !== 0 ? (
                    <View style={{ alignItems: "center", padding: 12, marginTop: -40 }}>
                        <Text style={{ fontSize: 18, fontWeight: 500, padding: 8, color: "#708090", marginLeft: -232 }}>Choose Your items</Text>

                        <FlatList
                            style={totalPrice > 0 ? { height: "33%" } : { height: "43%" }}
                            showsVerticalScrollIndicator={false}
                            data={product}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item, index }) => {
                                return (<DressItem item={item} index={index} />)
                            }}
                        />
                    </View>
                ) : (
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#696969', }}>Loading Items...</Text>
                        <View style={{}}>
                            <ActivityIndicator
                                size="100" color={"red"} style={{}}
                            />
                        </View>
                    </View>
                )}
                {/* </View> */}
            </SafeAreaView>
            {totalPrice === 0 ? (
                null
            ) : (
                <TouchableOpacity
                    style={{
                        backgroundColor: "#2e8b57", borderRadius: 7, flexDirection: "row",
                        alignItems: "center", justifyContent: "space-between", position: "absolute", top: "88.5%", width: "94%",
                        padding: 10, margin: 10
                    }}
                >
                    <View>
                        <Text style={{ fontSize: 15, fontWeight: 500, color: "#fff" }}>{cart.length} items | {totalPrice + " ₹"}</Text>
                        <Text style={{ fontSize: 14, fontWeight: 400, color: "#fff" }}>extra charges may apply</Text>
                    </View>
                    <TouchableOpacity
                        onPress={handleNext}
                    >
                        <Text style={{ fontSize: 17, fontWeight: 600, color: "#fff" }}>Proceed to pickup</Text>
                    </TouchableOpacity>
                </TouchableOpacity >
            )}
            {toggle ? <View style={{ position: "absolute", top: "89.5%", left: "83%" }}>
                <ActivityIndicator
                    size="100" color={"#fff"} style={{}}
                />
            </View> : null}
        </>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})