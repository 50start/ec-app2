import React,{useCallback, useState, useEffect} from 'react'
import {PrimaryButton, SelectBox, TextInput} from "../components/UIkit";
import {useDispatch} from "react-redux";
import {saveProduct} from "../reducks/products/operations";
import ImageArea  from '../components/Products/ImageArea';
import SetSizesArea from '../components/Products/SetSizesArea';
import { db } from '../firebase/index';


const ProductEdit = () => {
  const dispatch = useDispatch();
  //const path = useSelector((state) => state.router.location.pathname)
  let id = window.location.pathname.split('/product/edit')[1];//pathを取得
  if (id !== ""){ //id=>商品情報　編集ページの時
    id = id.split('/')[1]
  }

  const 　[name, setName] = useState(""),
  　　　　 [description, setDescription] = useState(""),
  　　　　 [category, setCategory] = useState(""),
  　　　　 [gender, setGender] = useState(""),
  　　　　 [images, setImages] = useState([]),
  　　　　 [price, setPrice] = useState(""),
  　　　　 [sizes, setSizes] = useState([]),
  　　　　 [categories, setCategories] = useState([]);
  
         const inputName = useCallback((event) => {
            setName(event.target.value)
         },[setName])

         const inputDescription = useCallback((event) => {
          setDescription(event.target.value)
         },[setDescription])

         const inputPrice = useCallback((event) => {
          setPrice(event.target.value)
         },[setPrice])

         const genders = [
            {id: "all", name: "すべて"},
            {id: "male", name: "メンズ"},
            {id: "female", name: "レディース"},
           ];

  useEffect( () => {　//既存のデータをセット 
      if (id !==""){　//データベースに登録したデータを編集できるようにdata取得
        db.collection('products').doc(id).get()
        .then(snapshot => {
          const data = snapshot.data() //data=>firebaseのproductのdata
          setName(data.name);
          setImages(data.images);
          setGender(data.gender);
          setCategory(data.category);
          setPrice(data.price);
          setDescription(data.description);
          setSizes(data.sizes);
        })
      }
    
    }, [id]);//商品ページのIDが（次の商品、次の商品)と用意する場合idをセット

    useEffect(() => { //componentDidMountと同じ dbのcategories　dbから取ってきた値をsetCategoriesにセットする
       　db.collection('categories')
        .orderBy('order','asc') //数字の小さい順から並び替える
        .get()
        .then(snapshots => {
          const list = []
          snapshots.forEach(snapshot => { //snapshotをforEachで一個一個取り出す
          const data = snapshot.data()
          
          list.push({
              id: data.id,    //key valueの配列を作る　回す
              name: data.name
            })
          })
          setCategories(list)
        })
    },[]);

   return(
     <section>
       <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
       <div className="c-section-container">
            <ImageArea images={images} setImages={setImages}/>
            <TextInput
              fullWidth={true} label={"商品名"} multiline={false} required={true}
              onChange={inputName} rows={1} value={name} type={"text"}
            />
            <TextInput
              fullWidth={true} label={"商品説明"} multiline={true} required={true}
              onChange={inputDescription} rows={5} value={description} type={"text"}
            />

            <SelectBox
              label={"カテゴリー"} options={categories} required={true} select={setCategory} value={category}
            />

            <SelectBox
              label={"性別"} options={genders} required={true} select={setGender} value={gender}
            />
            
            <TextInput
              fullWidth={true} label={"価格"} multiline={false} required={true}
              onChange={inputPrice} rows={1} value={price} type={"number"}
            />
            <div className="module-spacer--small"/>
            <SetSizesArea sizes={sizes} setSizes={setSizes}/>
            <div className="module-spacer--small"/>
            <div className="center">
              <PrimaryButton
                 label={"商品情報を保存"}
                 onClick={() => dispatch(saveProduct(id, name, description, category, gender, price, images, sizes))}
              />
            </div>
       </div>
     </section>
     
  )
}

export default ProductEdit