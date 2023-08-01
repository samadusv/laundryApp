import { StyleSheet, Text, View, TouchableOpacity, PermissionsAndroid, Alert, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from "@react-native-firebase/storage"

const ImageScreen = () => {

    const [imageData, setImageData] = useState(null)
    const [imageUrl, setImageUrl] = useState('')

    const openCamera = async () => {
        const result = await launchCamera({ mediaType: 'photo' });
        console.log(result);
        setImageData(result)
    };

    //   const requestPermission = async () => {
    //     try {
    //       const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
    //         title: 'App Permission',
    //         message: 'Needs access to your camera',
    //         buttonNeutral: 'Ask me later',
    //         buttonPositive: 'OK',
    //         buttonNegative: 'Cancel',
    //       });
    //     //   console.log(granted);
    //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //         openCamera();
    //       } else {
    //         Alert.alert('Permission Denied', 'Please enable camera permission to take a photo.');
    //       }
    //     } catch (error) {
    //       console.warn(error);
    //     }
    //   };
const uploadImage = async()=>{
    const reference = storage().ref(imageData.assets[0].fileName);
    const pathToFile = imageData.assets[0].uri;
    await reference.putFile(pathToFile);
    const url = await storage().ref(imageData.assets[0].fileName).getDownloadURL();
    console.log(url);
}
    return (
        <View style={{ flex: 1 }}>

          {  imageData!==null?<Image
                style={{ resizeMode: "stretch", height: 100, width: 100 }}
                source={{
                    uri: imageData.assets[0].uri
                }}
            />:""}
            <TouchableOpacity
                onPress={openCamera}
                style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#536872',
                    top: 30,
                    padding: 10,
                    borderRadius: 10,
                }}
            >
                <Text style={{ textAlign: 'center', color: '#fff' }}>Take a Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#536872',
                    top: 30,
                    padding: 10,
                    borderRadius: 10,
                }}
                onPress={uploadImage}
                >
                <Text  style={{ textAlign: 'center', color: '#fff' }}>upload photo</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ImageScreen;

const styles = StyleSheet.create({});
