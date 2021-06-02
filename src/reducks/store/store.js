import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware
} from 'redux'
import {connectRouter, routerMiddleware} from 'connected-react-router'
import thunk from 'redux-thunk';

import {UsersReducer} from "../users/reducers";
import {ProductsReducer} from "../prosucts/reducers";  //reducersを増やしたらimport

export default function createStore(history) {
  
  return reduxCreateStore(
     combineReducers({
      products: ProductsReducer,
      router: connectRouter(history),
      users: UsersReducer
     }),
     applyMiddleware(
       routerMiddleware(history),
       thunk
     )
   )
}