import React, {useState} from 'react';
import { View, Text, Modal, Button, Image, useWindowDimensions, StyleSheet, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import CustomQR from '../../components/CustomQR';

import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomInputPaper from '../../components/CustomInputPaper';
import CustomButton from '../../components/CustomButton';

// props: 
// value --> user input
// setValue -->
export default function CreateReceiptScreen({navigation}) {
    const [modalQRVisible, setModalQRVisible] = useState(false);  
    const [price, setPrice] = useState('0.0');
    const [discount, setDiscount] = useState('0.0');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [staffName, setStaffName] = useState('');
    const [businessId, setBusinessId] = useState('0');
    const [category, setCategory] = useState('');

    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('0');
    const [itemQuantity, setItemQuantity] = useState('0');
    const [UserID, setUserID] = useState('');
    const [userData, setData] = useState('');
    handleScan = (data) => {
      console.log("Scanned data from QRScanner:", data);
      setUserID(data)

      // Do whatever you want with the scanned data here
    }
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
              "category": category,
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
        <Text style={styles.stitle}>Scan User QR</Text>
        <Button title="Scan" onPress={() => setModalQRVisible(true)}/>
        <Modal
              animationType="slide"
              transparent={true}
              visible={modalQRVisible}
              onRequestClose={() => setModalQRVisible(false)}
            >
              <View style={stylesPopUp.modalContainer}>
                <View style={stylesPopUp.modalContent}>
                  <CustomQR onScan={this.handleScan} />
                  <Button
                    title="Close"
                    onPress={() => setModalQRVisible(false)}
                  />
                </View>
              </View>
            </Modal>
        <Text>UserID: {UserID}</Text>
        <TextInput style={styles.input} label="Price" onChangeText={newPrice => setPrice(newPrice)}/>
        <TextInput style={styles.input} label="Discount" onChangeText={newDiscount => setDiscount(newDiscount)}/>
        <TextInput style={styles.input} label="Payment Method" onChangeText={newPaymentMethod => setPaymentMethod(newPaymentMethod)}/>
        <TextInput style={styles.input} label="Staff Name" onChangeText={newStaffName => setStaffName(newStaffName)}/>
        <TextInput style={styles.input} label="Item Name" onChangeText={newItemName => setItemName(newItemName)}/>
        <TextInput style={styles.input} label="Item Price" onChangeText={newItemPrice => setItemPrice(newItemPrice)}/>
        <TextInput style={styles.input} label="Item Quantity" onChangeText={newItemQuantity => setItemQuantity(newItemQuantity)}/>
        <TextInput style={styles.input} label="Category" onChangeText={newCategory => setCategory(newCategory)}/>
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
    stitle: {
        fontSize: 18,
        fontWeight: 'bold',
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
const stylesPopUp = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 0,
    alignItems: 'center',
  },
});