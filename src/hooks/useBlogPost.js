import {useReducer} from 'react';

export default function useBlogPost() {
  const [state, dispatch] = useReducer(reducer, {
    blogPosts: [
      {id: '1', content: 'zero'},
      {id: '2', content: 'zero'},
      {id: '3', content: 'zero'},
    ],
  });

  return [state, dispatch];
}

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
            id: (state.blogPosts.length + 1).toString(),
            content: payload.content,
          },
        ],
      };
    case 'edit':
      return state;
    default:
      return state;
  }
}
