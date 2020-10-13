import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import MainCtx from '../context/MainCtx';
import Menu from './Menu';
import FavoritesButton from './FavoritesButton';

export default function MenuContainer(props) {
  const {ssaEnabled, orientation, showMenu} = useContext(MainCtx);

  if (!ssaEnabled) return null;

  return (<View style={[styles.menuContainer, styles[orientation]]}>
    {showMenu ? <Menu /> : <FavoritesButton />}
  </View>)
}

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    bottom: 50,
    zIndex: 1,
  },
  portrait: {
    bottom: 50,
    left: 10,
  },
  landscape: {
    bottom: 10,
    left: 50,
  }
});