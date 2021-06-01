import React,{useEffect}from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { listenAuthState } from './reducks/users/operations';
import { getIsSignedIn } from './reducks/users/selectors';

//Authコンポーネントの役割 => ユーザーがサインインしているか判定をして　していなければlistenAuthState関数を呼ぶ
const Auth = ({children}) =>{
   const dispatch = useDispatch()
   const selector = useSelector((state) => state); //Reduxのstoreのstateを取得する
   const isSignedIn = getIsSignedIn(selector); //isSignedInを取得

   useEffect( ()=>{ //Authコンポーネントの１回目のレンダーが走った後に実行したい関数を記述
       if (!isSignedIn){
          dispatch(listenAuthState())//もしサインインしていない状態だとしたらlistenAuthState関数を呼び出す
       }
   }, [])

   if(!isSignedIn){//サインしていない場合
     return<></>　　//空のjsxを渡す
   }else{
     return children　//サインインしている状態　子要素を返す useEffectは呼ばずここに飛ぶ（Authコンポーネント）
   }

}
export default Auth;