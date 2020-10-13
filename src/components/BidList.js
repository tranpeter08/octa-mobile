import React, {
  useContext,
  createRef,
  useRef,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import MainCtx from '../context/MainCtx';
import Bid from './Bid';

export default function BidList(props) {
  const {menuTitle, collection} = useContext(MainCtx);
  const bids = collection[menuTitle];
  const bidListRef = createRef();
  const prevHeight = useRef(0);

  function scrollToBottom(width, height ) {
    if (prevHeight.current < height) {
      bidListRef.current.scrollToEnd();
    }
    prevHeight.current = height;
  }

  return (
    <View style={styles.bidListContainer}>
      {bids && bids.length ? (
        <FlatList
          ref={bidListRef}
          data={bids}
          renderItem={({item}) => <Bid {...item} />}
          keyExtractor={(item) => item.bidId}
          onContentSizeChange={scrollToBottom}
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
