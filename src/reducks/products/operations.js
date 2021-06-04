import {db, FirebaseTimestamp} from "../../firebase";
import {push} from "connected-react-router";

const productsRef = db.collection('products')

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
         updateed_at: timestamp
       }

       if(id === ""){//編集ページでない時
       const ref = productsRef.doc();
       data.created_at = timestamp
       id = ref.id;
       data.id = id;
       }

       return productsRef.doc(id).set(data, {merge: true}) //merge: true=> 更新された部分だけ更新をする
       .then(() => {
         dispatch(push('/'))
       }).catch((error) => {
         throw new Error(error)
       })
   }
}