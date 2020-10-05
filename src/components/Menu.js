import React, {useContext} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import MainCtx from '../context/MainCtx';
import SimpleButton from './SimpleButton';
import BidList from './BidList';

/* 
bid shape: {
  [employeeId]: {
    [menu_title]: [bids],
    [other_menu_title]: [bids]
  },
  [other_employeeId]: {
    [menu_title]: [bids],
    [other_menu_title]: [bids]
  }
}

*/

export default function Menu(props) {
  const {menuTitle, collection, webView, toggleMenu} = useContext(MainCtx);

  function addBid() {
    webView.current.postMessage('ADD_BID');
  }

  return (
    <View style={styles.menu}>
      <View style={styles.topContainer}>
        <SimpleButton
          title="Close"
          style={styles.closeButton}
          onPress={toggleMenu}
        />
      </View>
      <Text style={styles.menuHeading}>{menuTitle} Favorites</Text>
      <BidList />
      <View style={styles.menuButtonContainer}>
        <SimpleButton
          title="Clear"
          style={[styles.menuButton, {marginLeft: 'auto'}]}
        />
        <SimpleButton
          title="Add"
          onPress={addBid}
          style={[styles.menuButton]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    width: 60,
    marginLeft: 'auto',
    borderColor: 'blue',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  topContainer: {
    borderColor: 'green',
    borderWidth: 2,
    borderStyle: 'solid',
    display: 'flex',
  },
  menu: {
    width: 240,
    flex: 1,
  },
  menuHeading: {
    textAlign: 'center',
  },
  menuButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  menuButton: {
    padding: 2,
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: 'solid',
  },
});
