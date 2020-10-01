import React, {useReducer} from 'react';

export default function (reducer, actions, initialState) {
  const Context = React.createContext();

  function Provider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const boundedActions = {};

    for (let key in actions) {
      boundedActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{state, actions: boundedActions}}>
        {props.children}
      </Context.Provider>
    );
  }

  return {Context, Provider};
}
