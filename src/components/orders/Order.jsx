import React from "react";
import moment from "moment";
import "./order.css";
import CheckoutProduct from "../../components/checkoutPage/CheckoutProduct";
import CurrencyFormat from "react-currency-format";

function Order({ items }) {
  return (
    <div className="order">
      <p>{moment.unix(items.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className="order__id">
        <small>{items.id}</small>
      </p>

      {items.data.basket?.map((item) => (
        <CheckoutProduct items={item} hidebutton/>
      ))}

      <CurrencyFormat
        renderText={(value) => (
          <h3 className="order__total">Order Total: {value}</h3>
        )}
        decimalScale={2}
        value={items.data.amount / 100}
        thousandSeparator={true}
        displayType="text"
        prefix="$"
      />
    </div>
  );
}

export default Order;
