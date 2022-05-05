import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import MusicPlayer from '../components/MusicPlayer';

export default function Player() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="Light-content"/>
      <MusicPlayer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
