import React from 'react'
import {getUserUid,getUserName,getUserId} from '../reducks/users/selectors'
import {useSelector} from "react-redux"

const Home = () =>{
  const selector = useSelector(state => state); //store全体のstateを取得する
  const uid = getUserUid(selector)//reduxのstoreのusersstate中のuidを取得する
  const username = getUserName(selector)
  const id = getUserId(selector)
    return(
      <div>
        <h2>Home</h2>
        <p>{uid}</p>
        <p>{username}</p>
        <p>{id}</p>

      </div>
    )
}

export default Home