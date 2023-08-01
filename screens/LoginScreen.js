import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput, TouchableOpacity, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from "react-native-vector-icons/Ionicons"
import auth from "@react-native-firebase/auth"
import database from "@react-native-firebase/database"


const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassord] = useState("")
    const [errorMessage, setErrorMeesage] = useState("")

    const handleLogin = async () => {
        if (email && password) {
            try {
                const loginUser = await auth().signInWithEmailAndPassword(email, password)
                if (loginUser) {
                    navigation.navigate("Home")
                }
            } catch (error) {
                setErrorMeesage(error.message)
                setTimeout(() => {
                    setErrorMeesage("")
                }, 2576)
            }
        }
        else {
            setErrorMeesage("please enter all the field")
            setTimeout(() => {
                setErrorMeesage("")
            }, 2500)
        }
    }


    return (
        <SafeAreaView style={{ backgroundColor: "#fff", flex: 1, alignItems: "center", padding: 10 }}>
            <KeyboardAvoidingView>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 100 }}>
                    <Text style={{ fontSize: 20, color: "#662d91", fontWeight: "bold" }}>Sign In</Text>
                    <Text style={{ fontSize: 18, marginTop: 8, fontWeight: 600 }}>Sign In to your account</Text>

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
                                fontSize: email ? 18 : 18, color: "#000"
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
                                fontSize: password ? 18 : 18, color: "#000"
                            }}
                        />
                    </View>
                    <TouchableOpacity style={{
                        width: 200, backgroundColor: "#4169e1", padding: 15, borderRadius: 7, marginTop: 15,
                        marginLeft: "auto", marginRight: "auto", elevation: 7
                    }}
                        onPress={handleLogin}
                    >
                        <Text style={{ fontSize: 18, textAlign: "center", color: "#fff", fontWeight: 500 }}>Login</Text>
                    </TouchableOpacity>
                    {errorMessage !== "" ? 
                   <View style={{alignItems:"center"}}>
                     <Text style={{
                        textAlign: "center", fontSize: 17, color: "red", marginTop: 5,width:290,justifyContent:"center"
                    }}>{errorMessage}</Text>
                   </View> 
                    : ""}
                    <Pressable style={{ marginTop: 20 }}
                        onPress={() => navigation.navigate("Register")}
                    >
                        <Text style={{ textAlign: "center", fontSize: 17, color: "grey", fontWeight: 500 }}>Don't have a account? Sign up</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})