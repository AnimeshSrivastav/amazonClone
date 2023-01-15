import React, { useEffect, useState } from "react";
import CheckoutProduct from "../checkoutPage/CheckoutProduct";
import { useStateValue } from "../StateProvider/Stateprovider";
import "./payment.css";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getTotalPrice } from "../StateProvider/reducer";
import { useNavigate } from "react-router-dom";
import { db } from "../login/firebase";

import CurrencyFormat from "react-currency-format";
import axios from "../../axios/axios";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const navigate = useNavigate();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "POST",
        url: `/payments/create?total=${getTotalPrice(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);
  console.log(clientSecret);
  const handlesubmit = async (event) => {
    event.preventDefault();
    //STRIPE STUFF
    setProcessing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        db.collection("users")
          .doc("user?.uid")
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        dispatch({
          type: "EMPTY_BASKET",
        });
        navigate("/orders", { replace: true });
      });
  };

  const handlechange = (e) => {
    //LISTEN FOR THE ALL THE EVENTS AND DISPALY ERROR WHEN CUSTOMER TYPE
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  const removeitem = (id) => {
    dispatch({ type: "REMOVE", item: id });
  };
  return (
    <div className="payment">
      <div className="payment__section">
        <div className="payment__title">
          <h2>Delivey Address</h2>
        </div>
        <div className="paymentaddress">{user?.email}</div>
      </div>
      <div className="payment__section">
        <div className="payment__title">
          <h2>Review Items</h2>
        </div>
        <div className="payment__products">
          {basket.map((item, index) => {
            return (
              <CheckoutProduct
                items={item}
                key={index}
                handleclick={removeitem}
              />
            );
          })}
        </div>
      </div>
      <div className="payment__section">
        <div className="payment__title">
          <h2>Payment Method</h2>
        </div>
        <div className="payment__details">
          <form onSubmit={handlesubmit}>
            <CardElement onChange={handlechange} />
            <div className="payment__price">
              <CurrencyFormat
                renderText={(value) => (
                  <>
                    <p>
                      Order Total: <strong>{value}</strong>
                    </p>
                    <small className="subtotal__gift">
                      <input type="checkbox" />
                      This Order contains a gift
                    </small>
                  </>
                )}
                decimalScale={2}
                value={getTotalPrice(basket)}
                thousandSeparator={true}
                displayType="text"
                prefix="$"
              />
              <button className="payment__button" disabled={processing || disabled || succeeded}>
                {processing ? "Processing.." : "Buy Now"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
