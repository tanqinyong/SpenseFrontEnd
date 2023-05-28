import React from 'react';
import { View, Text, Image, useWindowDimensions, TextInput, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';

// props: 
// value --> user input
// setValue -->
export default function HomeScreen() {
    return (
      <View style={styles.container}>
        <Title> HOME PAGE </Title>
        <Text style={styles.mainText}>You have successfully logged in.</Text>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: '7%',

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,

        paddingHorizontal: 10,
        paddingVertical:10,
        marginVertical: 5,
    },
    mainText: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});