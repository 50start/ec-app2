import React from 'react'
import {getUserName,getUserId} from '../reducks/users/selectors'
import {useSelector, useDispatch} from "react-redux"
import { signOut } from '../reducks/users/operations'

const Home = () =>{
  const dispatch = useDispatch()
  const selector = useSelector(state => state); //store全体のstateを取得する
  const uid = getUserId(selector)//reduxのstoreのusersstate中のuidを取得する
  const username = getUserName(selector)
  
    return(
      <div>
        <h2>Home</h2>
        <p>ユーザーID；{uid}</p>
        <p>ユーザー名：{username}</p>
        <button onClick={() => dispatch(signOut())}>SIGN OUT</button>

      </div>
    )
}

export default Home