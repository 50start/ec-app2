import React,{useCallback} from 'react';
import List from '@material-ui/core/List'
import {useDispatch,useSelector} from 'react-redux'
import { getProductsInCart } from '../reducks/users/selectors';
import { CartListItem } from '../components/Products';
import { PrimaryButton,GreyButton } from '../components/UIkit';
import {push} from "connected-react-router";
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    margin: '0 auto',
    maxWidth: 512,
    width: '100%'
  },
});

const CartList = () =>{
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state); //stateを受け取ってstateを返す
  const productsInCart = getProductsInCart(selector); //selector関数を呼び出す

  const goToOrder = useCallback(() =>{ //callback関数をメモ化
    dispatch(push('/order/confirm')) //order/confirmに遷移させる 
  },[]);

  const backToHome = useCallback(() => {
     dispatch(push('/')) //トップページに戻る
  },[]);

  return(
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">
        ショッピングカート
      </h2>
      <list className={classes.root}>
        {productsInCart.length > 0 && ( //productsInCartの要素が１個でもあったら処理
            productsInCart.map(product => <CartListItem key={product.cartId} product={product}/>)//mapで回している時はkeyを指定
        )}
      </list>
      <div className="module-spacer--medium"/>
      <div className="p-grid__column">
           <PrimaryButton label={"レジへ進む"} onClick={goToOrder} />
           <div className="module-spacer--extra-extra-small" />
           <GreyButton label={"ショッピングを続ける"} onClick={backToHome}/>
      </div>
    </section>
  )

}

export default CartList