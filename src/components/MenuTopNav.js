import React from 'react';
import {StyleSheet, View} from 'react-native';
import CloseMenuButton from './CloseMenuButton';

export default function MenuTopNav(props) {
  return (<View style={styles.topNav}>
    <CloseMenuButton />
  </View>)
}

const styles = StyleSheet.create({
  topNav: {
    display: 'flex',
  },
});