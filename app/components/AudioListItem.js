import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import color from '../misc/color';

const AudioListItem = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <View style={styles.thumbnail}>
            <Text style={styles.thumbnailText}>A</Text>
          </View>
          <View style={styles.titleContainer}>
            <Text numberOfLines={1} style={styles.title}>
              This will be some long song title, some more text!
            </Text>
            <Text style={styles.timeText}>
              03:59
            </Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <Icon name="ellipsis-v" color={color.FONT_MEDIUM} size={20} />
        </View>
      </View>
      <View style={styles.separator} />
    </>
  );
};

export default AudioListItem;

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: width - 80,
    paddingTop: 10,
    // backgroundColor: 'red',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightContainer: {
    flexBasis: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'yellow',
  },
  thumbnail: {
    height: 50,
    flexBasis: 50,
    backgroundColor: color.FONT_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  thumbnailText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: color.FONT,
  },
  titleContainer: {
    width: width - 180,
    paddingLeft: 10,
  },
  title: {
    fontSize: 16,
    color: color.FONT,
  },
  separator: {
    width: width - 80,
    backgroundColor: '#333',
    opacity: 0.3,
    height: 0.7,
    alignSelf: 'center',
    marginTop: 10,
  },
  timeText:{
      fontSize: 14,
      color: color.FONT_LIGHT,
  }
});
