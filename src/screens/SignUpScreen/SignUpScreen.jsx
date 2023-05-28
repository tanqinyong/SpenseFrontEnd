import React, {useState} from 'react';
import { View, Text, Image, useWindowDimensions, StyleSheet, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';


import CustomInputPaper from '../../components/CustomInputPaper';
import CustomButton from '../../components/CustomButton';

// props: 
// value --> user input
// setValue -->
export default function SignUpScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const onCreateAccPressed = () => {
        console.warn("qinyong")
        fetch('https://spense.azurewebsites.net/signUpRequest', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
            email: email,
            mobilePhone: phone
        }),
        });
    };

    const onAlreadyAccPressed = () => {
        navigation.navigate('SignIn');
        console.warn("onAlreadyAccPressed");
    };

    return (
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>
        <TextInput style={styles.input} label="Email" onChangeText={newEmail => setEmail(newEmail)}/>
        <TextInput style={styles.input} label="Username" onChangeText={newUsername => setUsername(newUsername)}/>
        <TextInput style={styles.input} label="Phone" onChangeText={newPhone => setPhone(newPhone)}/>
        <TextInput style={styles.input} label="Password" onChangeText={newPassword => setPassword(newPassword)}/>
        <TextInput style={styles.input} label="Repeat Password"/>
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