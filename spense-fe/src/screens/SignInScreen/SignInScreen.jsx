import React, {useState} from 'react';
import { View, Text, Image, useWindowDimensions, StyleSheet } from 'react-native';


import CustomInput from '../../components/CustomInput';
import CustomInputPaper from '../../components/CustomInputPaper';
import CustomButton from '../../components/CustomButton';
import Logo from '../../../assets/images/spense-logo1.png';


//import { PaperProvider } from 'react-native-paper';

export default function SignInScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // ensure height is relative to phone window dimensions
    const {height} = useWindowDimensions();

    const onSignInPressed = () => {
        // logic goes here!
        console.warn("Sign in");
    };

    const onForgotPasswordPressed = () => {
        console.warn("onForgotPasswordPressed");
    };

    return (
      <View style={styles.root}>
        { /* 0.3 ensures that the logo takes up only 30% of the screen */ }
        <Image 
            source={Logo} 
            style={[styles.logo, {height: height * 0.3}]} 
            resizeMode="contain" 
        />

        {/* <CustomInput placeholder="Username" value={username} setValue={setUsername} secureTextEntry={false}/>
        <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true}/> */}

        <CustomInputPaper label="Username" />
        <CustomInputPaper label="Password" secureTextEntry={true} />

        <CustomButton text= "Sign In" onPress={onSignInPressed}/>

        <CustomButton text= "Forgot Password?" onPress={onForgotPasswordPressed} type= "TERTIARY"/>

        { /* I will be trying ReactNative Paper buttons for the social media logins! */ } 
      </View>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        height: 200,
    },
});