import { combineReducers } from 'redux';

import { userReducer } from 'react';

export const rootReducer = combineReducers({
	user: userReducer
});
