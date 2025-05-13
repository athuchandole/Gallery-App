import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

const { width, height } = Dimensions.get('window');

const SwiperScreen = ({ route }) => {
  const { images } = route.params;

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
      // Check if we have permission to access media library
      const { status } = await MediaLibrary.getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await MediaLibrary.requestPermissionsAsync();
        if (newStatus !== 'granted') {
          Alert.alert('Permission Denied', 'We need permission to access your media library to delete photos.');
          return; // Exit the function if permission is denied
        }
      }

      // Move selected assets to temporary directory
      const tempDirectory = FileSystem.documentDirectory + 'temp/';
      await FileSystem.makeDirectoryAsync(tempDirectory, { intermediates: true });

      const movedFiles = [];
      for (let img of swipedRightImages) {
        const newUri = tempDirectory + img.filename;
        // Move file to temp directory
        await FileSystem.copyAsync({ from: img.uri, to: newUri });
        movedFiles.push(newUri);
      }

      // Now that the images are moved, proceed with deletion
      const assetIds = swipedRightImages.map((img) => img.id);

      // Delete from media library
      await MediaLibrary.deleteAssetsAsync(assetIds);

      // Clean up by removing files from the temporary directory (optional)
      for (let file of movedFiles) {
        await FileSystem.deleteAsync(file);
      }

      // Update card list after deletion
      const updatedCards = cards.filter(
        (img) => !assetIds.includes(img.id)
      );

      setCards(updatedCards);
      setSwipedRightImages([]);
      swiperRef.current.jumpToCardIndex(0);
    } catch (err) {
      console.error('Failed to delete images:', err);
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
            <Image source={{ uri: card.uri }} style={styles.image} />
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
