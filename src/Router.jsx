import React from 'react'
import {Switch, Route} from 'react-router';
import {Home, ProductEdit, SignUp, SignIn, Reset} from './templates'
import Auth from './Auth'



const Router = () =>{
  return(
    <Switch>
      <Route exact path={"/signup"} component={SignUp}/>
      <Route exact path={"/signin"} component={SignIn}/>
      <Route exact path={"/signin/reset"} component={Reset}/>
      <Auth>
      <Route exact path={"(/)?"} component={Home}/>  
      <Route exact path={"/product/edit"} component={ProductEdit}/>  
      </Auth>
    </Switch>
    )
}

export default Router

//<Route exact path={"(/)?"} component={Home}/> 認証が必要なコンポーネント　サインした後　<Auth>でラッピング