import React from 'react';
import { View, Text, Image, useWindowDimensions, TextInput, StyleSheet, FlatList } from 'react-native';
import { Title } from 'react-native-paper';

import DonutChart from '../../components/DonutChart';


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

  // get the params
  const { user } = route.params;
  console.log("ID: " + user.id);

  // fetch top six receipts based on user


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
      </View>
    );
};

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