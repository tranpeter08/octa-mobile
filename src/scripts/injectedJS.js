import config from './config';
import utils from './utils';
import state from './state';
import components from './components';
import dom from './dom';
import injectStyle from './insertStyle';
import mutationObserver from './mutationObserver';
import eventListener from './eventListener';

const content = `
insertStylesheet();
startObserver();
Utils.configureApp();
true;
`;

export default state +
  config +
  utils +
  components +
  dom +
  injectStyle +
  mutationObserver +
  eventListener +
  content;
