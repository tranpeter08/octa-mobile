import config from './config';
import utils from './utils';
import state from './state';
import components from './components';
import dom from './dom';
import injectStyle from './insertStyle';
import mutationObserver from './mutationObserver';
import eventListener from './eventListener';
import webview from './webview';

const content = `
insertStylesheet();
Webview.init();
Observer.start();
Utils.configureApp();

true;
`;

export default state +
  config +
  webview +
  utils +
  components +
  dom +
  injectStyle +
  mutationObserver +
  eventListener +
  content;
