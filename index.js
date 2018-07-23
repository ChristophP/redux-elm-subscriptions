export const subNone = null;

export const createSubscriptions = ({
  getState,
  dispatch,
}) => getSubscriptions => {
  const _subState = {};

  return () => {
    const state = getState();
    const subs = getSubscriptions(state, dispatch);
    // if new value is there, subscribe and store unsubscribe function
    Object.keys(subs).forEach(key => {
      if (!_subState[key] && typeof subs[key] === 'function') {
        _subState[key] = subs[key](state, dispatch);
      }
    });

    // if value is removed, unsubscribe
    Object.keys(_subState).forEach(key => {
      if (!subs[key] && typeof _subState[key] === 'function') {
        _subState[key]();
        delete _subState[key];
      }
    });
  };
};
