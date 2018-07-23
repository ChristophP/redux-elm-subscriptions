// it needs to return an unsubscribe function
const getArrowKeySub = dispatch => {
  const handler = e => {
    if (e.keyCode === '... ') {
      dispatch({ type: 'ARROW_PRESS', payload: 'right' });
    }
    if (e.keyCode === '...') {
      dispatch({ type: 'ARROW_PRESS', payload: 'left' });
    }
  };
  document.addEventListener('keydown', handler);
  return () => {
    document.removeEventListener('keydown', handler);
  };
};

const subs = (state, dispatch) => {
  const arrowKeys =
    state.page === 'page I wanna subscribe on' ? arrowKeysSub : subNone;

  return {
    arrowKeys: getArrowKeySub(state, dispatch),
    anotherSubscriptions: () => {
      // subscribe
      return () => {
        // unsubscribe
      };
    },
  };
};

store.subscribe(createSubscriptions(store)());
