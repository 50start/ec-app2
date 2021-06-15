import React,{useState, useEffect, useCallback} from 'react';
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
import {db} from '../../firebase/index';

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

  const [filters, setFilters] = useState([
    {func: selectMenu, label: "すべて", id:"all", value: "/"}, //Drawerメニュー開いた時に　クリックした時に何が起きるか定義
    {func: selectMenu, label: "メンズ", id:"male", value: "/?gender=male"}, 
    {func: selectMenu, label: "レデイース", id:"female", value: "/?gender=female"}
  ])
  
  const menus = [
    {func: selectMenu, label: "商品登録", icon: <AddCircleIcon/>, id:"register", value: "/product/edit"},
    {func: selectMenu, label: "注文履歴", icon: <HistoryIcon/>, id:"history", value: "/order/history"},
    {func: selectMenu, label: "プロフィール", icon: <PersonIcon/>, id:"profile", value: "/user/mypage"}
  ];

  useEffect(() => { //filtersに作ったカテゴリーを追加していく useEffectでdbと接続する
　　　　db.collection('categories')
      .orderBy('order', 'asc')
      .get()
      .then(snapshots => {
        const list = []
        snapshots.forEach(snapshot => { //snapshotをget
          const category = snapshot.data()
          list.push({func: selectMenu, label: category.name, id:category.id, value: `/?category=${category.id}`},) //バッククォーテションで文字列の中にjsの変数を埋め込める
        　　　　　　　　　　{/*func: selectMenu, label: "すべて", id:"all", value: "/"*/}
        　　   })
            setFilters( prevState => [...prevState, ...list]) //prevState => 更新前のstate スプレッド構文を使い新しくlistを作る　
         　              //新しいlistの中には前回の配列を展開したのを入れてその後に続ける形で今回のlistをスクレプト構文で展開してまた入れる　全体で大きな配列になる
          })
  },[]);

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
           <Divider /> {/*境界線*/}
           <List>
             {filters.map(filter =>(
               <ListItem 
                 button 
                 key={filter.id} 
                 onClick={(e) => filter.func(e, filter.value)} //funcというのがselectMenuである　selectMenuを呼び出す　
                　//dispatch(push(path))のpathはfilter.value(urlのクエリーパラメータ）が渡される　
                  //connected-react-routerによってリンクしたときにurlが変わるイベントが発生したらfilter.funcを実行する　funcには eとfilter.valueを渡す
               >
                  <ListItemText primary={filter.label}/>
               </ListItem>
             ))}
           </List>
        </div>
     </Drawer>
    </nav>
                                             
  )
}
export default ClosableDrawer
                     
             