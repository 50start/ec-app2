import {db, FirebaseTimestamp} from "../../firebase";
import {push} from "connected-react-router";
import {deleteProductAction ,fetchProductsAction} from "./actions";

const productsRef = db.collection('products');

export const deleteProduct = (id) => { 
  return async (dispatch, getState) => { 
       productsRef.doc(id).delete()  //これだけで削除はできる
       .then(() => {　//削除した後にreduxのstoreのstateを更新　=> .thenをやる
         const prevProducts = getState().products.list;　//getState => 現在のstoreの情報をoperationsファイルで取得できる
         const nextProducts = prevProducts.filter(product => product.id !== id) //現在のproductsリストを取ってきてnextProducts
         　　　　　　　　　　　　　　　　　　　　　//filter => 配列をぐるぐる回す　配列に回ってきたid以外のもの（削除したもの以外の配列）を新しく作る
         dispatch(deleteProductAction(nextProducts))　//deleteProductActionにnextProductsを渡す
       })
  }
}

export const fetchProducts = () => {
  return async (dispatch) => {　
    productsRef.orderBy('updated_at','desc').get()　
    .then(snapshots => { 
      const productList = []
      snapshots.forEach(snapshot => {
        const product = snapshot.data() 
        productList.push(product)
        })
        dispatch(fetchProductsAction(productList))
    })
  }
}
//productsRef=>productsのcollectionのクエリ　クエリ=>URLの末尾につけ足す文字列（変数）
//fetchProductsAction => actionsで定義されている

export const orderProduct = (productsInCart, amount) =>{ //
  return async (dispatch, getState) => {
      const uid = getState().users.uid;
      const userRef = db.collection('users').doc(uid)
      const timestamp = FirebaseTimestamp.now();

      let products = [],
          soldOutProducts = [];

    //在庫がある商品だけを購入する
          const batch = db.batch() 

          for(const product of productsInCart) {//商品内のカートのproduct.productIdに対してDBからその賞品の情報を取得する
            const snapshot = await productsRef.doc(product.productId).get()
            const sizes =snapshot.data().sizes;
   //今の在庫状況から商品を購入すると　"1"　減る処理
           const updatedSizes = sizes.map(size => {
            if(size.size === product.size) { //今回注文したサイズであれば
              if(size.quantity === 0){ 
                 soldOutProducts.push(product.name)//カートに商品を追加するが別の人が既に買ってしまった
              return size //sizeオブジェクト
              }
              return{
              size: size.size,
              quantity: size.quantity -1//購入した物はマイナス１
            }
          }else{
            return size //今回選んだサイズでなければそのままreturnする
          }
       })
    　　　products.push({  //今回注文した商品のidを持つproductIdを持つオブジェクトとして作ってあげる
           id:product.productId,    //その中のkey:valueは注文履歴用のデーターを残したい　productId=>注文履歴用のデータ
           images: product.images,
           name: product.name,
           price: product.price,
           size: product.size
      });
         batch.update(
           productsRef.doc(product.productId),
           {size: updatedSizes} //商品を購入したら１減るので　減った状態のupdatedSizesを更新かける
         )
    
    　　　batch.delete(
          userRef.collection('cart').doc(product.cartId)//カート内の商品から今回注文したIdを削除する
      )
    }       //ここまでfor文でぐるぐる回している
　　  if(soldOutProducts.length > 0) { //売り切れのものが一つでもあったらbatchのコミットをせず一回エラーメッセージ出す　実際商品は購入されない
       const errorMessage = (soldOutProducts.length > 1) ?
                             soldOutProducts.join('と') :
                             soldOutProducts[0];         　　　　//エラーメッセージの中に商品名（シャツやパンツ）全部売り切れだったとしたら
            alert('大変申し訳ございません。' + errorMessage + '在庫切れとなったため、注文処理を中断いたしました')   
            return false                                          　　　　//soldOutProductsにあるシャツやパンツ）商品名が入っている　複数ある場合のエラーメッセージ
        }else{
            batch.commit()
            .then(()=>{　//在庫切れになっている商品がなかったらbatch.commit
                const orderRef = userRef.collection('orders').doc();//注文完了後の処理 注文履歴を残したい
                const date = timestamp.toDate()//今日のtimestampをDate型にする
                const shippingDate = FirebaseTimestamp.fromDate(new Date(date.setDate(date.getDate() + 3)))//配送日の案内

                const history = {
                   amount: amount,
                   created_at: timestamp,
                   id: orderRef.id,
                   products: products,  //注文したproducts　今回注文したproducts
                   shipping_date: shippingDate,
                   updated_at: timestamp
                }

                orderRef.set(history);
                dispatch(push('order/complete'))
              }).catch(() => {           
                 alert('注文処理に失敗しました。通信環境をご確認の上、もう一度お試しください。')
                 return false
           })
       }
　  }
}


export const saveProduct = (id, name, description, category, gender, price, images, sizes) =>{
   return async(dispatch) =>{ 
       const timestamp = FirebaseTimestamp.now()

       const data = { //cloudfirebaseのの登録されるdata
         category: category,
         description: description,
         gender: gender,
         images: images,
         name: name,
         price: parseInt(price, 10),
         sizes: sizes,
         updated_at: timestamp
       }

       if(id === ""){//編集ページでない時
       const ref = productsRef.doc();
       id = ref.id;
       data.id = id;
       data.created_at = timestamp
       }

       return productsRef.doc(id).set(data, {merge: true}) //merge: true=> 更新された部分だけ更新をする
       .then(() => {
         dispatch(push('/'))
       }).catch((error) => {
         throw new Error(error)
       })
   }
}