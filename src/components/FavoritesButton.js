import React from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

export default function FavoritesButton(props) {
  return (
    <>
      <Button
        onPress={props.toggleMenu}
        style={styles.button}
        title="Favorites"
        color="#fff"
      />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    color: '#fff',
    backgroundColor: '#0159c6',
  },
});
