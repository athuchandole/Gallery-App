import React from 'react';
import { View, Image, Button } from 'react-native';

const ImageViewer = ({ image, onClose }) => (
    <View>
        <Image source={{ uri: image.uri }} style={{ width: '100%', height: '100%' }} />
        <Button title="Close" onPress={onClose} />
    </View>
);

export default ImageViewer;
