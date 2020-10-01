import React from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

export default function FavoritesButton(props) {
  return (
    <>
      <Button onPress={props.toggleMenu} title="Favorites" />
    </>
  );
}

const styles = StyleSheet.create({});
