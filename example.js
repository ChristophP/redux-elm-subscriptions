import { createSubscriptions, subNone } from 'redux-elm-subscriptions';

const subs = (state, dispatch) => {
  const listenToDocClicks = () => {
    const handler = () => {
      dispatch({ type: 'DOCUMENT_CLICK' });
    };
    document.addEventListener('click', handler);
    return () => {
      document.removeEventListener('click', handler);
    };
  };

  return {
    // it needs to return an unsubscribe function
    arrowKeys: () => {
      const handler = e => {
        if (e.keyCode === 39) {
          dispatch({ type: 'ARROW_PRESS', payload: 'right' });
        } else if (e.keyCode === 37) {
          dispatch({ type: 'ARROW_PRESS', payload: 'left' });
        }
      };
      document.addEventListener('keydown', handler);
      return () => {
        document.removeEventListener('keydown', handler);
      };
    },
    // subscribe when modal is open, unsubscribe when it's closed
    documentClick: state.modalIsOpen ? listenToDocClick : subNone,
  };
};

store.subscribe(createSubscriptions(store)(subs));
