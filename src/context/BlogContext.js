// import React, {useState, useReducer} from 'react';
// import useBlogPost from '../hooks/useBlogPost';
import createDataContext from '../context/createDataContext';

const actions = {
  addBlogPost(dispatch) {
    return function (payload, callback) {
      dispatch({type: 'add', payload});
      callback();
    };
  },

  deleteBlogPost(dispatch) {
    return function (id) {
      dispatch({type: 'delete', payload: {id}});
    };
  },

  editBlogPost(dispatch) {
    return function (payload) {
      dispatch({type: 'edit', payload});
    };
  },
};

function reducer(state, action) {
  if (!action.type) {
    return state;
  }

  const {type, payload} = action;

  switch (type) {
    case 'add':
      return {
        ...state,
        blogPosts: [
          ...state.blogPosts,
          {
            id: `${state.blogPosts.length + 1}`,
            ...payload,
          },
        ],
      };

    case 'edit':
      let index;
      for (let i = 0; i < state.blogPosts.length; i++) {
        if (state.blogPosts[i].id === payload.id) {
          index = i;
          break;
        }
      }

      const copies = [...state.blogPosts];
      copies[index] = payload;

      return {...state, blogPosts: copies};

    case 'delete':
      const remaining = state.blogPosts.filter(
        (post) => post.id !== payload.id
      );
      return {...state, blogPosts: remaining};

    default:
      return state;
  }
}

export const {Context, Provider} = createDataContext(reducer, actions, {
  blogPosts: [{id: '0', title: 'opopo', content: 'popopopo'}],
});
