import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Alert,
  NativeModules,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const SwiperScreen = ({ route }) => {
  const { images } = route.params;
  const navigation = useNavigation();
  const { GalleryManager } = NativeModules;

  const [cards, setCards] = useState(images);
  const [swipedRightImages, setSwipedRightImages] = useState([]);
  const swiperRef = useRef(null);

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
        const filePath = img.uri.startsWith('file://') ? img.uri.replace('file://', '') : img.uri;
        const result = await GalleryManager.deleteFile(filePath);
        console.log(`Deleted: ${filePath} - Result:`, result);
      }

      setSwipedRightImages([]);
      setCards([]);
      navigation.navigate('FolderScreen');
    } catch (error) {
      console.error('Error deleting images:', error);
      Alert.alert('Error', 'Failed to delete one or more images.');
    }
  };

  return (
    <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.gradientContainer}>
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
        backgroundColor="transparent"
        cardIndex={0}
        disableTopSwipe
        disableBottomSwipe
        verticalSwipe={false}
        key={cards.length}
      />

      {swipedRightImages.length > 0 && (
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteText}>
            Delete {swipedRightImages.length} Selected
          </Text>
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    // Center swiper vertically & horizontally
    alignItems: 'center',
  },
  card: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#334155', // Slate-700
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 24,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    width: width*0.9, // ensure card width fills screen horizontally
    maxHeight: height * 0.6, // limit height for better centering
  },
  image: {
    width: width,
    height: '100%',
    resizeMode: 'contain',
  },
  deleteButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#ef4444', // Rose-500
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 10,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

export default SwiperScreen;
