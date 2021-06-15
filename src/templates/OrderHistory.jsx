import React,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import List from '@material-ui/core/List';
import {makeStyles} from '@material-ui/styles';
import { getOrdersHistory } from '../reducks/users/selectors';
import { fetchOrdersHistory } from '../reducks/users/operations';
import {OrderHistoryItem} from "../components/Products";

const useStyles = makeStyles((theme) => ({
   orderList: {
    background: theme.palette.grey["100"],
    margin: '0 auto',
    padding: 32,
    [theme.breakpoints.down('sm')]: {
        width: '100%'
     },
    [theme.breakpoints.up('md')]: {
        width: 768
     }
   },
}))

const OrderHistory = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const orders = getOrdersHistory(selector); //orders => 配列Array
　//renderされる前は[]（空） renderされてuseEffectが最初のrender後に動く　OrderHistoryを取得　　
  //reduxのstoreの情報が書き変わる　再取得する　Array配列に入る
  //ordersがinitialState（初期状態 orders:[]）のままなのでuseEffect関数でoperations.jsを呼び出す
  useEffect(() =>{    //OrderHistoryがマウント　レンダー　されたらordersが更新される
       dispatch(fetchOrdersHistory())
  },[])
　
return (
    <section className="c-section-wrapin">
      <List className={classes.orderList}>
 　　　　　{orders.length > 0 && (
   orders.map(order => <OrderHistoryItem order={order} key={order.id}/>)
 )}
      </List>
    </section>
  )
}

export default OrderHistory