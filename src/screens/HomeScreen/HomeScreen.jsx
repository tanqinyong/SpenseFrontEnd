import React, {useState} from 'react';
import { View, Text, Image, Button, Modal, useWindowDimensions, TextInput, StyleSheet, FlatList } from 'react-native';
import { Title } from 'react-native-paper';
import CustomQR from '../../components/CustomQR';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DonutChart from '../../components/DonutChart';
import ActionButton from 'react-native-action-button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import QRCode from 'react-native-qrcode-svg';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Clothing',
    price: '$24.00',
    time: '23/07/2023'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Food',
    price: '$5.70',
    time: '20/06/2023'
  },
  {
    id: '58694a9f-3da1-471f-bd96-145571e29d72',
    title: 'Electronics',
    price: '$88',
    time: '12/07/2023'
  },
  {
    id: '58694a8f-3da1-471f-bd96-145571e29d72',
    title: 'Furniture',
    price: '$240',
    time: '23/07/2023'
  },
  {
    id: '58694a7f-3da1-471f-bd96-145571e29d72',
    title: 'Fifth Receipt',
    price: '$69',
    time: '23/07/2023'
  },
  {
    id: '58694a6f-3da1-471f-bd96-145571e29d72',
    title: 'Sixth Receipt',
    price: '$420',
    time: '23/07/2023'
  },
];

const Item = ({title, price, time}) => (
  <View style={styles.item}>
    <Text style={styles.flatTitle}>{title}</Text>
    <Text>Time: {time}</Text>
    <Text>Paid: {price}</Text>
  </View>
);

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

    return (
      <View style={styles.container}>
        <View style={styles.donutContainer}>
          <Title style={styles.title}> Welcome back,</Title>
          <Title style={styles.name}> {user.username} </Title>
          <Text style={styles.whitetext}> {currMonth} Overview: </Text>
          <Text style={styles.whitetext}> $1607.18 </Text>
          <DonutChart style={styles.donutChart} />
        </View>
        <View style={styles.receiptsContainer}>
          <Text style={styles.latestReceipts}> Latest Receipts </Text>
          <FlatList 
            data={DATA}
            horizontal={false}
            renderItem={({item}) => <Item title={item.title} price={item.price} time={item.time}/>}
            keyExtractor={item => item.id}
          />
        </View>
            <ActionButton buttonColor="rgba(155, 89, 182, 1)">
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