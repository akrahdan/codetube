import { configureStore, ThunkAction, Action, getDefaultMiddleware } from "@reduxjs/toolkit";
import { connectRoutes } from 'redux-first-router';
import queryString from 'query-string';
import { routesMap } from 'portal/routes'
import rootReducer, { reduceInitialState } from 'portal/state/reducers';
import { SiteState } from 'state/types';
import { authApi } from "services/auth";
import { projectApi } from "services/projects";
import { coursesApi } from "services/courses";
import { messagingApi } from "services/messaging";
import modalReducer from 'state/modals/modalSlice';
import messagingReducer from 'state/messaging/messagingSlice';
import authReducer from 'state/auth/authSlice';
import courseReducer from "state/course/courseSplice";
import projectReducer from 'state/project/projectSplice';
import playerReducer from 'state/player/playerSlice';
import instructorReducer from 'state/instructor/instructorSplice';
import  curriculumSplice  from "state/curriculum/currriculumSplice";
import targetSplice from "state/target/targetSplice";

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

const { middleware: routerMiddleWare, enhancer: routerEnhancer, initialDispatch, reducer: location} = connectRoutes(routesMap, {
    querySerializer: queryString,
    initialDispatch: false,
    scrollTop: true,
});

export const store = configureStore({
    reducer: {
        location: location,
        auth: authReducer,
        modal: modalReducer,
        player: playerReducer,
        course: courseReducer,
        messaging: messagingReducer,
        curriculum: curriculumSplice,
        project: projectReducer,
        target: targetSplice,
        instructor: instructorReducer,
        [authApi.reducerPath]: authApi.reducer,
        [coursesApi.reducerPath]: coursesApi.reducer,
        [projectApi.reducerPath]: projectApi.reducer,
        [messagingApi.reducerPath]: messagingApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck: false
    }).concat(authApi.middleware, coursesApi.middleware, projectApi.middleware, routerMiddleWare),
    enhancers: (defaultEnhancers) => defaultEnhancers.concat(routerEnhancer)
})
initialDispatch()

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
 ReturnType, 
 RootState,
 unknown,
 Action<string>
 >;