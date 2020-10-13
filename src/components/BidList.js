import React, {
  useContext,
  createRef,
  useEffect,
  forwardRef,
  useRef,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import MainCtx from '../context/MainCtx';
import Bid from './Bid';

export default function BidList(props) {
  const {menuTitle, collection} = useContext(MainCtx);
  const bids = collection[menuTitle];
  const bidListRef = createRef();
  const prevHeight = useRef(0);

  return (
    <View style={styles.bidListContainer}>
      {bids && bids.length ? (
        <FlatList
          ref={bidListRef}
          data={bids}
          renderItem={({item}) => <Bid {...item} />}
          keyExtractor={(item) => item.bidId}
          onContentSizeChange={(width, height) => {
            if (prevHeight.current < height) {
              bidListRef.current.scrollToEnd();
            }
            prevHeight.current = height;
          }}
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
