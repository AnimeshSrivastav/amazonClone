import React, { useEffect, useState } from "react";
import "./orders.css";
import { db } from "../login/firebase";
import { useStateValue } from "../StateProvider/Stateprovider";
import Order from "./Order";

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc("user?.uid")
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot(snapshot =>(   
          setOrders(snapshot.docs.map((item) => ({
            id: item.id,
            data: item.data(),
          }))
        ))
       
        );
    } else {
      setOrders([]);
    }
  }, [user]);
  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__order">
        {orders?.map((item) => (
          <Order items={item} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
