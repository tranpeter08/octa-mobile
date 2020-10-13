import React, {useContext} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import SimpleButton from './SimpleButton';
import MenuCtx from '../context/MenuCtx';

export default function AddBidButton(props) {
  const {addBid} = useContext(MenuCtx);

  return <SimpleButton title="Add" onPress={addBid} />;
}

const styles = StyleSheet.create({});