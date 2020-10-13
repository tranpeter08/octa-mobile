import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {blue} from './styles/colors';

export default function SimpleButton({
  onPress,
  containerStyle,
  textStyle,
  title,
  disabled
}) {
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.touchable, containerStyle, disabled && styles.disabledTouchable]}
        disabled={disabled}
      >
        <Text style={[
          styles.text, 
          textStyle, 
          disabled && styles.disabledText
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  touchable: {
    backgroundColor: blue,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  disabledText: {
    color: 'grey',
  },
  disabledTouchable: {
    backgroundColor: 'lightgrey',
    borderColor: 'lightgrey'
  }
});
