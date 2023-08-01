import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from "react-native-vector-icons/Ionicons"
import Icons from "react-native-vector-icons/MaterialIcons"
import Iconss from "react-native-vector-icons/MaterialCommunityIcons"
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from "@react-native-firebase/storage"
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth";

const ProfileScreen = ({ navigation }) => {
    const [imageData, setImageData] = useState(null)
    const [toggle, setToggle] = useState(false)
    const [image, setImage] = useState(null)
    const [user, setUser] = useState('')
    const [urls, seturls] = useState(null)

    const handleSignout = async () => {
        await auth().signOut()
        navigation.navigate("Login")
    }

    useEffect(() => {
        const value = auth().currentUser;
        setUser(value)

        getImageData()

    }, [])


    // const uploadImage = async () => {
    //     const reference = storage().ref(imageData.assets[0].fileName);
    //     const pathToFile = imageData.assets[0].uri;
    //     await reference.putFile(pathToFile);
    //     const url = await storage().ref(imageData.assets[0].fileName).getDownloadURL();
    //     const value = await firestore().collection('users').doc(user.uid).set({
    //         image: url
    //     })


    // }
    // const imageDisplay = async () => {

    //     if (imageData !== null) {
    //         const reference = storage().ref(imageData.assets[0].fileName);
    //         const pathToFile = imageData.assets[0].uri;
    //         await reference.putFile(pathToFile);

    //         const url = await storage().ref(imageData.assets[0].fileName).getDownloadURL();

    //         await firestore().collection('profile').doc(user.uid).set({
    //             image: url
    //         },
    //             {
    //                 merge: true
    //             })
    //     }

    // }

    const openCamera = async () => {
        const result = await launchCamera({ mediaType: 'photo' });
        // setImageData(result)
        if (result !== null) {
            setToggle(!toggle)
            const reference = storage().ref(result.assets[0].fileName);
            const pathToFile = result.assets[0].uri;
            await reference.putFile(pathToFile);
            const url = await storage().ref(result.assets[0].fileName).getDownloadURL();
            seturls(url)
            await firestore().collection('profile').doc(user.uid).set({
                image: url
            },
                {
                    merge: true
                })
        }
        setTimeout(() => {
            getImageData()
        }, 100)

    };

    const openGallery = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo' });
        setImageData(result)
    };


    const getImageData = async () => {
        const info = await firestore().collection("profile").get();
        const typesData = info.docs.map(doc => ({ ...doc.data() }));
    
        if (typesData.length > 0) {
            setImage(typesData[0].image);
        }
    };
    const deleteImage = async () => {
        await firestore().collection('profile').doc(user.uid).delete();
        setImage(null)
        seturls(null)
        setToggle(!toggle)
    }
    return (
        <>
            <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 20, backgroundColor: "#fff" }}>
                <View style={{ marginTop: -140 }}>
                    <TouchableOpacity
                        onPress={() => setToggle(!toggle)}
                    >

                        {image != null ? <Image
                            source={{
                                uri: image
                            }}
                            style={{ resizeMode: "cover", height: 150, width: 150, borderRadius: 80 }}
                        /> :
                            <Image
                                source={require("../images/myProfile.png")}
                                style={{ resizeMode: "stretch", height: 150, width: 150 }}
                            />
                        }

                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={{
                    position: "absolute", top: 20, left: 15, flexDirection: "row", alignItems: "center", gap: 10

                }}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="arrow-back" color="#000" size={30} />
                    <Text style={{ color: "#000", fontSize: 20, fontWeight: 500 }}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ marginTop: 50 }}>
                    <Text style={{ textAlign: "center", marginTop: -50, marginBottom: 20, fontSize: 20, color: "#483d8b", fontWeight: "bold" }}>Welcome,</Text>
                    <Text style={{ fontSize: 20, color: "grey", fontWeight: 600 }}>{user.email}</Text>
                    <Text style={{ fontSize: 16, color: "#4682b4" }}>UID :{user.uid}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("MyCart", {
                        uid: user.uid
                    })}
                    style={styles.buttonContainer2}>
                    <Text style={styles.buttonText2}>My Cart</Text>
                </TouchableOpacity>
                {toggle?

                    <View style={{
                        flexDirection: "row", gap: 100, position: "absolute",
                        width: "93%", alignSelf: "center", alignItems: "center", justifyContent: "space-around",
                        bottom: 40
                    }}>
                        <TouchableOpacity
                            onPress={openCamera}
                            style={{ alignItems: "center" }}
                        >
                            <Icon color="#483d8b" size={40} name="camera" />
                            <Text style={{ fontSize: 17, color: "grey" }}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={openGallery}
                            style={{ alignItems: "center" }}
                        >
                            <Icons color="#014421" size={40} name="photo-library" />
                            <Text style={{ fontSize: 17, color: "grey" }}>Gallery</Text>


                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={deleteImage}
                            style={{ alignItems: "center" }}
                        >
                            <Iconss color="tomato" size={40} name="delete" />
                            <Text style={{ fontSize: 17, color: "grey" }}>Delete</Text>
                        </TouchableOpacity>

                    </View>

                    : ""}
                {/* <TouchableOpacity
                    onPress={imageDisplay}
                ><Text style={{ color: "#000" }}>Upload</Text></TouchableOpacity>
                <TouchableOpacity
                    onPress={getImageData}
                ><Text style={{ color: "#000" }}>getData</Text></TouchableOpacity> */}

            </SafeAreaView>
            <TouchableOpacity
                onPress={handleSignout}
                style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
        </>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 20,
        backgroundColor: '#ff6347',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        position: "absolute",
        right: 10

    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    buttonContainer2: {
        backgroundColor: '#483d8b',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText2: {
        color: "#fff",
        fontSize: 20,
        textAlign: 'center',
    },
})