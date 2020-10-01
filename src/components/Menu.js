import React from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import SimpleButton from './SimpleButton';

export default function Menu(props) {
  function addBid() {
    props.webView.current.postMessage('ADD_BID');

    // add bid to storage
  }

  return (
    <View style={styles.menu}>
      <View style={styles.topContainer}>
        <SimpleButton
          title="Close"
          style={styles.closeButton}
          onPress={props.toggleMenu}
        />
      </View>
      <Text style={{textAlign: 'center'}}>Bid List</Text>
      <View style={styles.menuButtonContainer}>
        <SimpleButton title="Clear" style={styles.menuButton} />
        <SimpleButton
          title="Add"
          onPress={addBid}
          style={[styles.menuButton, {marginLeft: 'auto'}]}
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
