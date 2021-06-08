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

  useEffect(() =>{ //商品情報をdbからとる　useEffectで呼び出す
    dispatch(fetchProducts())
  },[]);
  

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