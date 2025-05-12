import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const FolderList = ({ folders, onSelectFolder }) => {
    return (
        <FlatList
            data={folders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.item}>
                    <Text style={styles.title}>{item.title} ({item.assetCount ?? item.assets?.length ?? 0})</Text>
                    <Button title="Open" onPress={() => onSelectFolder(item)} />
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 12,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    title: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default FolderList;
