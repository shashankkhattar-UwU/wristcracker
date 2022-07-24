import {applyMiddleware, combineReducers, createStore} from 'redux'
import { createWrapper } from 'next-redux-wrapper';
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './User/reducer';

const combinedReducer=combineReducers({user})

const initStore=()=>{
    return createStore(combinedReducer, composeWithDevTools(applyMiddleware()))
}


export const wrapper=createWrapper(initStore);