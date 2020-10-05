export default `
  const Webview = {
    resetState() {
      window.ReactNativeWebView.postMessage('reset');
    },
    init() {
      window.ReactNativeWebView.postMessage(JSON.stringify({type: 'INIT'}));
    }
  }
`;
