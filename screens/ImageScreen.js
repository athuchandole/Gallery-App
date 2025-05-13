import React from 'react';
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ImageScreen = ({ route, navigation }) => {
    const { folder } = route.params;

    const handleImageClick = (image) => {
        navigation.navigate('ViewerScreen', { image });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Images from: {folder.title}</Text>

            {/* Display images using FlatList */}
            <FlatList
                data={folder.assets}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleImageClick(item)}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: item.uri }}
                                style={styles.image}
                            />
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
    },
    imageContainer: {
        marginBottom: 15,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        resizeMode: 'cover',
    },
});

export default ImageScreen;
