import React, {useCallback, useState} from 'react'
//usecallback=>子コンポーネントの関数を変更する時に使用　不要な再描画を防ぐ　
import {PrimaryButton, TextInput} from '../components/UIkit';
import {resetPassword} from '../reducks/users/operations'
import {useDispatch} from "react-redux";
import {push} from "connected-react-router"


const Reset = () => {

  const dispatch = useDispatch();

  const [email, setEmail] = useState(""); //ResetパスワードはemailだけでOK
       
  const inputEmail = useCallback((event) =>{ 
      setEmail(event.target.value) 
     },[setEmail]);


return(
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">パスワードのリセット</h2>
      <div className="module-spacer--medium"/>
      
     <TextInput
         fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
         rows={1} value={email} type={"email"} onChange={inputEmail}
      />
    
   <div className="module-spacer--medium"/>
   <div className="center">
         <PrimaryButton
            label={"Reset Password"}
            onClick={()=>dispatch(resetPassword(email))}
            //operationで作った関数を実行
         />
         <div className="module-spacer--medium"/>
         <p onClick={() => dispatch(push('/signin'))}>ログイン画面に戻る</p>
      </div>
   </div>
   )
  }
export default Reset;

