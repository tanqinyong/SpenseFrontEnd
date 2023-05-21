import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SignInScreen from './src/screens/SignInScreen'
import SignUpScreen from './src/screens/SignUpScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// function SignInScreen({ navigation }) {
//   return (
//     <SafeAreaView style= {styles.root}>
//       <SignInScreen navigation={navigation}/>
//     </SafeAreaView>
//   );
// }

// function SignUpScreen({ navigation }) {
//   return (
//     <SafeAreaView style= {styles.root}>
//       <SignUpScreen navigation= {navigation} />
//     </SafeAreaView>
//   );
// }

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* routes */}
        <Stack.Screen name="SignIn" component={SignInScreen}/>
        <Stack.Screen name="SignUp" component={SignUpScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
});


