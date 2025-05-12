import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';

const { width, height } = Dimensions.get('window');

const SwiperScreen = ({ route, navigation }) => {
    const { images } = route.params;

    return (
        <View style={styles.container}>
            <Swiper
                cards={images}
                renderCard={(card) => {
                    return (
                        <View style={styles.card}>
                            <Image source={{ uri: card.uri }} style={styles.image} />
                        </View>
                    );
                }}
                onSwipedLeft={(cardIndex) => {
                    // Previous swipe logic
                }}
                onSwipedRight={(cardIndex) => {
                    // Next swipe logic
                }}
                stackSize={3}
                backgroundColor="black"
                cardIndex={0}
                disableTopSwipe
                disableBottomSwipe
                verticalSwipe={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    card: {
        flex: 1,
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: width,
        height: height,
        resizeMode: 'contain',
    },
});

export default SwiperScreen;
