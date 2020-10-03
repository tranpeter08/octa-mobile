import React, {useContext} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import SimpleButton from './SimpleButton';
import {MainCtx} from '../screens/Webview';
import Storage from '../services/Storage';
import asyncHandlerJSON from '../utils/asyncHandler';

export default function Bid({bidId, daysOff, totalSplit, totalWork}) {
  const {getAllBids, menuTitle, employeeId} = useContext(MainCtx);
  function handlePress() {
    // remove from database and update list
    Storage.removeBid(employeeId, menuTitle, bidId);
  }

  return (
    <>
      <Text>ID: {bidId}</Text>
      <Text>Total Work: {totalWork}</Text>
      <Text>Total Sokit: {totalSplit}</Text>
      <Text>Days Off: {daysOff.join(', ')}</Text>
      <SimpleButton title="Remove" onPress={handlePress} />
    </>
  );
}

const styles = StyleSheet.create({});
