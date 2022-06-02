import { configureStore, combineReducers } from '@reduxjs/toolkit';
import users from './users';
import posts from './posts';

const reducer = combineReducers({
    // 두 개의 리덕스를 합쳐줌
    users,
    posts,
});

export default configureStore({
    reducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
});
