import React, {useContext} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import SimpleButton from './SimpleButton';
import MenuCtx from '../context/MenuCtx';
import MainCtx from '../context/MainCtx';
import {blue} from './styles/colors';

export default function ClearBidsButton(props) {
  const {clearBids} = useContext(MenuCtx);
  const { menuTitle, collection} = useContext(MainCtx);
  const bids = collection[menuTitle];

  return (<SimpleButton
    title="Clear"
    containerStyle={styles.clearButtonContainer}
    textStyle={styles.clearButtonTextStyle}
    onPress={clearBids}
    disabled={!bids || !bids.length}
  />)
}

const styles = StyleSheet.create({
  clearButtonContainer: {
    backgroundColor: '#fff',
    borderColor: blue,
    borderWidth: 1,
    borderStyle: 'solid',
    marginLeft: 'auto',
    marginRight: 8,
  },

  clearButtonTextStyle: {
    color: blue,
  },
});