import React from 'react';
import { View, Text, Image, useWindowDimensions,  StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const MyComponent = ({label, secureTextEntry}) => {
  const [text, setText] = React.useState("");

  return (
    <TextInput
      style={styles.input}
      label={label}
      secureTextEntry = {secureTextEntry}
      value={text}
      onChangeText={text => setText(text)}
    />
  );
};

export default MyComponent;

const styles = StyleSheet.create({

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