import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import AudioListItem from '../components/AudioListItem';
// import SearchForm from '../components/SearchForm';

export default function Discovery() {
  return (
    <View style={styles.container}>
      {/* <SearchForm/> */}
      <View style={styles.AudioHot}>
        <Text>Hot music</Text>
      </View>
      <View style={styles.AudioList}>
        <ScrollView>
          <AudioListItem />
          <AudioListItem />
          <AudioListItem />
          <AudioListItem />
          <AudioListItem />
          <AudioListItem />
          <AudioListItem />
          <AudioListItem />
          <AudioListItem />
          <AudioListItem />
          <AudioListItem />
          <AudioListItem />
          <AudioListItem />
          <AudioListItem />
          <AudioListItem />
          <AudioListItem />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  AudioHot: {
    flex: 3,
  },
  AudioList: {
    flex: 5,
  },
});
