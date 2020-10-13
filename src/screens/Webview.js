import React, {Component, createRef, forwardRef, useRef} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';
import script from '../scripts/injectedJS';
import StorageService from '../services/Storage';
import Menu from '../components/Menu';
import asyncHandlerJSON from '../utils/asyncHandler';
import FavoritesButton from '../components/FavoritesButton';
import AsyncStorage from '@react-native-community/async-storage';
import MainCtx from '../context/MainCtx';
import SimpleButton from '../components/SimpleButton';

export default class Webview extends Component {
  defaultState = {
    ssaEnabled: false,
    showMenu: false,
    employeeId: null,
    menuTitle: null,
    collection: null,
  };

  state = this.defaultState;
  webview = createRef({});

  toggleMenu = (params) => {
    this.setState((state) => {
      return {showMenu: !state.showMenu};
    });
  };

  onMessage = (event) => {
    const {data} = event.nativeEvent;
    console.log({data});
    let parsed;

    try {
      parsed = JSON.parse(data);
    } catch (error) {
      parsed = null;
    }

    if (parsed) {
      const {type, payload} = parsed;

      switch (type) {
        case 'SSA_ENABLE':
          return this.enableSSA(payload);

        case 'ADD_BID':
          return this.addBid(payload.bidInfo);

        case 'INIT':
          if (this.state.ssaEnabled) {
            this.setState(this.defaultState);
          }

          return;
        default:
          return;
      }
    }
  };

  enableSSA(payload) {
    if (this.state.ssaEnabled) return;

    return this.setState(
      (state) => ({...state, ...payload}),
      async () => {
        await this.getAllBids(this.state.employeeId);
      }
    );
  }

  getAllBids = async () => {
    const [collection, error] = await asyncHandlerJSON(
      StorageService.getAllBids(this.state.employeeId)
    );

    if (collection) {
      this.setState({collection});
    }
  };

  addBid = async (bidInfo) => {
    const {employeeId, menuTitle, collection} = this.state;
    const [done, error] = await asyncHandlerJSON(
      StorageService.addBid(bidInfo, employeeId, menuTitle, collection)
    );

    if (error) {
      console.log({error});
      return alert(error.message);
    }

    this.getAllBids();
  };

  render = () => {
    const {menuTitle, collection, employeeId} = this.state;

    return (
      <MainCtx.Provider
        value={{
          employeeId,
          menuTitle,
          collection,
          webView: this.webview,
          toggleMenu: this.toggleMenu,
          getAllBids: this.getAllBids,
        }}
      >
        <View style={styles.screen}>
          {this.state.ssaEnabled && (
            <View style={styles.menuContainer}>
              {this.state.showMenu ? (
                <Menu />
              ) : (
                <SimpleButton title="Favorites" onPress={this.toggleMenu} />
              )}
            </View>
          )}
          <WebView
            style={styles.webView}
            source={{
              uri: 'https://coachopselfserv.octa.net/selfservice',
            }}
            injectedJavaScript={script}
            onMessage={this.onMessage}
            onError={(syntheticEvent) => {
              const {nativeEvent} = syntheticEvent;
              console.warn('WebView error: ', nativeEvent);
            }}
            ref={this.webview}
          />
        </View>
      </MainCtx.Provider>
    );
  };
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: 'black',
  },
  webView: {
    flex: 1,
  },
  menuContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    zIndex: 1,
  },
});
