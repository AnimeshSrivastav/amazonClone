import "./App.css";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import { Routes, Route } from "react-router-dom";
import Checkout from "./components/checkoutPage/Checkout";
import Login from "./components/login/Login";
import { useEffect } from "react";
import { auth } from "./components/login/firebase";
import { useStateValue } from "./components/StateProvider/Stateprovider";
import Payment from "./components/payment/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Orders from "./components/orders/Orders";

const promise = loadStripe(
  "pk_test_51MIECKSJhsjQ1ZWQsiNWGXuUPyN0ttV27dyjoMTnBCwnu5lIgCRJbjPmVcbgxW6ur8NVVQrBql8fjlGl9TrkW33X00FWXhSdr9"
);

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //When LOGIN
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //When LOGOUT
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <div className="App">
      <Routes>
      <Route path="/orders" element={[<Header /> ,<Orders />]} />
        <Route path="/checkout" element={[<Header />, <Checkout />]} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/payment"
          element={[
            <Header />,
            <Elements stripe={promise}>
              <Payment />{" "}
            </Elements>,
          ]}
        />
        <Route path="/" element={[<Header />, <Home />]} />
      </Routes>
    </div>
  );
}

export default App;
