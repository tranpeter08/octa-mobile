import React, {Component, createContext} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';
import script from '../scripts/injectedJS';
import StorageService from '../services/Storage';
import Menu from '../components/Menu';
import asyncHandlerJSON from '../utils/asyncHandler';
import FavoritesButton from '../components/FavoritesButton';
import AsyncStorage from '@react-native-community/async-storage';

export const MainCtx = createContext({});

export default class Webview extends Component {
  state = {
    ssaEnabled: false,
    showMenu: false,
    employeeId: null,
    menuTitle: null,
    collection: null,
  };

  webview = React.createRef(null);

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
        case 'SET_STATE':
          console.log('set state');

          return this.setStateFromWebview(payload);

        case 'SSA_ENABLE':
          console.log('SSA enabled');
          return this.enableSSA(payload);

        case 'ADD_BID':
          this.addBid(payload.bidInfo);
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
        console.log('employeeId: ', this.state.employeeId);
        await this.getAllBids(this.state.employeeId);
      }
    );
  }

  async getAllBids() {
    const [collection, error] = await asyncHandlerJSON(
      StorageService.getAllBids(this.state.employeeId)
    );

    if (collection) {
      this.setState({collection});
    }
  }

  async addBid(data) {
    const {employeeId, menuTitle, collection} = this.state;
    const [done, error] = await asyncHandlerJSON(
      StorageService.addBid(employeeId, menuTitle, collection, data)
    );

    if (error) {
      console.log({error});
      return alert(error.message);
    }

    this.getAllBids();
  }

  setStateFromWebview(payload) {
    console.log('setstate from webview');
    this.setState((state) => ({...state, ...payload}));
  }

  render() {
    const {menuTitle, collection, employeeId} = this.state;

    console.log('state: ', this.state);

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
        {this.state.ssaEnabled && (
          <View
            style={{
              color: 'white',
              fontSize: 30,
              position: 'absolute',
              bottom: 10,
              left: 10,
              zIndex: 1,
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: 'black',
              backgroundColor: 'white',
              padding: 2,
            }}
          >
            {this.state.showMenu ? (
              <Menu
                webView={this.webview}
                toggleMenu={this.toggleMenu}
                data={this.state.data}
                menuTitle={this.state.menuTitle}
              />
            ) : (
              <FavoritesButton toggleMenu={this.toggleMenu} />
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
      </MainCtx.Provider>
    );
  }
}

const styles = StyleSheet.create({
  webView: {
    marginTop: 20,
    flex: 1,
  },
});
