import {fetchOrdersHistoryAction, fetchProductsInCartAction, signInAction, signOutAction} from "./actions";
import {push} from 'connected-react-router';
import {auth, db, FirebaseTimestamp} from '../../firebase/index'

export const addProductToCart = (addedProduct) => { //ProductDetail.jsxのaddProductCart関数が入ってきている
  return async (dispatch, getState) => {
      const uid = getState().users.uid; //現在のreduxのstoreの情報を取る　userのuidの情報をとる
      const cartRef = db.collection('users').doc(uid).collection('cart').doc()  //新しくcartというサブコレクションに新しくデータを追加する枠を作る
      addedProduct['cartId'] = cartRef.id; //cartIdを持たせる 
      await cartRef.set(addedProduct)
      dispatch(push('/')) 
   }
}

export const fetchOrdersHistory = () =>{
   return async (dispatch, getState) => {
     const uid = getState().users.uid     //user uidを取得
     const list = [];

     db.collection('users').doc(uid) //ログインしているユーザーの
     .collection('orders')//ordersのサブcollectionを見に行って
     .orderBy('updated_at','desc')//取得した値が更新順に並んで
     .get()
     .then(snapshots => {
       snapshots.forEach( snapshot => {　//それらまとめてsnapshotsで受け取りforEachで一個一個処理
          const data = snapshot.data() //商品データがsnapshot.dataで取得できる
          list.push(data)
        })
        dispatch(fetchOrdersHistoryAction(list))//forEachが終わったらAcrionを呼び出す
      })
     
   }
}

export const fetchProductsInCart = (products) => {
  return async (dispatch) => {
    dispatch(fetchProductsInCartAction(products))
    //actionを呼び出す関数
  }
}

export const listenAuthState = () =>{ //認証リッスン関数の作成
  return async (dispatch) => {
    return auth.onAuthStateChanged( user => { //戻り値user
       if(user){//userが存在していたら
        const uid = user.uid

         db.collection('users').doc(uid).get() //データベースuserscollectionの中からuidのデーターを受け取る　
         .then(snapshot => {  //クエリ投げる
          const data = snapshot.data() //dataを取ってくる
          dispatch(signInAction({
             isSignedIn: true,　//サインインされたよ　false=>true　ユーザーの情報をとる reduxを更新
             role: data.role,
             uid: uid,
             username: data.username
　　　　　}))
         //dispatch(push('/'))  //signInActionの処理が終わったらdispatch! ログイン認証完了！
　        })
　　　　　}else{
         dispatch(push('/signin'))　//サインインページに飛ばされる
       }
    })
  }
}

export const resetPassword = (email) =>{
  return async (dispatch) => {
    if(email === "") {
      alert("必須項目が未入力です")
      return false //emailが空だったら何もされずに終了
    }else{
      auth.sendPasswordResetEmail(email)
      .then(()=>{
        alert('入力されたアドレスにパスワードリセット用のメールを送りました')
        dispatch(push('/signin'))
      }).catch(()=>{
        alert('パスワードリセットに失敗しました')
      })
    }
  }
}


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
export const signOut = () =>{ //reduxのstateの初期化をする
  return async (dispatch) =>{
　　　auth.signOut()
       .then(() => {
         dispatch(signOutAction())//signOutActionをよびだす
         dispatch(push('/signin')) //サインイン画面に戻す
       })
  }
}
