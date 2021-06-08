import * as Actions from './actions'
import initialState from '../store/initialState'

export const ProductsReducer = (state = initialState.products, action) =>{
  switch (action.type){
    case Actions.DELETE_PRODUCTS:
      return{
        ...state,
        list: [...action.payload]
      }
     case Actions.FETCH_PRODUCTS:
      return{
        ...state,
        list: [...action.payload]
      };
      default:
        return state
  }
}

//[...action.payload] リスト要素　配列にして配列に入れ込む
//storeの更新　コンポーネント側で検知してくれないというのがある
//新しい配列として更新　FETCH_PRODUCTS呼び出した後に商品情報更新
//[...action.payload]として更新される