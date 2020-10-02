function code() {
  window.addEventListener('message', function ({data}) {
    // alert(JSON.stringify(data))

    switch (data) {
      case 'ADD_BID':
        addBid();
      default:
        break;
    }
  });

  function addBid() {
    if (!State.data) {
      alert('Please select an assignment');
      return;
    }

    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: 'ADD_BID',
        payload: {bidInfo: State.data},
      })
    );
  }
}

export default `
  window.addEventListener('message', function({data}) {
    // alert(JSON.stringify(data))
    
    switch(data) {
      case 'ADD_BID':
        addBid();
      default: break;
    }
  });

  function addBid() {
    if (!State.data) {
      alert('Please select an assignment');
      return;
    }

    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: 'ADD_BID',
        payload: {bidInfo: State.data}
      })
    );
  }
`;
