import {style} from './insertStyle';

export const script = `

const styleString = \`
#SSA-container {
  font-family: Arial, 'Segoe UI', Verdana, Sans-Serif;
}

.menu-title {
  text-align: center;
  margin: 10px 0px 10px;
}

.ssa-field-cell {
  border: 1px solid grey;
  border-radius: 0.2rem;
  padding: 0.1rem;
}

.ssa-button {
  background-color: #0159c6;
  color: #fff;
  cursor: pointer;
  border: none;
  border-radius: 3px;
  padding: 5px;
  font-family: Arial, 'Segoe UI', Verdana, Sans-Serif;
}

#SSA-menu {
  background-color: white;
  max-width: 300px;
}

#SSA-menu,
#favorites-button {
  position: fixed;
  bottom: 20px;
  left: 20px;
  box-shadow: 0px 0px 12px 0.5px black;
}

.ssa-button:hover {
  background-color: #4b87d1;
  transition: 0.3s;
}

.menu-close-container {
  display: grid;
  justify-content: right;
}

#menu-close {
  border-radius: 0;
}

#bids-container {
  width: 300px;
  height: 200px;
  margin: 0;
  padding: 0;
  overflow: auto;
}

#bids-container > li {
  list-style-type: none;
  margin-bottom: 10px;
  background-color: #fff3d3;
  padding: 10px 6px;
}

.bid-item {
  display: grid;
  grid-gap: 6px 6px;
  grid-template-columns: 26px auto;
  grid-template-rows: auto;
  grid-template-areas: 'index bidDetailContainer';
}

.bid-item-index {
  grid-area: index;
}

.bid-item-detail-container {
  grid-area: bidDetailContainer;

  display: grid;
  grid-gap: 6px 6px;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    'bidId bidId'
    'work split'
    'daysOff daysOff';
}

.bid-item-grid-1 {
  grid-area: bidId;
}

.bid-item-grid-2 {
  grid-area: work;
}

.bid-item-grid-3 {
  grid-area: split;
}

.bid-item-grid-4 {
  grid-area: daysOff;
}

.bid-item-value {
  font-weight: bold;
}

#menu-button-container {
  padding: 10px;
  text-align: right;
}

.no-bids {
  text-align: center;
}

.hidden {
  display: none;
}

\`;


const State = {
  showMenu: false
};

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

  Favorites() {
    return \`test\`;
  },

  FavoritesButton() {
    return \` 
      <button 
        id="favorites-button"
        class="ssa-button"
      >
      Favorites
      </button>
    
    \`
  },

  FavoritesMenu(list) {
    return \`
    <div id="SSA-menu">
      <div class="menu-close-container">
        <button
          id="menu-close"
          class="ssa-button" 
        >
          CLOSE
        </button>
      </div>

      <h2 class="menu-title">Favorites</h2>

      <div>Bid List</div>

      <div id="menu-button-container">
        <button 
          class="ssa-button" 
          id="menu-clear"
        >
          CLEAR
        </button>
        <button
          class="ssa-button" 
          id="save-run"
        >
          ADD
        </button>
      </div>
    </div>
  \`}
};

const style = document.createElement('style');
style.innerHTML = styleString;

const ref = document.querySelector('script');
ref.parentNode.insertBefore(style, ref);

document.body.style.backgroundColor = 'red';
document.body.insertAdjacentHTML('afterbegin', '<div id="octa-app"></div>');

const container = document.getElementById('octa-app');
const message = 'testing';
let count = 0;
container.innerHTML = \`
  <h1>\${message}</h1>
  <h2>Count: <span id="count">\${count}</span></h2>
  <div id="ssa-app"></div>
  \`;


  const ssaContainer = document.getElementById('ssa-app');
  ssaContainer.innerHTML = Components.FavoritesButton();
  
  function addCount(e) {
    count++;
    document.getElementById('count').innerHTML = count;
  }
  
  function toggleMenu() {
    State.showMenu = !State.showMenu;
  
    if (State.showMenu) {
      ssaContainer.innerHTML = Components.FavoritesMenu();
    } else {
      ssaContainer.innerHTML = Components.FavoritesButton();
    }
  }
  
  document.addEventListener('click', clickListener)
  
  function clickListener(e) {
    if (e.target.id === 'favorites-button') {
      toggleMenu()
    }
  }
  


`;
