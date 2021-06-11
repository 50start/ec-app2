import React,{useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getProductsInCart} from '../reducks/users/selectors';
import {makeStyles} from '@material-ui/styles'
import {CartListItem} from '../components/Products';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider'
import {PrimaryButton, TextDetail} from "../components/UIkit";

const useStyles =makeStyles((theme) => ({
    detailBox: {
           margin: '0 auto',
           [theme.breakpoints.down('sm')]:{
             width: 320 //スマホの場合は320px
           },
           [theme.breakpoints.up('md')]:{
             width: 512
        },
    },
    orderBox: {
      border: '1px solid rgba(0,0,0,0.2)',
      borderRadius: 4,
      boxShadow: '0 4px 2px 2px rgba(0,0,0,0.2)',
      height: 256,
      margin: '24px auto 16px auto',
      padding: 16,
      width: 288
    },
}))

const OrderComfirm = () => {
   const classes = useStyles();
   const dispatch = useDispatch()
   const selector = useSelector((state) => state);
   const productsInCart = getProductsInCart(selector);
 //メモ化　計算するような処理書いて　その結果がこのsubtotal変数に入ってくる　第２引数に指定した値が変わるたびに再計算する　値が変わらない限り再計算はしない
 // コンポーネントのレンダリングだったり計算の部分がより法律的になるのでメモ化をしている　今回はproduct.cartIdが変わるたびに再計算している
//カートの中の商品が変わると再計算をする useMemoのなかでreturnした値がsubtotalに入っていく　returnの中は計算する
//productsInCartに対する配列の中で　reduce（何回も配列を回していく）メソッド引数２つ　=> sum(前回の計算の結果を毎回受け取る)　初期値0
 const subtotal = useMemo(() => {
   return productsInCart.reduce((sum, product) => sum += product.price, 0)
}, [productsInCart]);


const shippingFee = (subtotal >= 10000) ? 0 : 210;  //商品合計が10,000以上の場合手数料無し　それ以下は210円　三項演算子
const tax = subtotal * 0.1;
const total = subtotal + shippingFee + tax;

   return(
     <section className="c-section-wrapin">
       <h2 className="u-text__headline">注文の確認</h2>
        <div className="p-grid__row"> 
           <div className="classes.detailBox">
             <List>
                 {productsInCart.length > 0 &&(
                   productsInCart.map(product => <CartListItem product={product} key={product.cartId}/>)
                 )}
             </List>
          </div>
          <div className={classes.orderBox}>
              <TextDetail label={"商品合計"} value={"¥" + subtotal.toLocaleString()} /> 
              <TextDetail label={"消費税"} value={"¥" + tax.toLocaleString()} /> 
              <TextDetail label={"送料"} value={"¥" + shippingFee.toLocaleString()} /> 
              <Divider />
              <TextDetail label={"合計（税込）"} value={"¥" + total.toLocaleString()} /> 
          </div>
        </div>
     </section>
   )
}

export default OrderComfirm