import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filterSlice from "../reducer/filterSlice";
import createSagaMiddleware from "redux-saga";
import saga from "../sagas";

// const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

export const rootReducer = combineReducers({ filter: filterSlice });

const store = configureStore({
    reducer: rootReducer, 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
    // enhancers: (composeEnhancers) // Используйте composeEnhancers как один из enhancers
  });

sagaMiddleware.run(saga);

export default store;