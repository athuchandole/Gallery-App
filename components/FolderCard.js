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
    <TouchableOpacity style={styles.container} onPress={onAdvance} activeOpacity={0.85}>
      <View style={styles.thumbnailContainer}>
        {folder.thumb ? (
          <Image
            source={{ uri: folder.thumb }}
            style={styles.thumbnail}
            resizeMode="cover"
            accessible
            accessibilityLabel={`${folder.title} thumbnail`}
          />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>📁</Text>
          </View>
        )}
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.folderName} numberOfLines={1}>
          {folder.title}
        </Text>
        <Text style={styles.assetCount}>
          {folder.assetCount} {folder.assetCount === 1 ? "item" : "items"}
        </Text>

        {/* <TouchableOpacity
          style={styles.deleteButton}
          onPress={onAdvance}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={`Delete ${folder.title}`}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity> */}
      </View>
    </TouchableOpacity>
  );
};

const { width } = Dimensions.get("window");
const cardWidth = width > 600 ? (width - 80) / 2 : (width - 48) / 2;

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
    borderWidth: 0.5,
    borderColor: "#e5e7eb", // Tailwind gray-200
  },
  thumbnailContainer: {
    width: "100%",
    height: 120,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#f3f4f6", // Tailwind gray-100
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  placeholderText: {
    fontSize: 32,
    color: "#9ca3af", // gray-400
  },
  infoSection: {
    alignItems: "center",
  },
  folderName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937", // gray-800
    marginBottom: 4,
  },
  assetCount: {
    fontSize: 14,
    color: "#6b7280", // gray-500
    marginBottom: 12,
  },
  deleteButton: {
    backgroundColor: "#f87171", // rose-400
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  deleteText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
});

export default FolderCard;
