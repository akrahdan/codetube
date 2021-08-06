import { routesMap } from 'portal/routes'
import initializeStore, { ConfigureStoreOptions } from 'store/initializeStore';
import rootReducer, { reduceInitialState } from 'portal/state/reducers';
import { SiteState } from 'state/types';
export function configureStore(
    initialState: SiteState,
    { requestPath }: Pick<ConfigureStoreOptions, 'requestPath'>
) {
    return initializeStore({
        initialState,
        requestPath,
        reduceInitialState,
        routesMap,
        rootReducers: rootReducer,
        hotReloadPath: 'portal/state/reducers'
    });
}