import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from "react-native-vector-icons/Ionicons"
import auth from "@react-native-firebase/auth"
import firestore from '@react-native-firebase/firestore';
import database from "@react-native-firebase/database"

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassord] = useState("")
    const [number, setNumber] = useState("")

    const handleRegister = async () => {
        if (email === "" || password === "" || number === "") {
            Alert.alert("Invalid data", "Please enter all the fields")
        }
        if (email && password && number) {
            const userInfo = await auth().createUserWithEmailAndPassword(email, password)

            const data = await firestore().collection("users").doc(userInfo.user.uid).set({
                id:userInfo.user.uid,
                email:userInfo.user.email,
                phoneNo:number

            })
            console.log("values are..",data);
        }
    }
    return (
        <SafeAreaView style={{ backgroundColor: "#fff", flex: 1, alignItems: "center", padding: 10 }}>
            <KeyboardAvoidingView>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 100 }}>
                    <Text style={{ fontSize: 20, color: "#662d91", fontWeight: "bold" }}>Register Here</Text>
                    <Text style={{ fontSize: 18, marginTop: 8, fontWeight: 600 }}>Create a new Account</Text>

                </View>
                <View style={{ marginTop: 15 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <Icon size={26} color="#000" name="mail-outline" />
                        <TextInput
                            placeholder='Email'
                            placeholderTextColor="#000"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            style={{
                                borderBottomWidth: 1, borderBottomColor: "grey", width: 280, marginVertical: 10, marginLeft: 10,
                                fontSize: email ? 18 : 18,color:"#000"
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <Icon size={26} color="#000" name="key-outline" />
                        <TextInput
                            placeholder='Passsword'
                            placeholderTextColor="#000"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(text) => setPassord(text)}
                            style={{
                                borderBottomWidth: 1, borderBottomColor: "grey", width: 280, marginVertical: 20, marginLeft: 10,
                                fontSize: password ? 18 : 18,color:"#000"
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <Icon size={26} color="#000" name="call-outline" />
                        <TextInput
                            placeholder='Phone Number'
                            placeholderTextColor="#000"
                            value={number}
                            onChangeText={(text) => setNumber(text)}
                            style={{
                                borderBottomWidth: 1, borderBottomColor: "grey", width: 280, marginVertical: 10, marginLeft: 10,
                                fontSize: number ? 18 : 18,color:"#000"
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={handleRegister}
                        style={{
                            width: 200, backgroundColor: "#4169e1", padding: 15, borderRadius: 7, marginTop: 15,

                            marginLeft: "auto", marginRight: "auto", elevation: 7
                        }}>
                        <Text style={{ fontSize: 18, textAlign: "center", color: "#fff", fontWeight: 500 }}>Register</Text>
                    </TouchableOpacity>
                    <Pressable style={{ marginTop: 20 }}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={{ textAlign: "center", fontSize: 17, color: "grey", fontWeight: 500 }}>Already Registered ? Sign in</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})