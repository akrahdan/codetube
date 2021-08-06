import { createAction } from 'redux-actions';
import { NOT_FOUND } from 'redux-first-router';

export const error404 = createAction(NOT_FOUND);
export const error500 = createAction('location/ERROR_500');
