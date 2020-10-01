import React from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

export default function SimpleButton({onPress, style, title}) {
  return (
    <>
      <TouchableOpacity onPress={onPress} style={style}>
        <Text style={{textAlign: 'center'}}>{title}</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({});
