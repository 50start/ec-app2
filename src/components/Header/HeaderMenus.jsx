import React,{useEffect} from 'react';
import IconButton from "@material-ui/core/IconButton";
import Badge from '@material-ui/core/Badge'
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MenuIcon from "@material-ui/icons/Menu";
import {getProductsInCart, getUserId} from "../../reducks/users/selectors";
import {useSelector, useDispatch} from "react-redux";
import {db} from '../../firebase/index';
import {fetchProductsInCart } from '../../reducks/users/operations';


const HeaderMenus = (props) => {
  const dispatch = useDispatch()
  const selector = useSelector((state => state)); //stateをstateとして返す
  const uid = getUserId(selector) //user/selectors.jsから　getUserIdのselectorを呼び出す
  let ProductsInCart = getProductsInCart(selector) //ProductsInCart => reduxのstoreの中にあるcartの値が入っている
  
  useEffect(() =>{
        const unsubscribe = db.collection('users').doc(uid).collection('cart')
        .onSnapshot(snapshots => { //onSnapshot 商品をカートに追加してリアルタイムに反映　リスナーを設定
          snapshots.docChanges().forEach(change => { //snapshots => cart　sub　collectionの中にあるdata全て　forEach=>配列で回す
　　　　　　　　　const product = change.doc.data();
               const changeType = change.type;

               switch(changeType){
                 case 'added': //数値タイプがaddedの時は  新しい商品が追加された時
                   ProductsInCart.push(product) //ProductsInCartは配列 
                   break;
                 case 'modified'://中身が変化した時　変更
                   const index = ProductsInCart.findIndex(product => product.cartId === change.doc.id)
                   ProductsInCart[index] = product
                   　break;
                   //変更が加わったものが何番目か調べて　productで上書き
                 case 'removed': 
                   ProductsInCart = ProductsInCart.filter(product => product.cartId !== change.doc.id);
                   　break;
                   //カートの中から削除されたものがそのIdがマッチするもの以外を抽出した配列にしている　削除したものを配列から取り除いて新しく配列を作る
                 default:
                     break;
               }
          })
               dispatch(fetchProductsInCart(ProductsInCart)) //reduxのstoreのusersのcartの情報を更新するため
        })
        return () => unsubscribe()
  },[]);
  
  return(
    <>
      <IconButton>
        <Badge badgeContent={ProductsInCart.length} color="secondary"> {/*ProductsInCart.length　現在のcartの配列の数分だけバッジがつく*/}
       <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <IconButton>
        <FavoriteBorderIcon />
      </IconButton>
      <IconButton onClick={(event) => props.handleDrawerToggle(event)}>
        <MenuIcon />
      </IconButton>
    </>
  )
    
};

export default HeaderMenus