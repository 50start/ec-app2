import * as Actions from './actions'
import initialState from '../store/initialState'

export const UsersReducer = (state = initialState.users, action) => {
  switch(action.type) {
    case Actions.FETCH_ORDERS_HISTORY:
      return{
        ...state,  //operations.jsのlist(商品データーの配列) => actions.jsのhistory　=>　[...action.payload]（配列が渡ってきてるさらにスクレプト構文で配列を生成している）
        orders: [...action.payload] //ordersのstateを更新
      };
    
    case Actions.FETCH_PRODUCTS_IN_CART:
      return{
        ...state,
        cart: [...action.payload] //cartが配列のため[]を記入 reduxのstoreのcartの情報を更新できる
      };
    case Actions.SIGN_IN:
      return{
        ...state,
        ...action.payload
        };
      case Actions.SIGN_OUT:
        return{
          ...action.payload
        };
      default:
        return state
  }
}
