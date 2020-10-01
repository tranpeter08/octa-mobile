const DOM = {
  renderHeaderCells(headerElem, totalWork, totalSplit) {
    headerElem.insertAdjacentHTML(
      'beforeend',
      Components.HeaderCells(totalWork, totalSplit)
    );
  },

  renderFieldCells(e, splitTime) {
    const query = Utils.parseClxsStr(State.settings.fieldClasses.detail);
    e.querySelector(query).insertAdjacentHTML(
      'beforeend',
      Components.FieldCells(splitTime)
    );
  },

  async scrape(bidId) {
    const {headerClasses, fieldClasses} = State.settings;
    const {
      parseClxsStr,
      parseTotal,
      getMinutes,
      getText,
      parseWorkTime,
    } = Utils;

    const moon = document.querySelector('#moonshine');
    const header = document.querySelector(parseClxsStr(headerClasses.parent));

    if (!header) {
      return;
    }

    const list = document.querySelectorAll(parseClxsStr(fieldClasses.parent));

    if (!list.length) {
      alert('Error :(');
      return;
    }

    let totalSplit = 0;
    let totalWork = 0;
    let totalTime = 0;
    let daysOff = [];

    list.forEach((e) => {
      const runId = getText(e, parseClxsStr(fieldClasses.runId));

      if (!runId) return;

      if (runId === 'OFF') {
        const day = getText(e, parseClxsStr(fieldClasses.day));
        if (day) daysOff.push(day);
        return;
      }

      const startTime = getMinutes(e, parseClxsStr(fieldClasses.start));

      if (!startTime) return;

      const endTime = getMinutes(e, parseClxsStr(fieldClasses.end));
      const workTime = parseWorkTime(
        getText(e, parseClxsStr(fieldClasses.work))
      );

      const actualTime = endTime - startTime;
      const splitTime = actualTime - workTime;

      if (!moon) {
        this.renderFieldCells(e, splitTime);
      }

      totalTime += actualTime;
      totalSplit += splitTime;
      totalWork += workTime;
    });

    totalSplit = parseTotal(totalSplit);
    totalWork = parseTotal(totalWork);
    totalTime = parseTotal(totalTime);

    State.data = {
      bidId,
      totalWork,
      totalSplit,
      totalTime,
      daysOff,
    };

    if (!moon) {
      this.renderHeaderCells(header, totalWork, totalSplit);
    }
  },

  scrapeHoliday() {
    const {items, field} = State.settings;
    const ssaClass = 'ssa-cell';

    for (let {id, listParent, workTime, start, end} of items) {
      const query = `#${id} .${listParent}`;
      const runs = document.querySelectorAll(query);

      runs.forEach((elem) => {
        const splitCtnr = elem.querySelector(`.${ssaClass}`);
        if (splitCtnr) {
          return;
        }

        const workStr = elem.querySelector(Utils.parseClxsStr(workTime))
          .innerHTML;
        const totalWork = Utils.parseWorkTime(workStr);
        const startTimeStr = elem.querySelector(Utils.parseClxsStr(start))
          .innerHTML;
        const endTimeStr = elem.querySelector(Utils.parseClxsStr(end))
          .innerHTML;

        const startT = Utils.formatTime(startTimeStr);
        const adjust =
          startTimeStr.split(' ')[1] === 'PM' &&
          endTimeStr.split(' ')[1] === 'AM'
            ? 24 * 60
            : 0;
        const endT = Utils.formatTime(endTimeStr) + adjust;
        const split =
          endTimeStr === 'TBD'
            ? 'N/A'
            : Utils.parseTotal(endT - startT - totalWork);
        const fieldElem = elem.querySelector(Utils.parseClxsStr(field));

        const splitElem = `
          <div class="Field_Cell ${ssaClass}" style="padding: 2px 6px;">
            <span class="HolidayBidPreferredDayAssignment_Cell_Label Status_Cell_Label Cell_Label">Split:</span>
            <span class="HolidayBidPreferredDayAssignment_Cell_Value Status_Cell_Value Cell_Value">${split}</span>
          </div>`;
        fieldElem.insertAdjacentHTML('afterend', splitElem);
      });
    }
  },
};

