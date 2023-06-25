import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import CreateReceiptScreen from './src/screens/CreateReceiptScreen/CreateReceiptScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import HomeScreen from './src/screens/HomeScreen/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* routes */}
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Log In' }}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }}/>
        <Stack.Screen name="CreateReceiptScreen" component={CreateReceiptScreen} options={{ title: 'Create Receipt' }}/>
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


