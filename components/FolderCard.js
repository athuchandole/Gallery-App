import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const FolderCard = ({ folder, onOpen, onAdvance }) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftSection}>
                {folder.thumb ? (
                    <Image source={{ uri: folder.thumb }} style={styles.thumbnail} />
                ) : (
                    <View style={styles.placeholder}>
                        <Text style={styles.placeholderText}>img</Text>
                    </View>
                )}
                <Text style={styles.folderName}>{folder.title}</Text>
            </View>

            <View style={styles.rightSection}>
                <TouchableOpacity style={[styles.button, styles.openButton]} onPress={onOpen}>
                    <Text style={styles.buttonText}>Open</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.advanceButton]} onPress={onAdvance}>
                    <Text style={styles.buttonText}>Advance</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f9f2ff',
        borderWidth: 2,
        borderColor: '#a684e4',
        borderRadius: 15,
        padding: 12,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 5,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    placeholder: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderColor: '#ff9a76',
        backgroundColor: '#ffe8d6',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    placeholderText: {
        fontSize: 20,
        fontWeight: '400',
        color: '#ff6f61',
    },
    folderName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#6a0dad',
    },
    rightSection: {
        flexDirection: 'row',
    },
    button: {
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 6,
        marginLeft: 8,
    },
    openButton: {
        backgroundColor: '#8ecae6',
    },
    advanceButton: {
        backgroundColor: '#f4a261',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 10,
        borderWidth: 2,
        borderColor: '#6a0dad',
    },
});

export default FolderCard;
