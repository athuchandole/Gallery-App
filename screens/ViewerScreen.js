import React from 'react';
import { View } from 'react-native';
import ImageViewer from '../components/ImageViewer';

const ViewerScreen = ({ route, navigation }) => {
    const { image } = route.params;

    return (
        <View style={{ flex: 1 }}>
            <ImageViewer
                image={image}
                onClose={() => navigation.goBack()}
            />
        </View>
    );
};

export default ViewerScreen;
