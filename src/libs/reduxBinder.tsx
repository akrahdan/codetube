import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

export type ReduxStoreOptions = { requestPath?: { pathname: string } };

export type ReduxStoreConfigure = (
  props: { [x: string]: any },
  storeOptions: ReduxStoreOptions
) => Store;

export const createReduxBinder = (
  Component: any,
  configureStore: ReduxStoreConfigure
) => {
  const ReduxBinder = ({ storeOptions = {}, ...props }: any) => {
    return (
      <Provider store={configureStore(props, storeOptions)}>
        <Component {...props} />
      </Provider>
    );
  };
  return ReduxBinder;
};
