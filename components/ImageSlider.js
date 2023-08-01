import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import laundry from "../images/laundry.png";
import laundry2 from "../images/laundry2.png";



const ImageSlider = () => {
    const images = [laundry, laundry2,laundry2,laundry2];

    return (
        <View style={styles.container}>
            <SliderBox
                images={images}
                autoplay
                circleLoop
                dotColor="#1e90ff"
                inactiveDotColor="#fff"
                ImageComponentStyle={{
                    borderRadius: 10,
                    width: "94%",
                }}
            />
        </View>
    );
};

export default ImageSlider;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
});
