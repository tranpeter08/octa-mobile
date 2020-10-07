import React from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

export default function SimpleButton({
  onPress,
  containerStyle,
  textStyle,
  title,
}) {
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.touchable, containerStyle]}
      >
        <Text style={[styles.text, textStyle]}>{title}</Text>
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
    backgroundColor: '#0159c6',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
