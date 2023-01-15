import React from "react";
import { useStateValue } from "../StateProvider/Stateprovider";
import "./checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";

function Checkout() {
  const [{ basket }, dispatch] = useStateValue();
  let price=0
   price = basket.map((item) => {
     return price + item.price
  })
  const removeitem = (id) => {
    dispatch({ type: "REMOVE", item: id });
  };
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        <h2 className="checkout__title">Product in Cart</h2>
        {basket.map((item, index,) => {
          return (
            <CheckoutProduct
              items={item}
              key={index}
              handleclick={removeitem}
            />
          );
        })}
      </div>
      <div className="checkout__right">
        <Subtotal numberOfItems={basket.length} price={price}/>
      </div>
    </div>
  );
}

export default Checkout;
