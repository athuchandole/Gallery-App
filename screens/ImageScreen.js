import React from 'react';
import { View, FlatList, Image, Text, StyleSheet } from 'react-native';

const ImageScreen = ({ route }) => {
    const { folder } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Images from: {folder.title}</Text>

            {/* Display images using FlatList */}
            <FlatList
                data={folder.assets}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: item.uri }}
                            style={styles.image}
                        />
                    </View>
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
