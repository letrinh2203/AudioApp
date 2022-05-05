import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from 'react-native';
import Slider from '@react-native-community/slider';
import React, {useEffect, useRef, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import songs from '../model/data';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';

const {width, height} = Dimensions.get('window');

const setUpTrackPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(songs);
  } catch (e) {
    console.log(e);
  }
};
const togglePlayback = async playbackState => {
  const currentTrack = await TrackPlayer.getCurrentTrack();

  if (currentTrack !== null) {
    if (playbackState === State.Paused) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};

export default function MusicPlayer() {
  const playbackState = usePlaybackState();
  const progress = useProgress();

  const scrollX = useRef(new Animated.Value(0)).current;
  const [songIndex, setSongIndex] = useState(0);

  const songSlider = useRef(null);

  const skipTo = async trackId => {
    await TrackPlayer.skip(trackId);
  };

  useEffect(() => {
    setUpTrackPlayer();
    //TrackPlayer.play(); //video not have
    scrollX.addListener(({value}) => {
      // console.log('Scroll X',scrollX );
      // console.log('Device Width',width);
      const index = Math.round(value / width);

      skipTo(index);
      setSongIndex(index);

      // console.log('Indx', index);
    });
    return () => {
      scrollX.removeAllListeners();
    };
  }, []);
  const skipToNext = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
  };

  const skipToPrevious = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
  };

  const renderSongs = ({index, item}) => {
    return (
      <Animated.View style={styles.imageItem}>
        <View>
          <View style={styles.artworkWrapper}>
            <Image source={item.image} style={styles.artworkImg} />
          </View>
        </View>
      </Animated.View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={{width: width}}>
          <Animated.FlatList
            ref={songSlider}
            data={songs}
            renderItem={renderSongs}
            keyExtractor={item => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {x: scrollX},
                  },
                },
              ],
              {useNativeDriver: true},
            )}
          />
        </View>
        <View>
          <Text style={styles.title}>{songs[songIndex].title}</Text>
          <Text style={styles.artist}>{songs[songIndex].artist}</Text>
        </View>
        <View>
          <Slider
            style={styles.progressContainer}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            thumbTintColor="#ffd369"
            minimumTrackTintColor="#ffd369"
            maximumTrackTintColor="#fff"
            onSlidingComplete={async value => {
              await TrackPlayer.seekTo(value);
            }}
          />
        </View>
        <View style={styles.progressLabelContainer}>
          <Text style={styles.progressLabelTxt}>
            {new Date(progress.position * 1000).toISOString().substr(14, 5)}
          </Text>
          <Text style={styles.progressLabelTxt}>
            {new Date((progress.duration - progress.position) * 1000)
              .toISOString()
              .substr(14, 5)}
          </Text>
        </View>
        <View style={styles.musicControls}>
          <TouchableOpacity onPress={skipToPrevious}>
            <Ionicons
              name="play-skip-back-outline"
              color="#ffd369"
              size={30}
              style={{marginTop: 15}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => togglePlayback(playbackState)}>
            <Ionicons
              name={
                playbackState === State.Playing
                  ? 'ios-pause-circle'
                  : 'ios-play-circle'
              }
              color="#ffd369"
              size={65}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={skipToNext}>
            <Ionicons
              name="play-skip-forward-outline"
              color="#ffd369"
              size={30}
              style={{marginTop: 15}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomControls}>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="heart-outline" color="#777777" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="repeat" color="#777777" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="share-outline" color="#777777" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="ellipsis-horizontal" color="#777777" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
    width: '100%',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artworkWrapper: {
    width: 280,
    height: 280,
    marginBottom: 15,
    shadowColor: '#fff',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  artworkImg: {
    width: '100%',
    height: '100%',
    borderRadius: 140,
  },
  imageItem: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'black',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#eeeeee',
  },
  artist: {
    fontSize: 16,
    fontWeight: '300',
    textAlign: 'center',
    color: '#eeeeee',
  },
  progressContainer: {
    width: 360,
    height: 40,
    marginTop: 10,
    flexDirection: 'row',
  },
  progressLabelContainer: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelTxt: {
    color: '#fff',
    justifyContent: 'space-between',
  },
  musicControls: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
    marginTop: 2,
    marginBottom: 5,
  },
  bottomContainer: {
    borderTopColor: '#393E46',
    borderTopWidth: 1,
    width: width,
    alignItems: 'center',
    paddingVertical: 15,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});
