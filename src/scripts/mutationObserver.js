function startObserver() {
  window.ReactNativeWebView.postMessage('start');

  const targetNode = document.getElementById('ApplicationBody');

  if (!targetNode) return;

  const config = {attributes: false, childList: true, subtree: true};

  function callback(mutationsList, obsvr) {
    window.ReactNativeWebView.postMessage('callback');

    for (let mutation of mutationsList) {
      if (
        mutation.target.id === 'RosterPositionBid' ||
        mutation.target.id === 'HolidayDetail' ||
        mutation.target.id === 'OpenAssignmentBidHome' ||
        mutation.target.className === 'ListBody SortedList FilteredList' ||
        mutation.target.className === 'ListBody SortedList' ||
        mutation.target.className === 'ListBody'
      ) {
        window.ReactNativeWebView.postMessage('scrape');

        break;
      }

      if (
        mutation.type !== 'childList' ||
        mutation.target.id !== 'OpenAssignmentBidHome'
      ) {
        break;
      }

      if (!mutation.addedNodes.length) continue;

      let oaDetail;

      for (let {id} of mutation.addedNodes) {
        if (id === 'OpenAssignmentDetail') {
          oaDetail = true;
          break;
        }
      }

      if (oaDetail) {
        break;
      }
    }
  }

  const MutationObserver =
    window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver;
  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}

export default `
const Observer = {
  start() {
    window.ReactNativeWebView.postMessage('start observer');

    const targetNode = document.getElementById('ApplicationBody');

    if (!targetNode) return;
    
    const config = {attributes: false, childList: true, subtree: true};

    function callback(mutationsList, obsvr) {
      window.ReactNativeWebView.postMessage('obsvr callback');

      for (let mutation of mutationsList) {
        if (
          mutation.target.id === 'RosterPositionBid' ||
          mutation.target.id === 'HolidayDetail' ||
          mutation.target.id === 'OpenAssignmentBidHome' ||
          mutation.target.className === 'ListBody SortedList FilteredList' ||
          mutation.target.className === 'ListBody SortedList' ||
          mutation.target.className === 'ListBody'
        ) {
          window.ReactNativeWebView.postMessage('scrape');
          Utils.configureApp();
          return;
        }

        if (
          mutation.type !== 'childList' ||
          mutation.target.id !== 'OpenAssignmentBidHome'
        ) {
          break;
        }

        if (!mutation.addedNodes.length) continue;

        let oaDetail;

        for (let {id} of mutation.addedNodes) {
          if (id === 'OpenAssignmentDetail') {
            oaDetail = true;
            break;
          }
        }

        if (oaDetail) {
          Utils.configureApp();
          return;
        }
      }
    }

    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
  }
}
`;
