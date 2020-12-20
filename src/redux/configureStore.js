import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import authReducer from "./ducks/authentication";
import { watcherSaga } from "./sagas/rootSaga";
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

function saveToLocalStorage(state){
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state',serializedState);
    } catch (e) {
        console.log(e);
    }
}

function loadFromLocalStorage(){
    try {
        const serializedState = localStorage.getItem('state');
        if(serializedState === null) return undefined;
        return JSON.parse(serializedState);
    }catch(e){
        console.log(e);
        return undefined;
    }
}

const persistedState = loadFromLocalStorage();

const rootReducer = combineReducers({  
  auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware,logger];

export const store = createStore(rootReducer, persistedState, composeWithDevTools(
    applyMiddleware(...middleware),
    // other store enhancers if any
  ));

store.subscribe(() => saveToLocalStorage(store.getState()));

sagaMiddleware.run(watcherSaga);

export default store;