const Utils = {
  async configureApp() {
    const {queries, menuTitleQ, employeeIdQ} = Config;
    const employeeIdElem = document.querySelector(employeeIdQ);

    if (!employeeIdElem) {
      return;
    }

    // const action = {
    //   type: 'SET_STATE',
    //   payload: {employeeId: 'test'}, // employeeIdElem.innerHTML
    // };

    // window.ReactNativeWebView.postMessage(JSON.stringify(action));

    State.employeeId = 'test'; // employeeIdElem.innerHTML;

    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: 'SSA_ENABLE',
        payload: {ssaEnabled: true},
      })
    );

    for (let i = 0; i < queries.length; i++) {
      const q = queries[i];
      const bidId = document.querySelector(this.parseClxsStr(q.bidIdClasses));
      const title = document.querySelector(menuTitleQ);
      // get show menu
      // const favorites = document.getElementById('ssa-app');

      if (!title || title.innerHTML !== q.menuTitle) {
        continue;
      }

      State.settings = q;

      if (title.innerHTML === 'Holiday Bid') {
        DOM.scrapeHoliday();
        break;
      }

      if (bidId) {
        await DOM.scrape(bidId.innerText);
      }

      // showMenu = true
      if (!favorites) {
        DOM.renderFavorites();
      }

      break;
    }
  },

  parseClxsStr(str) {
    return `.${str.split(' ').join('.')}`;
  },

  getText(elem, query) {
    const e = elem.querySelector(query);

    if (!e) {
      return null;
    }

    return e.innerText;
  },

  formatTime(str) {
    const [time, ampm] = str.split(' ');
    const [hr, min] = time.split(':');
    const h = parseInt(hr);

    const hh =
      h === 12
        ? ampm === 'AMx'
          ? 24
          : ampm === 'AM'
          ? 0
          : h
        : ampm === 'AM'
        ? h
        : ampm === 'PM'
        ? h + 12
        : h + 24;

    return hh * 60 + parseInt(min);
  },

  getMinutes(elem, query) {
    const str = Utils.getText(elem, query);
    if (!str) return null;

    return Utils.formatTime(str);
  },

  parseWorkTime(str) {
    const [h, m] = str.split('h');

    return parseInt(h) * 60 + parseInt(m);
  },

  parseTotal(mins) {
    const hh = Math.floor(mins / 60);
    const mm = mins % 60;

    function formatTime(time) {
      return time < 10 ? '0' + time.toString() : time;
    }

    return `${formatTime(hh)}h${formatTime(mm)}`;
  },
};

export default `
  const Utils = {
    async configureApp() {
      const {queries, menuTitleQ, employeeIdQ} = Config;
      const employeeIdElem = document.querySelector(employeeIdQ);


      // ######################################

      // window.ReactNativeWebView.postMessage(
      //   JSON.stringify({
      //     type: 'SSA_ENABLE',
      //     payload: {ssaEnabled: true, employeeId: '001'},
      //   })
      // );

      // ######################################

      if (!employeeIdElem) {
        return;
      }

      State.employeeId = employeeIdElem.innerHTML;

      for (let i = 0; i < queries.length; i++) {
        const q = queries[i];
        const bidId = document.querySelector(this.parseClxsStr(q.bidIdClasses));
        const title = document.querySelector(menuTitleQ);

        if (!title || title.innerHTML !== q.menuTitle) {
          continue;
        }

        State.settings = q;

        if (title.innerHTML === 'Holiday Bid') {
          DOM.scrapeHoliday();
          break;
        }

        if (bidId) {
          await DOM.scrape(bidId.innerText);
        }

        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: 'SSA_ENABLE',
            payload: {ssaEnabled: true, employeeId: State.employeeId, menuTitle: q.menuTitle},
          })
        );
      }
    },


    parseClxsStr(str) {
      return \`.\${str.split(' ').join('.')}\`;
    },

    getText(elem, query) {
      const e = elem.querySelector(query);
  
      if (!e) {
        return null;
      }
  
      return e.innerText;
    },


    formatTime(str) {
      const [time, ampm] = str.split(' ');
      const [hr, min] = time.split(':');
      const h = parseInt(hr);

      const hh =
        h === 12
          ? ampm === 'AMx'
            ? 24
            : ampm === 'AM'
            ? 0
            : h
          : ampm === 'AM'
          ? h
          : ampm === 'PM'
          ? h + 12
          : h + 24;

      return hh * 60 + parseInt(min);
    },

    getMinutes(elem, query) {
      const str = Utils.getText(elem, query);
      if (!str) return null;

      return Utils.formatTime(str);
    },

    parseWorkTime(str) {
      const [h, m] = str.split('h');

      return parseInt(h) * 60 + parseInt(m);
    },

    parseTotal(mins) {
      const hh = Math.floor(mins / 60);
      const mm = mins % 60;

      function formatTime(time) {
        return time < 10 ? '0' + time.toString() : time;
      }

      return \`\${formatTime(hh)}h\${formatTime(mm)}\`;
    },
  }

`;
