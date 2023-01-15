import React from "react";
import "./subtotal.css";
import { useStateValue } from "../StateProvider/Stateprovider";
import CurrencyFormat from "react-currency-format";
import { getTotalPrice } from "../StateProvider/reducer";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
function Subtotal(props) {
  const [{ basket }, dispatch] = useStateValue();
  const navigate = useNavigate();
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal({props.numberOfItems}):<strong>{value}</strong>
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
<Link to="/payment">
      <button className="subtotal__button">
        Proceed to Payment
      </button>
      </Link>
    </div>
  );
}

export default Subtotal;
