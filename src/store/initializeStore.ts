import { MemoVoidDictionaryIterator } from 'lodash';
import queryString from 'query-string';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Store,
} from 'redux';
import { connectRoutes } from 'redux-first-router';
import { SiteState } from 'state/types';
import promiseMiddleware from 'redux-promise';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';




const sagaMiddleware = createSagaMiddleware()

export type StoreRequestPath = {
    pathname: string;
}

export type ConfigureStoreOptions = {
    requestPath: StoreRequestPath;
    initialState: SiteState;
    reduceInitialState: (initialState: SiteState) => SiteState;
    routesMap: any;
    rootReducers: any;
    rootSaga?: any;
    hotReloadPath?: string;

}

export default function initializeStore({
    initialState,
    requestPath,
    reduceInitialState,
    routesMap,
    rootReducers,
    rootSaga,
    hotReloadPath
}: ConfigureStoreOptions): Store<SiteState> {
    const preloadedState = reduceInitialState(initialState)
    const router = connectRoutes(routesMap, {
        querySerializer: queryString,
        initialEntries: [requestPath],
        initialDispatch: false,
        scrollTop: true,
    });
    const middlewares = [thunk, promiseMiddleware, router.middleware]
    const allReducers = combineReducers<SiteState>({
        ...rootReducers,
        location: router.reducer
    })

    if (rootSaga) {
        middlewares.push(sagaMiddleware)
    }

    const composeEnhancers = compose;
    const enhancer = compose<any>(
        router.enhancer,
        applyMiddleware(...middlewares)
    );

    const store = createStore(allReducers, {}, enhancer);
    if(rootSaga) {
        sagaMiddleware.run(rootSaga)
    }
    router.initialDispatch!()
    return store;


}


