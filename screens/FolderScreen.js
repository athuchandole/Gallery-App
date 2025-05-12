import React, { useState, useEffect } from 'react';
import { View, Alert, Text, ActivityIndicator, StyleSheet, FlatList, Button } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

const FolderScreen = ({ navigation }) => {
    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            const granted = await requestPermissions();
            if (granted) {
                await fetchFolders();
            }
            setLoading(false);
        };

        init();
    }, []);

    const requestPermissions = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission required', 'Please allow access to media library in settings.');
            return false;
        }
        return true;
    };

    const fetchFolders = async () => {
        try {
            const albums = await MediaLibrary.getAlbumsAsync();

            if (albums.length === 0) {
                const allAssets = await MediaLibrary.getAssetsAsync({
                    mediaType: MediaLibrary.MediaType.photo,
                    first: 100,
                });

                setFolders([
                    {
                        id: 'all',
                        title: 'All Photos',
                        assetCount: allAssets.totalCount,
                        assets: allAssets.assets,
                    },
                ]);
            } else {
                setFolders(albums);
            }
        } catch (err) {
            console.log('Error fetching folders:', err);
            Alert.alert('Error', 'Failed to load media folders.');
        }
    };

    const handleSelectFolder = async (folder) => {
        if (folder.id === 'all') {
            navigation.navigate('ImageScreen', { folder });
        } else {
            const assets = await MediaLibrary.getAssetsAsync({
                album: folder,
                mediaType: MediaLibrary.MediaType.photo,
                first: 100,
            });

            navigation.navigate('ImageScreen', { folder: { ...folder, assets: assets.assets } });
        }
    };

    const handleAdvanceView = async (folder) => {
        let assets = [];

        if (folder.id === 'all' && folder.assets) {
            assets = folder.assets;
        } else {
            const result = await MediaLibrary.getAssetsAsync({
                album: folder,
                mediaType: MediaLibrary.MediaType.photo,
                first: 100,
            });
            assets = result.assets;
        }

        if (assets.length === 0) {
            Alert.alert('No images', 'This folder has no images to show.');
            return;
        }

        navigation.navigate('SwiperScreen', { images: assets });
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="gray" />
                <Text>Loading folders...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={folders}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.folderItem}>
                        <Text style={styles.folderName}>
                            {item.title} ({item.assetCount ?? item.assets?.length ?? 0})
                        </Text>
                        <View style={styles.buttonGroup}>
                            <Button title="Open" onPress={() => handleSelectFolder(item)} />
                            <View style={{ width: 10 }} />
                            <Button title="Advance" onPress={() => handleAdvanceView(item)} />
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    folderItem: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingBottom: 10,
    },
    folderName: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
});

export default FolderScreen;
