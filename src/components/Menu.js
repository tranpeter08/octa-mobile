import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MainCtx from '../context/MainCtx';
import MenuCtx from '../context/MenuCtx';
import StorageService from '../services/Storage';
import BidList from './BidList';
import MenuTopNav from './MenuTopNav';
import MenuControls from './MenuControls';

export default function Menu(props) {
  const {
    menuTitle, 
    collection, 
    webView, 
    employeeId, 
    getAllBids,
  } = useContext(MainCtx);

  function addBid() {
    webView.current.postMessage('ADD_BID');
  }

  async function clearBids() {
    const bids = collection[menuTitle];
    if (!bids || !bids.length) return;

    const [done, err] = await StorageService
      .clearBids(employeeId, menuTitle, collection);

    if (err) {
      return alert(err.message);
    }

    getAllBids();
  }

  return (
    <MenuCtx.Provider value={{addBid, clearBids}}>
      <View style={styles.menu}>
        <MenuTopNav />
        <Text style={styles.menuHeading}>{menuTitle} Favorites</Text>
        <BidList />
        <MenuControls />
      </View>
    </MenuCtx.Provider>
  );
}

const styles = StyleSheet.create({
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

});
