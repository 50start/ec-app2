import React,{useEffect} from 'react'
import {ProductCard} from "../components/Products";
import {useDispatch, useSelector} from "react-redux";
import { fetchProducts } from '../reducks/products/operations';
import { getProducts } from "../reducks/products/selectors";

const ProductList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state)
  //selectorには現在のreduxのstoreのstateの全体が入っている
  const products = getProducts(selector);
  //productsの中に商品情報が入ってくる

  const query = selector.router.location.search;//この値を取るとurlのクエリーパラメーターが入っている
  //三項演算子と正規表現 先頭が?gender=クエリーパラメーターで始まるやつですか？を検証している queryという値をtestメソッドで検証している　正規表現に当てはまるかどうか　
  //三項演算子？で繋ぐとtrueの場合queryをsplitメソッドでsplitする　?gender=後の値を取り出すことができる
  const gender = /^\?gender=/.test(query) ? query.split('?gender=')[1] : "";
  const category = /^\?category=/.test(query) ? query.split('?category=')[1] : "";

  useEffect(() =>{ //商品情報をdbからとる　useEffectで呼び出す
    dispatch(fetchProducts(gender, category))
  },[query]);//queryが変わるたびにuseEffectが実行する　query => selector.router.location.search(クエリーパラメーター)
  //クエリーパラメーター　=> ?=genderなど　

  console.log(products)
  
  return(
  <section className="c-section-wrapin">
    <div className="p-grid__row">
         {products.length > 0 &&  (
           products.map(product => (
              <ProductCard 
              key={product.id} id={product.id} name={product.name}
              images={product.images} price={product.price}
              />
          ))
         )} 
    </div>
  </section>
  )
}

export default ProductList