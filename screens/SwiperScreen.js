import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Alert,
  NativeModules
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const SwiperScreen = ({ route }) => {
  const { images } = route.params;
  const navigation=useNavigation();
  const { GalleryManager } = NativeModules;
  const [cards, setCards] = useState(images); // Image list
  const [swipedRightImages, setSwipedRightImages] = useState([]); // Selected for deletion
  const swiperRef = useRef(null);

  // Ask permission on mount
  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Cannot delete images without permission.');
      }
    })();
  }, []);

  const handleSwipedRight = (cardIndex) => {
    const swipedImage = cards[cardIndex];
    setSwipedRightImages((prev) => [...prev, swipedImage]);
  };

const handleDelete = async () => {
  try {
    if (swipedRightImages.length === 0) {
      Alert.alert('No images selected', 'Swipe right on images to select them for deletion.');
      return;
    }

    await GalleryManager.requestAllFilesAccess();

    for (let img of swipedRightImages) {
      const filePath = img.uri.startsWith("file://") ? img.uri.replace("file://", "") : img.uri;
      console.log("Normalized path:", filePath);
      const result = await GalleryManager.deleteFile(filePath);
      console.log(`Deleted: ${filePath} - Result:`, result);
    }

    // ✅ Immediately clear state to avoid re-rendering issues
    setSwipedRightImages([]);
    setCards([]);

    // ✅ Navigate after clearing
    navigation.navigate('FolderScreen');

  } catch (error) {
    console.error('Error deleting images:', error);
    Alert.alert('Error', 'Failed to delete one or more images.');
  }
};




  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        cards={cards}
        renderCard={(card) => (
          <View style={styles.card}>
            <Image source={{ uri: card?.uri }} style={styles.image} />
          </View>
        )}
        onSwipedRight={handleSwipedRight}
        stackSize={3}
        backgroundColor="black"
        cardIndex={0}
        disableTopSwipe
        disableBottomSwipe
        verticalSwipe={false}
        key={cards.length}
      />

      {swipedRightImages.length > 0 && (
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteText}>Delete {swipedRightImages.length} Selected</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
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
  deleteButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#ef4444',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
    zIndex: 10,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SwiperScreen;
