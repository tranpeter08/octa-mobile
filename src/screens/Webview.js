import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';
import script from '../scripts/injectedJS';
import StorageService from '../services/Storage';
import Menu from '../components/Menu';
import asyncHandlerJSON from '../utils/asyncHandler';
import FavoritesButton from '../components/FavoritesButton';

export default class Webview extends Component {
  state = {
    ssaEnabled: false,
    showMenu: false,
    employeeId: null,
    menuTitle: null,
    data: null,
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
          console.log('payload: ', payload);
          this.enableSSA(payload);

        case 'ADD_BID':

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
    const [data, error] = await asyncHandlerJSON(
      StorageService.getAllBids(this.state.employeeId)
    );

    if (data) {
      this.setState({data});
    }
  }

  async addBid() {
    const {employeeId, menuTitle} = this.state;
    const [data, error] = await asyncHandlerJSON(StorageService.addBid());
  }

  setStateFromWebview(payload) {
    console.log('setstate from webview');
    this.setState((state) => ({...state, ...payload}));
  }

  render() {
    console.log('state: ', this.state);
    return (
      <>
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
      </>
    );
  }
}

const styles = StyleSheet.create({
  webView: {
    marginTop: 20,
    flex: 1,
  },
});
