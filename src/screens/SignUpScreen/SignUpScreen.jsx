import React, {useState} from 'react';
import { View, Text, Image, useWindowDimensions, StyleSheet, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import Checkbox from 'expo-checkbox';

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
    const [businessMode, setBusinessMode] = useState('0');  
    const [checked, setChecked] = useState(false);


    const onCreateAccPressed = () => {
        bizcode = 0
        if (checked) {
            bizcode = 1
        }
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
            mobilePhone: phone,
            businessMode: bizcode
        }),
        })
        .then(function (response) {
            responseClone = response.clone(); // 2
            return response.text();
        })
        .then(function (data) {
            alert("Account Created!");
            navigation.navigate('SignIn');
            console.log("Account Created!");
        } 
        // , function (rejectionReason) { // 3
        //     console.log('Error parsing JSON from response:', rejectionReason, responseClone); // 4
        //     responseClone.text() // 5
        //     .then(function (bodyText) {
        //         console.log('Received the following instead of valid JSON:', bodyText); // 6
        //     });
        // }
        );

        // .then(response => response.json())
        // .then(data=>console.log(data))
        // .then(console.warn("Account Created"));
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
        <View style={styles.section}>
            <Checkbox
            style={styles.checkbox}
            value={checked}
            onValueChange={setChecked}
            color={checked ? '#32CD32' : undefined}
            />        
            <Text style={styles.paragraph}>Is this a business account?</Text>
        </View>

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
      section: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      paragraph: {
        fontSize: 15,
      },
      checkbox: {
        margin: 8,
      },
});