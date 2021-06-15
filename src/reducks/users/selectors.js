import {createSelector} from 'reselect'


const usersSelector = (state) => state.users;
/*users: {
  icon: "",
  isSignedIn: false,
  uid: "",
  username:""
}*/

//更新されたstateを取得(get)するための関数

export const getOrdersHistory = createSelector(
  [usersSelector],
  state =>state.orders　//更新されたstate
)

export const getIsSignedIn = createSelector(
  [usersSelector],
  state =>state.isSignedIn
)

export const getProductsInCart = createSelector(
  [usersSelector],
  state =>state.cart
)

export const getUserId = createSelector(
  [usersSelector],
  state =>state.uid
)

export const getUserName = createSelector(
  [usersSelector],
  state =>state.username
)

