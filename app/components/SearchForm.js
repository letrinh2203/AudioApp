import React from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Animated, {Easing} from 'react-native-reanimated';
const {Value, timing} = Animated;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    //state
    this.state = {
      isFocused: false,
      keyword: '',
    };
    //animation values
    this._input_box_translate_x = new Value(width);
    this._back_button_opacity = new Value(0);
    this._content_translate_y = new Value(height);
    this._content_opacity = new Value(0);
  }
  render() {
    return (
      <>
        <SafeAreaView style={this.styles.header_safe_area}>
        </SafeAreaView>
    </>
    );
  }
}

const styles = StyleSheet.create({

});
