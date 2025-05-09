import React from "react";
import Loader from "./loader";

function MyOrders() {
  const orders = [
    {
      restaurantName: "",
      restaurantImage: "",
      orderId: "",
      date: "",
      time: "",
      items: [],
      total: "",
      status: "",
      deliveryAddress: "",
      paymentMode: "",
    },
    {
      restaurantName: "",
      restaurantImage: "",
      orderId: "",
      date: "",
      time: "",
      items: [],
      total: "",
      status: "",
      deliveryAddress: "",
      paymentMode: "",
    },
  ];

  const styles = {
    container: {
      maxWidth: "",
      margin: "20px auto",
      padding: "20px",
      fontFamily: "Segoe UI, sans-serif",
      backgroundColor: "white",
      display: "flex",
    },
    heading: {
      fontSize: "26px",
      fontWeight: "bold",
      marginBottom: "30px",
      textAlign: "center",
      color: "#333",
    },
    card: {
      width: "300px",
      backgroundColor: "#fff",
      borderRadius: "12px",
      padding: "20px",
      margin: "0px auto 0px auto",
      marginBottom: "25px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    },
    sectionTitle: {
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "10px",
      color: "#444",
      borderBottom: "1px solid #eee",
      paddingBottom: "5px",
    },
    row: {
      marginBottom: "8px",
      fontSize: "14px",
      color: "#555",
    },
    label: {
      fontWeight: "bold",
      marginRight: "5px",
      color: "#333",
    },
    image: {
      width: "80px",
      height: "80px",
      borderRadius: "8px",
      objectFit: "cover",
      backgroundColor: "#ddd",
      marginBottom: "15px",
    },
  };

  return (
    <>
      <div style={styles.heading}>My Orders</div>
      <div style={styles.container}>
        {orders.map((order, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.sectionTitle}>Restaurant Details</div>
            <div style={styles.row}>
              <span style={styles.label}>Name:</span>{" "}
              {order.restaurantName || "---"}
            </div>
            <div style={styles.row}>
              <span style={styles.label}>Order ID:</span>{" "}
              {order.orderId || "---"}
            </div>

            <div style={styles.sectionTitle}>Order Summary</div>
            <div style={styles.row}>
              <span style={styles.label}>Date:</span> {order.date || "---"}
            </div>
            <div style={styles.row}>
              <span style={styles.label}>Time:</span> {order.time || "---"}
            </div>
            <div style={styles.row}>
              <span style={styles.label}>Items:</span>{" "}
              {order.items.length ? order.items.join(", ") : "---"}
            </div>
            <div style={styles.row}>
              <span style={styles.label}>Total:</span> ₹{order.total || "0.00"}
            </div>
            <div style={styles.row}>
              <span style={styles.label}>Status:</span> {order.status || "---"}
            </div>

            <div style={styles.sectionTitle}>Delivery Info</div>
            <div style={styles.row}>
              <span style={styles.label}>Address:</span>{" "}
              {order.deliveryAddress || "---"}
            </div>
            <div style={styles.row}>
              <span style={styles.label}>Payment:</span>{" "}
              {order.paymentMode || "---"}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MyOrders;
