import {useState, useEffect, useReducer} from 'react';
import yelp from '../api/yelp';

export function useSearch() {
  const [state, dispatch] = useReducer(reducer, initalState());

  useEffect(() => {
    async function getInitialResults(params) {
      await fetchBusinesses();
    }

    getInitialResults();
  }, []);

  async function fetchBusinesses(term = 'restaurants') {
    console.log('TERM:', term);
    dispatch({type: 'loading', payload: {}});
    try {
      const resp = await yelp.get('/search', {
        params: {
          limit: 50,
          term: term,
          location: 'los angeles',
        },
      });

      dispatch({type: 'results', payload: {results: resp.data.businesses}});
    } catch (error) {
      dispatch({type: 'error', payload: {error: error.message}});
    }
  }

  function initalState() {
    return {results: [], loading: false, error: ''};
  }

  function reducer(state, action) {
    if (!action) return state;

    const {
      type,
      payload: {results, error},
    } = action;

    switch (type) {
      case 'results':
        return {...state, results, error: '', loading: false};
      case 'error':
        return {...state, error, loading: false};
      case 'loading':
        return {...state, loading: true};
      default:
        return state;
    }
  }

  return [state, fetchBusinesses];
}
