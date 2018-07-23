module.exports.subNone = null;

module.exports.createSubscriptions = ({
  getState,
  dispatch,
}) => getSubscriptions => {
  var _subState = {};

  return function() {
    var state = getState();
    var subs = getSubscriptions(state, dispatch);
    // if new value is there, subscribe and store unsubscribe function
    Object.keys(subs).forEach(function(key) {
      if (!_subState[key] && typeof subs[key] === 'function') {
        _subState[key] = subs[key](state, dispatch);
      }
    });

    // if value is removed, unsubscribe
    Object.keys(_subState).forEach(function(key) {
      if (!subs[key] && typeof _subState[key] === 'function') {
        _subState[key]();
        delete _subState[key];
      }
    });
  };
};
