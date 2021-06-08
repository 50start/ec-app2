import {createSelector} from 'reselect'

const productsSelector = (state) => state.products;

export const getProducts = createSelector(
  [productsSelector],
  state => state.list
)
//返す値　state.list
//reduxのstoreの中のstateのproductsのlistがgetProducts

//商品情報をGET