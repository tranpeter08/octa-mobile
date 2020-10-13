import React from 'react';
import {StyleSheet, View} from 'react-native';
import ClearBidsButton from './ClearBidsButton';
import AddBidButton from './AddBidButton';

export default function MenuControls(props) {
  return (
    <View style={styles.menuButtonContainer}>
      <ClearBidsButton />
      <AddBidButton />
    </View>
  )
}

const styles = StyleSheet.create({
  menuButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: 8,
  }
});