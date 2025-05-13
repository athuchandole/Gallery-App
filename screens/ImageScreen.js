import React from 'react';
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 40) / 2; // Two columns with spacing

const ImageScreen = ({ route, navigation }) => {
  const { folder } = route.params;

  const handleImageClick = (image) => {
    navigation.navigate('ViewerScreen', { image });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Images from: {folder.title}</Text>

      <FlatList
        data={folder.assets}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleImageClick(item)} style={styles.card}>
            <Image
              source={{ uri: item.uri }}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#4c1d95',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    width: cardWidth,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    backgroundColor: '#e5e7eb',
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default ImageScreen;
