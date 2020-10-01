import createDataContext from './createDataContext';

const initialState = {loggedIn: false};
const actions = {
  signup(dispatch) {
    return function ({email, password}) {
      return {
        type: 'signup',
        payload: {},
      };
    };
  },

  sigin(dispatch) {
    return function ({email, password}) {
      return {
        type: 'signin',
        payload: {email, password},
      };
    };
  },
};

function reducer(state, action) {
  switch (action.type) {
    case '':
      // do something
      return '';
    default:
      return state;
  }
}

export default createDataContext(reducer, actions, initialState);
