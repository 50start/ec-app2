import React, {useCallback, useState} from 'react'
//usecallback=>子コンポーネントの関数を変更する時に使用　不要な再描画を防ぐ　
import {PrimaryButton, TextInput} from '../components/UIkit';
import {signUp} from '../reducks/users/operations'
import {useDispatch} from "react-redux";
import {push} from "connected-react-router";

const SignUp = () => {

  const dispatch = useDispatch()

  const [username, setUsername] = useState(""),
        [email, setEmail] = useState(""),
        [password, SetPassword] = useState(""),
        [confirmPassword, SetConfirmPassword] = useState("");

    const inputUsername = useCallback((event) =>{ 
      setUsername(event.target.value) //　event=>onChangeに渡す引数 onChangeが動いた時の値
     },[setUsername]);
　　//第一引数callback関数　第二引数deps(再描画の条件)

    const inputEmail = useCallback((event) =>{ 
      setEmail(event.target.value) 
     },[setEmail]);

    const inputPassword = useCallback((event) =>{ 
       SetPassword(event.target.value) 
     },[SetPassword]);

    const inputConfirmPassword = useCallback((event) =>{ 
       SetConfirmPassword(event.target.value) 
     },[SetConfirmPassword]);

return(
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">アカウント登録</h2>
      <div className="module-spacer--medium"/>
      <TextInput
         fullWidth={true} label={"ユーザー名"} multiline={false} required={true}
         rows={1} value={username} type={"text"} onChange={inputUsername}
      />
     <TextInput
         fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
         rows={1} value={email} type={"email"} onChange={inputEmail}
      />
     <TextInput
         fullWidth={true} label={"パスワード入力"} multiline={false} required={true}
         rows={1} value={password} type={"password"} onChange={inputPassword}
      />
      <TextInput
         fullWidth={true} label={"パスワード(再確認)"} multiline={false} required={true}
         rows={1} value={confirmPassword} type={"password"} onChange={inputConfirmPassword}
      />
   <div className="module-spacer--medium"/>
   <div className="center">
         <PrimaryButton
            label={"アカウントを登録する"}
            //onClick={()=>console.log("clicked!!")}
            onClick={()=>dispatch(signUp(username,email, password, confirmPassword))}
            //operationで作った関数を実行　ローカルで管理しているstateを渡す
         />
         <div className="module-spacer--medium"/>
         <p onClick={() => dispatch(push('/signin'))}>アカウントをお持ちの方はこちら</p>
     </div>
   </div>
   )
}
export default SignUp

