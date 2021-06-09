const initialState = {
 products:{
     list:[],//商品情報入れていく配列
 },
 users: {
    cart: [],
    isSignedIn: false,
    role:"",
    uid: "",
    username:"",
  }
};

export default initialState