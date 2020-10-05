import React, {useContext} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import MainCtx from '../context/MainCtx';
import Bid from './Bid';

export default function BidList(props) {
  const {menuTitle, collection} = useContext(MainCtx);
  const bids = collection[menuTitle];

  return (
    <>
      {bids && bids.length ? (
        bids.map((bidData) => {
          console.log({bidData});

          return <Bid key={bidData.bidId} {...bidData} />;
        })
      ) : (
        <Text style={styles.noBids}>- No bids added -</Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  noBids: {
    textAlign: 'center',
  },
});
