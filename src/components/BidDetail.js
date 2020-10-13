import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function BidDetail({label, text, style}) {
  return (
    <View style={[styles.textContainer, style]}>
      <Text style={styles.label}>{label}: </Text>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 4,
  },
  label: {
    fontWeight: '600',
  },
});
