import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import MainCtx from '../context/MainCtx';
import SimpleButton from './SimpleButton';

export default function CloseMenuButton(props) {
  const {toggleMenu} = useContext(MainCtx);

  return (<SimpleButton
    title="Close"
    containerStyle={styles.closeButton}
    onPress={toggleMenu}
  />)
}

const styles = StyleSheet.create({
  closeButton: {
    marginLeft: 'auto',
  },
});