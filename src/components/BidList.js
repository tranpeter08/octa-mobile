import React, {useContext, useRef, forwardRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import MainCtx from '../context/MainCtx';
import Bid from './Bid';

export default function BidList(props) {
  const {menuTitle, collection} = useContext(MainCtx);
  const bids = collection[menuTitle];

  const {bidListRef} = props;

  console.log('props', props);

  return (
    <View style={styles.bidListContainer}>
      {bids && bids.length ? (
        <FlatList
          ref={bidListRef}
          data={bids}
          renderItem={({item}) => <Bid {...item} />}
          keyExtractor={(item) => item.bidId}
        />
      ) : (
        <Text style={styles.noBids}>- No bids added -</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  noBids: {
    textAlign: 'center',
  },
  bidListContainer: {
    height: 200,
  },
});
