import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from "@react-native-firebase/storage"
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth";

const Add = () => {

    const [imageData, setImageData] = useState(null)
    const [imageUrl, setImageUrl] = useState('')
    const [userUid, setUserUid] = useState('')
    const [image, setImage] = useState(null)

    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            setUserUid(user.uid)
        })
        setTimeout(async ()=>{
            const info = await firestore().collection("users").get();
            // const typesData = info.docs.map(doc => ({ ...doc.data() }));
            setImage(info._docs[0]._data)
        },100)
    })
// console.log(userUid);
    const openCamera = async () => {
        const result = await launchCamera({ mediaType: 'photo' });
        // console.log(result);
        setImageData(result)
    };
    const openGallery = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo' });
        // console.log(result);
        setImageData(result)
    };
    const uploadImage = async () => {
        const reference = storage().ref(imageData.assets[0].fileName);
        const pathToFile = imageData.assets[0].uri;
        await reference.putFile(pathToFile);
        const url = await storage().ref(imageData.assets[0].fileName).getDownloadURL();
        // console.log(url);
        const value = await firestore().collection('users').doc(userUid).set({
            image: url
        })
        // console.log(value);


    }
    const getData = async () => {
        const info = await firestore().collection("users").get();
        // const typesData = info.docs.map(doc => ({ ...doc.data() }));
        setImage(info._docs[0]._data)
    }


    return (
        <View style={{ flex: 1 }}>
            <View style={{
                width: "100%", height: 60, justifyContent: "space-between", alignItems: 'center',
                flexDirection: "row", borderBottomWidth: 0.5, borderBlockStartColor: "#8e8e8e"
            }}>
                <Text style={{ marginLeft: 20, fontSize: 20, color: "black" }}>Post</Text>
                <Text
                    onPress={() => {
                        if (imageData !== null) {
                            uploadImage()
                        }
                    }}
                    style={{ marginLeft: 20, fontSize: 20, color: imageData !== null ? "green" : "grey", padding: 10 }}> Upload</Text>
            </View>

            <View style={{ width: "90%", height: 150, alignSelf: "center", borderWidth: 0.2, marginTop: 20, borderRadius: 10, flexDirection: "row" }}>
                {image !== null ? (
                    <Image
                        style={{ resizeMode: "stretch", height: 100, width: 100 }}
                        source={{
                            uri: image.image
                        }}
                    />) : (
                    <Image
                        style={{ height: 100, width: 100, resizeMode: "stretch" }}
                        source={{
                            uri: "https://th.bing.com/th/id/OIP.DBLS_UZz3ukadDrss0DW5gHaFj?w=263&h=197&c=7&r=0&o=5&dpr=1.9&pid=1.7"
                        }}
                    />

                )}
            </View>
            <TouchableOpacity
                onPress={openCamera}
                style={{ marginTop: 30, width: "100%", height: 50, borderBottomWidth: 0.2, borderBottomColor: "38e8e8e", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ marginLeft: 20 }}>Open camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={openGallery}
                style={{ marginTop: 30, width: "100%", height: 50, borderBottomWidth: 0.2, borderBottomColor: "38e8e8e", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ marginLeft: 20 }}>Open gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={getData}
                style={{ marginTop: 30, width: "100%", height: 50, borderBottomWidth: 0.2, borderBottomColor: "38e8e8e", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ marginLeft: 20 }}>getData</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Add

const styles = StyleSheet.create({})