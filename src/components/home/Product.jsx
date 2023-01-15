import React from 'react'
import'./product.css'
import StarRateIcon from '@mui/icons-material/StarRate';
import { useStateValue } from '../StateProvider/Stateprovider';
function Product({id,price,title,image,rating}) {
  const [{basket},dispatch]= useStateValue()
  const addToBasket=()=>{
    dispatch({type:"ADD_TO_BASKET",
    item:{
      id:id,
      title:title,
      price:price,
      image:image,
      rating:rating
    }

    })
  }
  return (
    <div className='product'>
        <div className="product__info">
      <div className="product__discription">{title}</div>
      <div className="product__price"><small>$</small>{price}</div>
      </div>
      {/* TODO: Rating */}
      <div className="product__rating">
        {Array(rating).fill().map((_,index)=>{
            return <StarRateIcon key={index} className='rating__icon'/>
        })}
     </div>
      <img src={image} alt={title} className='product__image' />
      <div className="product__button">
        <button className='product__btn' onClick={addToBasket}>ADD TO CART</button>
      </div>
    </div>
  )
}

export default Product
