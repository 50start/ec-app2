import React,{useState, useCallback} from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HistoryIcon from '@material-ui/icons/History';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {TextInput} from '../UIkit/index';
import {useDispatch} from "react-redux";
import {push} from 'connected-react-router';
import {signOut} from '../../reducks/users/operations';

const useStyles = makeStyles( (theme) => ({
    drawer: {
      [theme.breakpoints.up('sm')]:{
        flexShrink: 0,
        width: 256
      }
  },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: 256
    },
    searchField: {
      alignItems: 'center',
      display: 'flex',
      marginLeft: 32
    }
}));

const ClosableDrawer = (props) =>{
  const classes = useStyles();
  const {container} = props; //{container}という連想配列にする
  const dispatch = useDispatch();

  const [keyword, setkeyword] = useState("");
  //callback関数を使ってsetkeywordをラッピング　変更用の関数を作る
  const inputKeyword = useCallback((event) => { //eventを受け取ってeventがsetKeywordで
     setkeyword(event.target.value)　　　　　　　　//onChangeで渡ってきたeventの値target.valueをsetKeywordに渡す
  },[setkeyword]);
  
  //メニューを選択した時の関数
  const selectMenu = (event, path) => {
     dispatch(push(path)) //selectMenuを呼び出すと引数に渡したpathにpush
     props.onClose(event) 
    　//Headerからpropsとして渡ってきた　onCloseとして渡したhandleDrawerToggle menuが選択されたときに呼び出す
  }
  
  const menus = [
    {func: selectMenu, label: "商品登録", icon: <AddCircleIcon/>, id:"register", value: "/product/edit"},
    {func: selectMenu, label: "注文履歴", icon: <HistoryIcon/>, id:"history", value: "/order/history"},
    {func: selectMenu, label: "プロフィール", icon: <PersonIcon/>, id:"profile", value: "/user/mypage"}
  ];

  return (
    <nav className={classes.drawer}>
      <Drawer
         container={container}
         variant="temporary" //閉じたり出したりができる
         anchor="right" //どこから出すのか
         open={props.open} 
         onClose={(e) => props.onClose(e)}//closeする条件　
         //callback関数でeventという引数を受け取ってpropsで渡ってきたonClose関数にeventを渡す
         classes={{paper: classes.drawerPaper}} //paperというkeyに対してdrawerPaperクラスを渡す
         ModalProps={{keepMounted: true}} //スマホで表示するときにdrawer開いた時のパフォーマンスが上がる
      >
        <div　
           onClose={(event) => props.onClose(event)}
           onKeyDown={(event) => props.onClose(event)}
        >
          <div className={classes.searchField}>
             <TextInput
              fullWidth={false} label={"キーワードを入力"}　multiline={false}
              onChange={inputKeyword} required={false} rows={1} value={keyword} type={"text"}
             />
             <IconButton>
               <SearchIcon/>
             </IconButton>
          </div>
           <Divider/>
           <List>
             {menus.map( menu => (
                  <ListItem button key={menu.id} onClick={(event) => menu.func(event, menu.value)}>
                    {/* クリックしたときにeventが発生　menu.func(func: selectMenu)に渡す　eventとmenu.value(path)を渡す*/}
                      <ListItemIcon>
                      {menu.icon}
                      </ListItemIcon>
                      <ListItemText primary={menu.label}/>
                  </ListItem>
             ))}
     {/*dispatchでsignOutを呼び出す サインイン画面に遷移reducks/users/operations.jsでsignOutが定義されている*/}
     <ListItem button key="logout" onClick={() => dispatch(signOut())}>
               <ListItemIcon>
                 <ExitToAppIcon />
               </ListItemIcon>
               <ListItemText primary={"Logout"} />
             </ListItem>
           </List>
        </div>
     </Drawer>
    </nav>
                                             
  )
}
export default ClosableDrawer
                     
             