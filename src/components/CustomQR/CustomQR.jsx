import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const QRScanner = () => {
    const [permission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
  
    useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      alert("Scanned, data is"+data);
    };
  
    const startScanning = () => {
      setScanned(false);
    };
  
    if (permission === null) {
      return <Text>Requesting for user camera permission...</Text>;
    }
    if (permission === false) {
      return <Text>No access allowed.</Text>;
    }
  
    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned ? (
          <Button title="Scan Again" onPress={startScanning} />
        ) : (
          <Text style={styles.scanText}>Scan QR Code</Text>
        )}
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    scanText: {
      fontSize: 20,
      marginBottom: 20,
    },
  });
  
export default QRScanner;