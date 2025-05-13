import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import FolderCard from "../components/FolderCard";

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
    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Please allow access to media library in settings."
      );
      return false;
    }
    return true;
  };

  const fetchFolders = async () => {
    try {
      const albums = await MediaLibrary.getAlbumsAsync();
      let foldersWithThumbs = [];

      if (albums.length === 0) {
        const allAssets = await MediaLibrary.getAssetsAsync({
          mediaType: MediaLibrary.MediaType.photo,
          first: 1,
        });

        foldersWithThumbs = [
          {
            id: "all",
            title: "All Photos",
            assetCount: allAssets.totalCount,
            thumb: allAssets.assets[0]?.uri || null,
            assets: allAssets.assets,
          },
        ];
      } else {
        for (const album of albums) {
          const assets = await MediaLibrary.getAssetsAsync({
            album,
            mediaType: MediaLibrary.MediaType.photo,
            first: 1,
          });
        if(assets.assets[0]?.uri)
          foldersWithThumbs.push({
            ...album,
            thumb: assets.assets[0]?.uri || null,
          });
        }
      }

      setFolders(foldersWithThumbs);
    } catch (err) {
      console.log("Error fetching folders:", err);
      Alert.alert("Error", "Failed to load media folders.");
    }
  };

  const handleSelectFolder = async (folder) => {
    if (folder.id === "all") {
      navigation.navigate("ImageScreen", { folder });
    } else {
      const assets = await MediaLibrary.getAssetsAsync({
        album: folder,
        mediaType: MediaLibrary.MediaType.photo,
        first: 100,
      });

      navigation.navigate("ImageScreen", {
        folder: { ...folder, assets: assets.assets },
      });
    }
  };

  const handleAdvanceView = async (folder) => {
    let assets = [];

    if (folder.id === "all" && folder.assets) {
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
      Alert.alert("No images", "This folder has no images to show.");
      return;
    }

    navigation.navigate("SwiperScreen", { images: assets });
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
          <FolderCard
            folder={item}
            onOpen={() => handleSelectFolder(item)}
            onAdvance={() => handleAdvanceView(item)}
          />
        )}
        numColumns={2} // 💡 Key change to make 2 cards per row
        contentContainerStyle={{ paddingBottom: 16 }}
        columnWrapperStyle={{ justifyContent: "space-between" }} // adds space between two cards
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FolderScreen;
