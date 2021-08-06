import { merge } from 'lodash';

const staticReducer = (state = {}) => state;
const invoicesReducer = (state = []) => state;

export const reduceInitialState = (initialProps = {} as any) =>
  merge({}, initialProps.portalData, initialProps.reduxData);

const rootReducer = {
  scenes: {},
  static: staticReducer,
};

export default rootReducer;