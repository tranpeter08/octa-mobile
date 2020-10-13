import React, {useContext} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import SimpleButton from './SimpleButton';
import MainCtx from '../context/MainCtx';
import Storage from '../services/Storage';
import asyncHandlerJSON from '../utils/asyncHandler';
import BidDetail from './BidDetail';

export default function Bid({bidId, daysOff, totalSplit, totalWork}) {
  const {getAllBids, menuTitle, employeeId, collection} = useContext(MainCtx);
  async function handleRemove() {
    // remove from database and update list
    const [done, error] = await Storage.removeBid(
      bidId,
      employeeId,
      menuTitle,
      collection
    );

    if (error) {
      return alert(error.message);
    }

    getAllBids();
  }

  return (
    <View style={styles.bid}>
      <BidDetail label="ID" text={bidId} />
      <View style={styles.bidTimes}>
        <BidDetail label="Work" text={totalWork} style={styles.spaceAfter} />
        <BidDetail label="Splits" text={totalSplit} />
      </View>
      <BidDetail label="Days Off" text={daysOff.join(', ')} />
      <View style={styles.removeButtonContainer}>
        <SimpleButton
          title="Remove"
          onPress={handleRemove}
          containerStyle={styles.bidButton}
          textStyle={styles.bidButtonText}
        />
      </View>
    </View>
  );
}

const blue = '#0159c6';

const styles = StyleSheet.create({
  bid: {
    backgroundColor: '#fff3d3',
    marginBottom: 10,
    padding: 6,
  },
  bidTimes: {
    display: 'flex',
    flexDirection: 'row',
  },
  spaceAfter: {
    marginRight: 10,
  },
  removeButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  bidButton: {
    backgroundColor: '#fff',
    borderColor: blue,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  bidButtonText: {
    color: blue,
  },
});
