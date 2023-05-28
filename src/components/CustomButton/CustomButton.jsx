import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

// props: 
// type --> indicates the type of button
// PRIMARY --> main buttons
// TERTIARY --> smaller, less obvious buttons
export default function CustomButton({ onPress, text, type = "PRIMARY" }) {
    return (
      <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
        <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
      </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3B71F3',

        width: '100%',

        padding: 15,
        marginVertical: 5,

        alignItems: 'center',
        borderRadius: 5,
    },

    container_PRIMARY: {
        backgroundColor: '#00bf63',
    },

    container_TERTIARY: {
        backgroundColor: '#f8f8f8',
    },

    text: {
        fontWeight: 'bold',
        color: 'white',
    },

    text_TERTIARY: {
        color: 'gray',
    }
});