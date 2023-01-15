import React from "react";
import StarRateIcon from "@mui/icons-material/StarRate";
import "./checkoutProduct.css";
function CheckoutProduct(props) {
  return (
    <div className="checkoutProduct">
      <img
        src={props.items.image}
        alt="img"
        className="checkout__product__image"
      />
      <div className="checkoutproduct__info">
        <div className="checkoutproduct__discription">{props.items.title}</div>
        <div className="checkoutproduct__price">
          <small>$</small>
          {props.items.price}
        </div>
        {/* TODO: Rating */}
        <div className="checkoutproduct__rating">
          {Array(props.items.rating)
            .fill()
            .map((_, index) => {
              return <StarRateIcon key={index} className="rating__icon" />;
            })}
        </div>
        <button
          className="remove__button"
          onClick={() => props.handleclick(props.items.id)}
        >
          Remove from Cart
        </button>
        
      </div>
    </div>
  );
}

export default CheckoutProduct;
