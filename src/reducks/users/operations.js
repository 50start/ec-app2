import {signInAction} from "./actions";
import {push} from 'connected-react-router';

export const signIn = () =>{
  return  async(dispatch, getState) => {
    const state = getState() //現在のStateを取得
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
    }
  }
}

