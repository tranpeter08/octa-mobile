function startObserver() {
  window.ReactNativeWebView.postMessage('start');

  const targetNode = document.getElementById('ApplicationBody');

  if (!targetNode) return;

  const config = {attributes: false, childList: true, subtree: true};

  function callback(mutationsList, obsvr) {
    window.ReactNativeWebView.postMessage('callback');

    for (let mutation of mutationsList) {
      // ******** Holiday bid

      if (
        mutation.target.id === 'RosterPositionBid' ||
        mutation.target.id === 'HolidayDetail' ||
        mutation.target.id === 'OpenAssignmentBidHome' ||
        mutation.target.className === 'ListBody SortedList FilteredList' ||
        mutation.target.className === 'ListBody SortedList' ||
        mutation.target.className === 'ListBody'
      ) {
        window.ReactNativeWebView.postMessage('scrape');
        // config app scrape page

        break;
      }

      // ***********

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
        window.ReactNativeWebView.postMessage('from web oa detail');
        // config app scrape page
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
function startObserver() {
  window.ReactNativeWebView.postMessage('start observer');

  const targetNode = document.getElementById('ApplicationBody');

  if (!targetNode) return;
  
  const config = {attributes: false, childList: true, subtree: true};

  function callback(mutationsList, obsvr) {
    window.ReactNativeWebView.postMessage('obsvr callback');

    for (let mutation of mutationsList) {
// ******** Holiday bid


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
        break;
      }

// ***********

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
        window.ReactNativeWebView.postMessage('from web oa detail');
        // scrape
        Utils.configureApp();
        break;
      }
    }
  }

  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}

startObserver();
`;
