import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import MainCtx from '../context/MainCtx';
import SimpleButton from './SimpleButton';
import {blue} from './styles/colors';

export default function FavoritesButton(props) {
  const {toggleMenu} = useContext(MainCtx);

  return (
    <SimpleButton title="Favorites" onPress={toggleMenu} />
  );
}

const styles = StyleSheet.create({});