export default `
  const DOM = {
    renderHeaderCells(headerElem, totalWork, totalSplit) {
      headerElem.insertAdjacentHTML(
        'beforeend',
        Components.HeaderCells(totalWork, totalSplit)
      );
    },
  
    renderFieldCells(e, splitTime) {
      const query = Utils.parseClxsStr(State.settings.fieldClasses.detail);
      e.querySelector(query).insertAdjacentHTML(
        'beforeend',
        Components.FieldCells(splitTime)
      );
    },
  
    async scrape(bidId) {
      const {headerClasses, fieldClasses} = State.settings;
      const {
        parseClxsStr,
        parseTotal,
        getMinutes,
        getText,
        parseWorkTime,
      } = Utils;
  
      const moon = document.querySelector('#moonshine');
      const header = document.querySelector(parseClxsStr(headerClasses.parent));
  
      if (!header || moon) {
        return;
      }
  
      const list = document.querySelectorAll(parseClxsStr(fieldClasses.parent));
  
      if (!list.length) {
        alert('Error :(');
        return;
      }
  
      let totalSplit = 0;
      let totalWork = 0;
      let totalTime = 0;
      let daysOff = [];
  
      list.forEach((e) => {
        const runId = getText(e, parseClxsStr(fieldClasses.runId));
  
        if (!runId) return;
  
        if (runId === 'OFF') {
          const day = getText(e, parseClxsStr(fieldClasses.day));
          if (day) daysOff.push(day);
          return;
        }
  
        const startTime = getMinutes(e, parseClxsStr(fieldClasses.start));
  
        if (!startTime) return;
  
        const endTime = getMinutes(e, parseClxsStr(fieldClasses.end));
        const workTime = parseWorkTime(
          getText(e, parseClxsStr(fieldClasses.work))
        );
  
        const actualTime = endTime - startTime;
        const splitTime = actualTime - workTime;
  
        this.renderFieldCells(e, splitTime);
  
        totalTime += actualTime;
        totalSplit += splitTime;
        totalWork += workTime;
      });
  
      totalSplit = parseTotal(totalSplit);
      totalWork = parseTotal(totalWork);
      totalTime = parseTotal(totalTime);
  
      State.data = {
        bidId,
        totalWork,
        totalSplit,
        totalTime,
        daysOff,
      };
  
      this.renderHeaderCells(header, totalWork, totalSplit);
    },
  
    scrapeHoliday() {
      const {items, field} = State.settings;
      const ssaClass = 'ssa-cell';
  
      for (let {id, listParent, workTime, start, end} of items) {
        const query = \`#\${id} .\${listParent}\`;
        const runs = document.querySelectorAll(query);
  
        runs.forEach((elem) => {
          const splitCtnr = elem.querySelector(\`.\${ssaClass}\`);
          if (splitCtnr) {
            return;
          }
  
          const workStr = elem.querySelector(Utils.parseClxsStr(workTime))
            .innerHTML;
          const totalWork = Utils.parseWorkTime(workStr);
          const startTimeStr = elem.querySelector(Utils.parseClxsStr(start))
            .innerHTML;
          const endTimeStr = elem.querySelector(Utils.parseClxsStr(end))
            .innerHTML;
  
          const startT = Utils.formatTime(startTimeStr);
          const adjust =
            startTimeStr.split(' ')[1] === 'PM' &&
            endTimeStr.split(' ')[1] === 'AM'
              ? 24 * 60
              : 0;
          const endT = Utils.formatTime(endTimeStr) + adjust;
          const split =
            endTimeStr === 'TBD'
              ? 'N/A'
              : Utils.parseTotal(endT - startT - totalWork);
          const fieldElem = elem.querySelector(Utils.parseClxsStr(field));
  
          const splitElem = \`
            <div class="Field_Cell \${ssaClass}" style="padding: 2px 6px;">
              <span class="HolidayBidPreferredDayAssignment_Cell_Label Status_Cell_Label Cell_Label">Split:</span>
              <span class="HolidayBidPreferredDayAssignment_Cell_Value Status_Cell_Value Cell_Value">\${split}</span>
            </div>\`;
          fieldElem.insertAdjacentHTML('afterend', splitElem);
        });
      }
    },
  }
`;
