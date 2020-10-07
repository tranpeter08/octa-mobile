import React, {forwardRef, useContext} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import MainCtx from '../context/MainCtx';
import MenuCtx from '../context/MenuCtx';
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

const Menu = forwardRef((props, ref) => {
  const {menuTitle, collection, webView, toggleMenu} = useContext(MainCtx);

  function addBid() {
    webView.current.postMessage('ADD_BID');
  }

  return (
    <View style={styles.menu}>
      <View style={styles.topContainer}>
        <SimpleButton
          title="Close"
          containerStyle={styles.closeButton}
          onPress={toggleMenu}
        />
      </View>
      <Text style={styles.menuHeading}>{menuTitle} Favorites</Text>
      <BidList bidListRef={ref} />
      <View style={styles.menuButtonContainer}>
        <SimpleButton
          title="Clear"
          containerStyle={styles.clearButtonContainer}
          textStyle={styles.clearButtonTextStyle}
        />
        <SimpleButton title="Add" onPress={addBid} />
      </View>
    </View>
  );
});

const blue = '#0159c6';

const styles = StyleSheet.create({
  closeButton: {
    marginLeft: 'auto',
  },
  topContainer: {
    display: 'flex',
  },
  menu: {
    width: 240,
    flex: 1,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    backgroundColor: 'white',
  },
  menuHeading: {
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: '700',
    fontSize: 20,
  },
  menuButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: 8,
  },
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

export default Menu;
