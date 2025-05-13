import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ImageViewer = ({ image, onClose, onDelete }) => {
    return (
        <View style={styles.container}>
            <View style={styles.topIcons}>
                <TouchableOpacity onPress={onClose}>
                    <MaterialCommunityIcons name="close" color="white" size={30} />
                </TouchableOpacity>
                {onDelete && (
                    <TouchableOpacity onPress={onDelete}>
                        <MaterialCommunityIcons name="trash-can-outline" color="white" size={30} />
                    </TouchableOpacity>
                )}
            </View>

            <Image
                source={{ uri: image.uri }}
                style={styles.image}
                resizeMode="contain"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
    },
    topIcons: {
        position: 'absolute',
        top: 40,
        left: 20,
        right: 20,
        zIndex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default ImageViewer;
