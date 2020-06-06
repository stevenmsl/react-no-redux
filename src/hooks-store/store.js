import { useState, useEffect } from "react";

// it's important that the state needs
// to be defined outside the hook so it can
// later be shared among components
let globalState = {};
let listeners = [];
let actions = {};

export const useStore = (shouldListen = true) => {
  // React guarantees that this will not change for a given component
  // who uses this custom hook
  const setState = useState(globalState)[1]; // listener
  const dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](globalState, payload);
    globalState = { ...globalState, ...newState };
    for (const listener of listeners) {
      listener(globalState); // listener is setState
    }
  };
  useEffect(() => {
    if (shouldListen) {
      listeners.push(setState);
    }
    return () => {
      if (shouldListen) {
        listeners = listeners.filter((li) => li !== setState);
      }
    };
  }, [setState, shouldListen]);

  return [globalState, dispatch];
};

export const initStore = (userActions, intialState) => {
  if (intialState) {
    globalState = { ...globalState, ...intialState };
  }
  actions = { ...actions, ...userActions };
};
