import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FolderScreen from '../screens/FolderScreen';
import ImageScreen from '../screens/ImageScreen';
import ViewerScreen from '../screens/ViewerScreen';
import SwiperScreen from '../screens/SwiperScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="FolderScreen" component={FolderScreen} options={{ title: 'Folders' }} />
            <Stack.Screen name="ImageScreen" component={ImageScreen} options={{ title: 'Images' }} />
            <Stack.Screen name="ViewerScreen" component={ViewerScreen} options={{ title: 'Viewer' }} />
            <Stack.Screen name="SwiperScreen" component={SwiperScreen} options={{ title: 'Swiper View' }} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
