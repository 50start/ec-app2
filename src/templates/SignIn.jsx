import React, {useCallback, useState} from 'react'
//usecallback=>子コンポーネントの関数を変更する時に使用　不要な再描画を防ぐ　
import {PrimaryButton, TextInput} from '../components/UIkit';
import {signIn} from '../reducks/users/operations'
import {useDispatch} from "react-redux";

const SignIn = () => {

  const dispatch = useDispatch();

  const [email, setEmail] = useState(""),
        [password, SetPassword] = useState("");
        
        

    const inputEmail = useCallback((event) =>{ 
      setEmail(event.target.value) 
     },[setEmail]);

    const inputPassword = useCallback((event) =>{ 
       SetPassword(event.target.value) 
     },[SetPassword]);

return(
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">サインイン</h2>
      <div className="module-spacer--medium"/>
      
     <TextInput
         fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
         rows={1} value={email} type={"email"} onChange={inputEmail}
      />
     <TextInput
         fullWidth={true} label={"パスワード入力"} multiline={false} required={true}
         rows={1} value={password} type={"password"} onChange={inputPassword}
      />
      
   <div className="module-spacer--medium"/>
   <div className="center">
         <PrimaryButton
            label={"Sign In"}
            //onClick={()=>console.log("clicked!!")}
            onClick={()=>dispatch(signIn(email, password))}
            //operationで作った関数を実行　ローカルで管理しているstateを渡す
         />
   </div>
   </div>

  )

}

export default SignIn

