import React from 'react';
import {makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../../assets/img/icons/logo.png';
import {useSelector, useDispatch} from 'react-redux';
import {getIsSignedIn} from "../../reducks/users/selectors";
import {push} from "connected-react-router";
import {HeaderMenus} from "./index";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
},
   menuBar: {
     backgroundColor: "#fff",
     color: "#444",
 },
   toolBar: {
     margin: '0 auto',
     maxWidth: 1024,
     width: '100%'
   },
   iconButtons: {
     margin: '0 0 0 auto'
   }
});

const Header = () => {
   const classes = useStyles();
   const dispatch = useDispatch(); 
   const selector = useSelector((state) => state) //サインインしているかどうかチェック　していない場合はHeaderを出さない
　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　//useSelectorを使ってログイン状態を取得　reduxのstoreから
   const isSignedIn = getIsSignedIn(selector)     //selector関数を呼び出す

return(
  <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolBar}>
          <img src={logo} alt="Shiro Logo" width="72px"
          onClick={() => dispatch(push('/'))} 
          /> {/*callback関数でhome画面に飛ばす*/}
         {isSignedIn && (   //isSignedInがtrueなら
               <div className={classes.iconButtons}> {/*divタグが右寄せ*/}
                 <HeaderMenus/>
               </div>
         )}
        </Toolbar>
      </AppBar>
  </div>
)

  };

export default Header;