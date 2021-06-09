import {makeStyles} from '@material-ui/styles';
import React,{useState, useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { db, FirebaseTimestamp } from '../firebase/index';
import HTMLReactParser from "html-react-parser";
import {ImageSwiper, SizeTable} from "../components/Products";
import {addProductToCart} from "../reducks/users/operations";




const useStyles = makeStyles((theme) => ({
    sliderBox: {
       [theme.breakpoints.down('sm')]:{ //600px以下の時はこれを記述
         margin: '0 auto 24px auto',
         height: 320,
         width: 320 
       },
       [theme.breakpoints.up('sm')]:{ //sm以上の時
　　　　　margin: '0 auto',
        height: 400,
        width:  400
       }
    },
    detail: {
      textAlign: 'left',
      [theme.breakpoints.down('sm')]:{ //600px以下の時はこれを記述
        margin: '0 auto 16px auto',
        height: 'auto',
        width: 320 
      },
      [theme.breakpoints.up('sm')]:{ //sm以上の時
　　　　　margin: '0 auto',
        height:   'auto',
        width:  400
      }
   },
      price:{
       fontSize: 36
    }
}));

const returnCodeToBr = (text) => { 
  if (text === "") {
    return text 
  } else {
   return HTMLReactParser(text.replace(/\r?\n/g, '<br/>')) //textが　""(空)出ない場合 replaseメソッドを使って
   　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　//改行コードをbrタグに変えるHTMLReactParserを使ってparseしている
  }         　　　　　　　　　　　//引数(text)を改行コードで受け取りbrタグに変えて　brタグが使えるようにHTMLReactParserでラッピング
};



const ProductDetail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const path = selector.router.location.pathname; 
  //reduxのstoreで管理している　ルーテングの情報の中にlocation.pathnameがあり　urlのドメイン以降がpathに入る
  const id = path.split('/product/')[1];// splitした値の２つ目の要素がid

   const [product, setProduct] = useState(null);

   useEffect(() => { //レンダーが走った後　useEffectが処理が走り　setProductでproductが更新される
  db.collection('products').doc(id).get()
  .then(doc => {
   　　　const data = doc.data();
                  console.log(data)
   　　　setProduct(data) //productのstateを更新
  })
   },[]);

  const addProduct = useCallback((selectedSize) => {  //useCallbackでメモ化 <SizeTable/>に渡す
      const timestamp = FirebaseTimestamp.now() //Firebaseで管理している時刻Timestamp側でgetできる
      dispatch(addProductToCart({
        added_at: timestamp,
        description: product.description,  //productのstateに商品の情報が入っている
        gender: product.gender,
        images: product.images,
        name: product.name,
        price: product.price,
        productId: product.id,
        quantity: 1,　　//商品は１個づつ追加
        size: selectedSize
    }))
    },[product]); //productが更新されたらaddproductも再生成される
    

   return(
      <section className="c-section-wrapin">
         {product &&( // productが存在していたら
　　　　　　　　　<div className="p-grid__row">
                  <div className={classes.sliderBox}>
                    <ImageSwiper images={product.images}/>
                  </div>
                  <div className={classes.detail}>
                      <h2 className="u-text__headline">{product.name}</h2>
                      <p className={classes.price}>¥{(product.price).toLocaleString()}</p>{/*toLocaleString 3桁区切り*/}
                      <div className="module-spacer--small"/>
                      <SizeTable addProduct={addProduct} sizes={product.sizes}/>
                      <div className="module-spacer--small"/>
                      <p>{returnCodeToBr(product.description)}</p> {/*HTML改行タグ関数*　
                      　　　　descriptionがただの文字列だったのが改行コードがbrタグに変換されてHTML文字列がreactのコンポーネントの中で表示される*/}
                  </div>
              </div>
         )}
      </section>
   )
}

export default ProductDetail