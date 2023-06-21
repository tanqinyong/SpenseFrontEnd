import React, {useState} from 'react';
import { View, Text, Image, useWindowDimensions, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';


import CustomInput from '../../components/CustomInput';
import CustomInputPaper from '../../components/CustomInputPaper';
import CustomButton from '../../components/CustomButton';
import Logo from '../../../assets/images/spense-logo1.png';


//import { PaperProvider } from 'react-native-paper';

export default function SignInScreen({navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // ensure height is relative to phone window dimensions
    const {height} = useWindowDimensions();

    const onSignInPressed = () => {
        // logic goes here!
        var responseClone; // 1
        fetch('https://spense.azurewebsites.net/loginRequest', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
        .then(function (response) {
            responseClone = response.clone(); // 2
            return response.json();
        })
        .then(function (data) {
            if (data) {
                navigation.navigate('HomeScreen');
            } else {
                alert("Incorrect username or password.");
            }
        }, function (rejectionReason) { // 3
            console.log('Error parsing JSON from response:', rejectionReason, responseClone); // 4
            responseClone.text() // 5
            .then(function (bodyText) {
                console.log('Received the following instead of valid JSON:', bodyText); // 6
            });
        });

        // .then(response => response.json())
        // .then(data => data ? navigation.navigate('HomeScreen') : alert("Incorrect username or password."));
        //.then(data=>console.log(data))
        //console.warn("Sign in");
    };

    const onForgotPasswordPressed = () => {
        console.warn("onForgotPasswordPressed");
    };

    const onNoAccPressed = () => {
        navigation.navigate('SignUp');
        console.warn("onAlreadyAccPressed");
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

        {/* <CustomInputPaper label="Username" />
        <CustomInputPaper label="Password" secureTextEntry={true} /> */}

        <TextInput style={styles.input} label="Username" onChangeText={newUsername => setUsername(newUsername)}/>
        <TextInput style={styles.input} label="Password" onChangeText={newPassword => setPassword(newPassword)}/>

        <CustomButton text= "Sign In" onPress={onSignInPressed}/>
        <CustomButton text= "Forgot Password?" onPress={onForgotPasswordPressed} type= "TERTIARY"/>
        <CustomButton text= "I don't have an account." onPress={onNoAccPressed} type= "TERTIARY"/>
        
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
    input: {
        backgroundColor: 'white',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
      },
});