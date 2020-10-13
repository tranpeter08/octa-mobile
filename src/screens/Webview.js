import React, {Component, createRef} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';
import script from '../scripts/injectedJS';
import StorageService from '../services/Storage';
import asyncHandlerJSON from '../utils/asyncHandler';
import MainCtx from '../context/MainCtx';
import MenuContainer from '../components/MenuContainer';

export default class Webview extends Component {
  defaultState = {
    ssaEnabled: false,
    showMenu: false,
    employeeId: null,
    menuTitle: null,
    collection: null,
    orientation: 'portrait'
  };

  state = this.defaultState;
  webview = createRef({});

  componentDidMount() {
    Dimensions.addEventListener('change', this.detectOrientation)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.detectOrientation)
  }

  detectOrientation = ({window, screen}) => {
    const {width, height} = screen;
    const orientation = height >= width ? 'portrait' : 'landscape'; 

    this.setState({orientation});
  }

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
    const {orientation} = this.state;

    return (
      <MainCtx.Provider
        value={{
          ...this.state,
          webView: this.webview,
          toggleMenu: this.toggleMenu,
          getAllBids: this.getAllBids,
        }}
      >
        <View style={[styles.screen, styles[orientation]]}>
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
        <MenuContainer />
      </MainCtx.Provider>
    );
  };
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'black',
  },
  webView: {
    flex: 1,
  },
  portrait: {
    paddingVertical: 40,
  },
  landscape: {
    paddingHorizontal: 40
  }
});
