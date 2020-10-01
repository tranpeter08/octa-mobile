const Components = {
  HeaderCells(totalWork, totalSplit) {
    const {cell, label, value} = State.settings.headerClasses;

    return `<div id="moonshine"></div>
      <div class="${cell} ssa-field-cell">
        <div class="${label}">Total Work Time: </div>
        <div class="${value}">${totalWork}</div>
      </div>
      <div class="${cell} ssa-field-cell">
        <div class="${label}">Total Split Time: </div>
        <div class="${value}">${totalSplit}</div>
      </div>
    `;
  },

  FieldCells(splitTime) {
    const {cell, label, value} = State.settings.fieldClasses;

    return `<span class="${cell} ssa-field-cell">
      <span class="${label}">Splits: </span>  
      <span class="${value}">${Utils.parseTotal(splitTime)}</span>
    </span>`;
  },
};

export default `
const Components = {
  HeaderCells(totalWork, totalSplit) {
    const {cell, label, value} = State.settings.headerClasses;

    return \`<div id="moonshine"></div>
      <div class="\${cell} ssa-field-cell">
        <div class="\${label}">Total Work Time: </div>
        <div class="\${value}">\${totalWork}</div>
      </div>
      <div class="\${cell} ssa-field-cell">
        <div class="\${label}">Total Split Time: </div>
        <div class="\${value}">\${totalSplit}</div>
      </div>
    \`;
  },

  FieldCells(splitTime) {
    const {cell, label, value} = State.settings.fieldClasses;

    return \`<span class="\${cell} ssa-field-cell">
      <span class="\${label}">Splits: </span>  
      <span class="\${value}">\${Utils.parseTotal(splitTime)}</span>
    </span>\`;
  },
};
`;
