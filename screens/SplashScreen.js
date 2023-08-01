import { StyleSheet, Text, View, ActivityIndicator, Image, Animated } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { StackActions } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";

const SplashScreen = ({ navigation }) => {
  const [toggle, setToggle] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      setToggle(true);
      setTimeout(async () => {
        auth().onAuthStateChanged((user) => {
          const routeName = user !== null ? "Home" : "Login";
          // navigation.dispatch(StackActions.replace(routeName));
          navigation.navigate(routeName)

        });
      }, 2500);
    }, 800);
  }, []);

  useEffect(() => {
    if (toggle) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [toggle]);

  const animatedTextStyle = {
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 3],
          outputRange: [1, -20],
        }),
      },
    ],
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <Image
            source={require("../images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {toggle ? (
          <Animated.View style={{ ...styles.textView, ...animatedTextStyle }}>
            <Text style={styles.text}>Clean</Text>
            <Text style={[styles.text, styles.specialText]}>V</Text>
            <Text style={[styles.text, styles.specialText2]}>V</Text>
          </Animated.View>
        ) : null}
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: -100,
  },
  textView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 22,
    fontWeight: "300",
    color: "#536872",
    marginLeft:20
  },
  specialText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#000",
    marginLeft: 0,
  },
  specialText2:{
    fontSize: 24,
    fontWeight: "800",
    color: "#ff7f50",
    marginLeft: -17,
  }
});
