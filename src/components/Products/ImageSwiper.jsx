import React,{useState} from 'react';
import Swiper from "react-id-swiper";
import NoImage from "../../assets/img/src/no_image.png";
import 'swiper/css/swiper.css';

const ImageSwiper = (props) => {
  const [params] = useState({
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      dynamicBullets: true
    },
     navigation: {
       nextEl: '.swiper-button-next',
       prevEl: '.swiper-button-prev'
     },
      loop: true,
  })
     const images = props.images

     return (
       <Swiper {...params}>
           {images.length === 0 ? (//画像が0だったら(設定されていない商品だったら)
              <div className="p-media__thumb">
                <img src={NoImage} alt="No Image"/>
              </div>
           ) : (//画像がある時 mapでぐるぐる回す
             images.map(image => (
　　　　　　　　　<div className="p-media__thumb">
                  <img src={image.path} alt="商品画像"/>
              </div>
             ))
           )} 
        </Swiper>
    )
};

export default ImageSwiper