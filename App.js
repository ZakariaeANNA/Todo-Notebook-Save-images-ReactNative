import React from 'react';
import { StyleSheet, Text, View,StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import AppNav from './config/AppNavigator';
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#2b2b39" barStyle="light-content" />
      <AppNav/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex:1,
  },
});