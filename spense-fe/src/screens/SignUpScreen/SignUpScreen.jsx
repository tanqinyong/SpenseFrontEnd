import React, {useState} from 'react';
import { View, Text, Image, useWindowDimensions, StyleSheet } from 'react-native';


import CustomInputPaper from '../../components/CustomInputPaper';
import CustomButton from '../../components/CustomButton';

// props: 
// value --> user input
// setValue -->
export default function SignUpScreen({navigation}) {

    const onCreateAccPressed = () => {
        // logic goes here!
        console.warn("Sign in");
    };

    const onAlreadyAccPressed = () => {
        navigation.navigate('SignIn');
        console.warn("onAlreadyAccPressed");
    };

    return (
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>
        <CustomInputPaper label="Email" />
        <CustomInputPaper label="Username" />
        <CustomInputPaper label="Phone" />
        <CustomInputPaper label ="Password" secureTextEntry={true}/>
        <CustomInputPaper label ="Repeat Password" secureTextEntry={true}/>

        <CustomButton text= "Create Account" onPress={onCreateAccPressed}/>
        <CustomButton text= "I already have an account." onPress={onAlreadyAccPressed} type= "TERTIARY"/>
      </View>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#00bf63',
        margin: 10,
    }
});