import React from 'react'
import {Switch, Route} from 'react-router';
import {ProductList, ProductEdit, SignUp, SignIn, Reset} from './templates'
import Auth from './Auth'

const Router = () =>{
  　　
  return(
    <Switch>
      <Route exact path={"/signup"} component={SignUp}/>
      <Route exact path={"/signin"} component={SignIn}/>
      <Route exact path={"/signin/reset"} component={Reset}/>
      <Auth>
      <Route exact path={"(/)?"} component={ProductList}/>  
      <Route path={"/product/edit(/:id)?"} component={ProductEdit}/>
      </Auth>
    </Switch>
    )
}

export default Router

//<Route exact path={"(/)?"} component={Home}/> 認証が必要なコンポーネント　サインした後　<Auth>でラッピング