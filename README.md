# Redux Elm Subscriptions

Listen to global events Elm Style.

## Why?

When creating components you most likely wanna keep your components dumb
and not use lifecycle hooks which couples rendering to functionality.

So instead of this

```js
componentDidMount() {
  document.addEventListener('keydown', handlekeyDown);
}


componentWillUnmount() {
  document.removeEventListener('keydown', handlekeyDown);
}
```

you can do this.

```js
import createSubsriptions from 'redux-elm-subscriptions';

...

const mySubscriptions = (state, dispatch) => {

  // each subscription function needs to set up the subscription and return
  // a function to unsubscribe
  const arrowKeysSub = () => {
    const handler = e => {
      if (e.keyCode === '...') {
        dispatch({ action: 'ARROW_PRESS' });
      }
    };
    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
    };
  };

  // if you want to listen return your subscription function otherwise use null
  const arrowKeys =
    state.page === 'page I wanna subscribe on' ? arrowKeysSub : subNone;

  return {
    arrowKeys,
    anotherSubscriptions: () => {
      // subscribe
      return () => {
        // unsubscribe
      };
    },
  };
};

store.subscribe(createSubscriptions(store)(mySubscriptions));
```
Also check out the [example](example.js).

## How does it work?

Check out the [source](index.js).
It's very simple, less than 30 LOC and needs no dependencies.
