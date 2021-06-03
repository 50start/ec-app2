import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware
} from 'redux'
import { createLogger } from 'redux-logger/src'
import {connectRouter, routerMiddleware} from 'connected-react-router'
import thunk from 'redux-thunk';

import {UsersReducer} from "../users/reducers";
import {ProductsReducer} from "../products/reducers";  //reducersを増やしたらimport

export default function createStore(history) {
  const logger = createLogger({
    collapsed: true,
    diff: true
});
  
  return reduxCreateStore(
     combineReducers({
      products: ProductsReducer,
      router: connectRouter(history),
      users: UsersReducer
     }),
     applyMiddleware(
       logger,
       routerMiddleware(history),
       thunk
     )
   )
}