import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './navigators/navigator'


export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app! lol</Text>
    //   <StatusBar style="auto" />
    // </View>

    <Navigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
