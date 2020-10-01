import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function MainLayout(props) {
  return (
    <>
      <StatusBar />
      {props.children}
    </>
  );
}
