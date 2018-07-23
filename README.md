# Redux Elm Subscriptions

Listen to global events Elm Style.

## Why?

When creating components you most likely wanna keep your components dumb
and not use lifecycle hooks which couples rendering to functionality.

So instead of this in a component file ...

```js
componentDidMount() {
  document.addEventListener('keydown', handlekeyDown);
}


componentWillUnmount() {
  document.removeEventListener('keydown', handlekeyDown);
}
```

you can do this in a central place in your code ...

```js
import { createSubsriptions, subNone } from 'redux-elm-subscriptions';

...

const mySubscriptions = (state, dispatch) => {

  // each subscription function needs to set up the subscription and return
  // a function to unsubscribe
  const arrowKeysSub = () => {
    const handler = e => {
      if (e.keyCode === 32) {
        dispatch({ action: 'SPACE_PRESS' });
      }
    };
    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
    };
  };

  const listenToClicks = () => {
    const handler = () => { dispatch({ type: 'DOCUMENT_CLICK' }); };
    document.addEventListener('click', handler);
    return () => { document.removeEventListener('click', handler); };
  };

  return {
    arrowKeys: arrowKeysSub,
    anotherSubscriptions: () => {
      // subscribe here
      return () => {
        // unsubscribe here
      };
    },
    // only listen to clicks when the modal is open
    conditionalSubscription: state.modalOpen ? listenToClicks : subNone,
  };
};

// add them to the store
store.subscribe(createSubscriptions(store)(mySubscriptions));
```
Also check out the [example](example.js).

## Some Details

The API is designed so you can control listening behavior based on your `state`.
Your subscription function receives the `state` and `dispatch` as parameters and
should start listening to some event in the world. After that it needs to return
a function to unsubscribe from the event you just started listening to. The
function will be called every time the state changes. If a subscription is no
longer present in the returned object, the unsubscribe function will be called
automatically.

As long as yo make sure that your functions return functions to unsubscribe,
everything should be handled automatically for you.

## How does it work?

Check out the [source](index.js).
It's very simple, less than 30 LOC and needs no dependencies.
