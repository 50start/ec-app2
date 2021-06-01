import {signInAction} from "./actions";
import {push} from 'connected-react-router';
import {auth, db, FirebaseTimestamp} from '../../firebase/index'

export const signIn = (email, password) =>{
  return  async(dispatch) => {
    // Validation
    if (email === "" || password === ""){
      alert("必須項目が未入力です")
      return false //何もされずに終了
     }
     auth.signInWithEmailAndPassword(email, password)
     .then(result =>{
       const user =result.user //この中にユーザーの情報が入っています

       if(user){ //ユーザーが存在していたら処理に進む
         const uid = user.uid

         db.collection('users').doc(uid).get() //データベースuserscollectionの中からuidのデーターを受け取る
         .then(snapshot => {
           const data = snapshot.data() //data データーベースのdataが入っている

           dispatch(signInAction({
             isSignedIn: true,　//サインインされたよ　false=>true
             role: data.role,
             uid: uid,
             username: data.username
　　　　　　　}))
         　dispatch(push('/'))  //signInActionの処理が終わったらdispatch! ログイン認証完了！
　　　　　　})
       }
     })
  }
}



    /*const state = getState() //現在のStateを取得
    const isSignedIn = state.users.isSignedIn

    if(!isSignedIn){
      const url = 'https://api.github.com/users/50start'

      const response = await fetch(url)
      .then(res => res.json())
      .catch(()=> null)

      const username = response.login
      const id = response.id
      

      dispatch(signInAction({
        isSignedIn: true,
        uid: "3253595",
        username: username,
        id: id
    }))
      dispatch(push('/'))
    }*/

export const signUp = (username, email, password, confirmPassword)=>{
  return async(dispatch) => {
     // Validation
     if (username === "" || email === "" || password === "" || confirmPassword === "" ){
     alert("必須項目が未入力です")
     return false //何もされずに終了
  }
    if (password !== confirmPassword){
      alert("パスワードが一致していません　もう一度お試しください")
      return false
  }
  return auth.createUserWithEmailAndPassword(email, password)
  //emailパスワード用の認証用
  .then(result =>{
    const user = result.user

    if(user) {　//userが存在していたらアカウント登録成功　ユーザーの情報を使う
      const uid = user.uid
      const timestamp = FirebaseTimestamp.now()

      const userInitialData ={ //ユーザーのデーターを作る
        created_at: timestamp,
        email: email,
        role:"customer",
        uid: uid,
        updated_at: timestamp,
        username: username
      }
      db.collection('users').doc(uid).set(userInitialData)//firebaseのデーターに登録をする
      .then(()=>{
        dispatch(push('/')) //TOPページに戻る
      　　　})
    　　}
  　　})
 　}
}


