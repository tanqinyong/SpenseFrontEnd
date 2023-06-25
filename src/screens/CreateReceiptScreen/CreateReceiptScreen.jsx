import React, {useState} from 'react';
import { View, Text, Image, useWindowDimensions, StyleSheet, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomInputPaper from '../../components/CustomInputPaper';
import CustomButton from '../../components/CustomButton';

// props: 
// value --> user input
// setValue -->
export default function CreateReceiptScreen({navigation}) {
    const [price, setPrice] = useState('0.0');
    const [discount, setDiscount] = useState('0.0');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [staffName, setStaffName] = useState('');
    const [businessId, setBusinessId] = useState('0');

    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('0');
    const [itemQuantity, setItemQuantity] = useState('0');
    const [UserID, setUserID] = useState('0');
    const [userData, setData] = useState('');

    async function getData() {
        try {
          const value = await AsyncStorage.getItem("userSession");
          if (value !== null) {
            setData(value)
          } else {
            console.log('Data not found');
          }
        } catch (error) {
          console.log('Error retrieving data:', error);
        }
    }
    getData();

    const onCreateReceiptPressed = () => {
        const testbody = {
            "receipts": {
              "id": userData,
              "date": 1,
              "items": [
                {
                  "businessID": "B001",
                  "name": itemName,
                  "iprice": 10.99,
                  "quantity": 2
                }
              ],
              "price": price,
              "discount": discount,
              "paymentMethod": paymentMethod,
              "staffName": staffName,
              "business": {
                  "id": 1,
                  "businessName": "Business 1"
              },
              "warranty": {
                "warrantyID": "W001",
                "duration": 1
              }
            },
            "business": {
              "id": 1,
              "businessName": "Business 1"
            },
            "userAcc": {
              "id": userData,
              "username": "user1",
              "password": "password1",
              "email": "user1@example.com",
              "mobilePhone": 1234567890
            }
          };

        fetch('https://spense.azurewebsites.net/createReceipt', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(testbody),
        })
        .then(function (response) {
            responseClone = response.clone();
            return response.text();
        })
        .then(function (data) {
            alert("Receipt Created!");
            console.log("Receipt Created!");
        });
    };


    return (
      <View style={styles.root}>
        <Text style={styles.title}>Create a Receipt</Text>
        <TextInput style={styles.input} label="Price" onChangeText={newPrice => setPrice(newPrice)}/>
        <TextInput style={styles.input} label="Discount" onChangeText={newDiscount => setDiscount(newDiscount)}/>
        <TextInput style={styles.input} label="Payment Method" onChangeText={newPaymentMethod => setPaymentMethod(newPaymentMethod)}/>
        <TextInput style={styles.input} label="Staff Name" onChangeText={newStaffName => setStaffName(newStaffName)}/>
        <TextInput style={styles.input} label="Item Name" onChangeText={newItemName => setItemName(newItemName)}/>
        <TextInput style={styles.input} label="Item Price" onChangeText={newItemPrice => setItemPrice(newItemPrice)}/>
        <TextInput style={styles.input} label="Item Quantity" onChangeText={newItemQuantity => setItemQuantity(newItemQuantity)}/>
        <TextInput style={styles.input} label="User ID/Email" onChangeText={newUserID => setUserID(newUserID)}/>
        <CustomButton text= "Create Receipt" onPress={onCreateReceiptPressed}/>
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