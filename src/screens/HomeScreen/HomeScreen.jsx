
import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, Image, Button, Modal, useWindowDimensions, TextInput, StyleSheet, FlatList } from 'react-native';
import { Title } from 'react-native-paper';
import CustomQR from '../../components/CustomQR';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DonutChart from '../../components/DonutChart';
import ActionButton from 'react-native-action-button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import QRCode from 'react-native-qrcode-svg';
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const d = new Date();
let currMonth = months[d.getMonth()];


// props: 
// value --> user input
// setValue -->
export default function HomeScreen({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);  
  const [modalQRVisible, setModalQRVisible] = useState(false);  
  const [userData, setData] = useState('');

  // get the params
  // receiptJSON - stores the receipt object
  // totalSpent - stores the total amount spent for the month
  const { user } = route.params;
  console.log("ID: " + user.id); 
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
  console.log("ID: " + user.id);
  const [receiptJSON, setReceiptJSON] = useState(null);
  const [totalSpent, setTotalSpent] = useState(0);

  // fetch top six receipts based on user
  useEffect(() => {
    const viewUserReceipts = () => {
      fetch('https://spense.azurewebsites.net/getUserReceipt', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.id,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setReceiptJSON(data);
          calculateTotalSpent(data); // Calculate total spent
        })
        .catch((error) => {
          console.error(error + " login err");
        });
    };

    viewUserReceipts();
  }, [user.id]);


  // Calculate total spent per month
  const calculateTotalSpent = (receipts) => {
    let total = 0;
    // Get the current month
    const currentMonth = new Date().getMonth();

    // Iterate over receipts and sum the amounts for the current month
    receipts.forEach((receipt) => {
      const receiptDate = new Date(receipt.date * 1000);
      if (receiptDate.getMonth() === currentMonth) {
        total += receipt.price;
      }
    });

    setTotalSpent(total);
  };

  const onCreateReceiptPagePressed = () => {
    navigation.navigate('CreateReceiptScreen');
    console.warn("onAlreadyAccPressed");
};

  

  // Sort the receipts array by date in descending order
  const sortedReceipts = useMemo(() => {
    if (receiptJSON) {
      return [...receiptJSON].sort((a, b) => b.date - a.date);
    }
    return [];
  }, [receiptJSON]);

  

  const Item = ({ id, price, date, paymentMethod, businessName, items }) => {
    const formattedDate = useMemo(() => {
      const dateTime = new Date(date * 1000).toLocaleString();
      return dateTime;
    }, [date]);
  
    return (
      <View style={styles.item}>
        <Text style={styles.flatTitle}>{businessName}</Text>
        <Text>Time: {formattedDate}</Text>
        <Text>Paid: {price}</Text>
      </View>
    );
  };

    return (
      <View style={styles.container}>
        <View style={styles.donutContainer}>
          <Title style={styles.title}> Welcome back,</Title>
          <Title style={styles.name}> {user.username} </Title>
          <Text style={styles.whitetext}> {currMonth} Overview: </Text>
          <Text style={styles.whitetext}> ${totalSpent} </Text>
          <DonutChart style={styles.donutChart} />
        </View>
        <View style={styles.receiptsContainer}>
          <Text style={styles.latestReceipts}> Latest Receipts </Text>
          <FlatList 
            data={sortedReceipts}
            horizontal={false}
            renderItem={({item}) => <Item businessName={item.businessName} price={item.price} date={item.date}/>}
            keyExtractor={item => item.id}
          />
        </View>
            <ActionButton buttonColor="rgba(155, 89, 182, 1)">
              <ActionButton.Item buttonColor='#9b59b6' title="Create Receipt" onPress={onCreateReceiptPagePressed}>
                  <MaterialCommunityIcons name="add-circle-outline" style={stylesFloatButton.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item buttonColor='#9b59b6' title="NFC Demoo1" onPress={() => alert()}>
                  <MaterialCommunityIcons name="cellphone-nfc" style={stylesFloatButton.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item buttonColor='#9b59b6' title="NFC Demoo1" onPress={() => setModalVisible(true)}>
                  <MaterialCommunityIcons name="qrcode" style={stylesFloatButton.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item buttonColor='#9b59b6' title="NFC Demoo1" onPress={() => setModalQRVisible(true)}>
                  <MaterialCommunityIcons name="qrcode-scan" style={stylesFloatButton.actionButtonIcon} />
              </ActionButton.Item>
            </ActionButton>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={stylesPopUp.modalContainer}>
                <View style={stylesPopUp.modalContent}>
                  <QRCode value={userData} size={200} />
                  <Button
                    title="Close"
                    onPress={() => setModalVisible(false)}
                  />
                </View>
              </View>
            </Modal>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalQRVisible}
              onRequestClose={() => setModalQRVisible(false)}
            >
              <View style={stylesPopUp.modalContainer}>
                <View style={stylesPopUp.modalContent}>
                  <CustomQR />
                  <Button
                    title="Close"
                    onPress={() => setModalQRVisible(false)}
                  />
                </View>
              </View>
            </Modal>
      </View>
    );
};

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
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
});

const stylesFloatButton = StyleSheet.create({
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
      position: 'absolute'
    },
  });

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    title: {
      color: '#00bf63',
      fontSize: 30,
      paddingTop:10,

    },
    name: {
      color: '#00bf63',
      fontSize: 30,
      fontWeight: 'bold',
    },
    whitetext: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      paddingTop:5,
      paddingLeft:5,
    },
    latestReceipts: {
      fontSize: 20,
      fontWeight: 'bold',
      padding: 20
    },
    donutContainer: {
      flex: 1,
      backgroundColor: '#214b69',
      borderBottomLeftRadius: 90
    },
    receiptsContainer: {
      flex: 1,
      backgroundColor: '#e8e8e8'
    },
    item: {
      backgroundColor: '#00bf63',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius:15
    },
    flatTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
});