import React from 'react';
import { View, Text, Button, Image } from 'react-native';

const ImageList = ({ images, onSelectImage }) => (
    <View>
        {images.map((image, index) => (
            <View key={index}>
                <Image source={{ uri: image.uri }} style={{ width: 100, height: 100 }} />
                <Button title="View" onPress={() => onSelectImage(image)} />
            </View>
        ))}
    </View>
);

export default ImageList;
