import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

const FolderCard = ({ folder, onOpen, onAdvance }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onOpen}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {folder.thumb ? (
          <Image
            source={{ uri: folder.thumb }}
            style={styles.thumbnail}
            resizeMode="contain"
            accessible
            accessibilityLabel={`${folder.title} thumbnail`}
          />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>img</Text>
          </View>
        )}

        <Text style={styles.folderName} numberOfLines={1} ellipsizeMode="tail">
          {folder.title}
        </Text>

        {/* Asset count */}
        <Text style={styles.assetCount}>
          {folder.assetCount} {folder.assetCount === 1 ? "item" : "items"}
        </Text>

        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={onAdvance}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={`Delete ${folder.title}`}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const { width } = Dimensions.get("window");
const cardWidth = width > 600 ? (width - 80) / 2 : (width - 60) / 2;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d8b4fe",
    borderRadius: 16,
    padding: 16,
    margin: 8,
    width: cardWidth,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  content: {
    alignItems: "center",
  },
  placeholder: {
    width: 64,
    height: 64,
    borderWidth: 1,
    borderColor: "#fb923c",
    backgroundColor: "#ffedd5",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#f97316",
  },
  folderName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4c1d95",
    marginBottom: 4,
    textAlign: "center",
  },
  assetCount: {
    fontSize: 14,
    color: "#6b7280", // Tailwind gray-500
    marginBottom: 12,
  },
  button: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  deleteButton: {
    backgroundColor: "#ef4444",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
  },
  thumbnail: {
    width: "100%",
    height: 80,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#4c1d95",
  },
});

export default FolderCard;
