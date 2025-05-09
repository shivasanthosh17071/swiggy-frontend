import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "./reducer";
import { clearCart } from "./reducer";
import { useNavigate } from "react-router-dom";
import EmptyCart from "./emptyCart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cart() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => {
    return state.cartItems;
  });

  const dispatch = useDispatch();

  // total cart price
  const totalPrice = cartItems?.reduce((acc, item, i) => {
    return acc + item.Price;
  }, 0);

  return (
    <>
      <div className="container-fluid" style={{ marginBottom: "200px" }}>
        <div className="row">
          <div className="col-9">
            {" "}
            <div className="cart-top-bar">
              <b>
                CART ITEMS - {cartItems.length > 0 ? cartItems?.length : "0"}
              </b>
              <b> TO PAY - {totalPrice > 0 ? totalPrice : 0}</b>
              <b
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(clearCart());
                }}
              >
                <i className="bi bi-cart3"></i> CLEAR CART <hr />
              </b>
            </div>
            <div className=" row cart-wrapper">
              {cartItems?.length > 0 ? (
                cartItems?.map((item, i) => {
                  return (
                    <div
                      className="card col-6"
                      style={{
                        width: "450px",
                        margin: "10px",
                        height: "",
                        padding: "0px",
                      }}
                    >
                      <div className="row " style={{ height: "100%" }}>
                        <div className="col-md-6">
                          <img
                            src={item?.Image}
                            className="img-fluid rounded-start"
                            style={{
                              width: "100%",
                              height: "100%",
                              margin: "0px",
                            }}
                            alt="..."
                          />
                        </div>
                        <div className="col-md-6">
                          <div className="card-body">
                            <h5 className="card-title">{item?.Name}</h5>
                            {item?.Price ? (
                              <b>
                                <i className="bi bi-currency-rupee"></i>{" "}
                                {item?.Price} /-{" "}
                              </b>
                            ) : (
                              ""
                            )}
                            <p className="card-text">
                              <small className="text-body-secondary">
                                Last updated 1 mins ago
                              </small>
                            </p>
                            <button
                              onClick={() => {
                                toast(
                                  <>
                                    {" "}
                                    <b>
                                      ITEM REMOVED FROM CART
                                      <i className="bi bi-cart3"></i>{" "}
                                    </b>{" "}
                                  </>,
                                  {
                                    style: {
                                      color: "black",
                                      backgroundColor: "white",
                                    },
                                  }
                                );
                                dispatch(removeFromCart(i));
                              }}
                              type="button"
                              style={{ width: "120px", fontSize: "12px" }}
                              className="remove-from-cart-button"
                            >
                              REMOVE FROM CART
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <EmptyCart />
              )}
            </div>{" "}
          </div>
          {cartItems?.length > 0 ? (
            <div className="col-3 bill-wrapper">
              {" "}
              <div className="bill-in">
                {cartItems?.length > 0
                  ? cartItems.map((item, i) => {
                      return (
                        <div key={i}>
                          <div
                            style={{
                              width: "85%",
                              border: "0px solid gray",
                              margin: "2px",
                              display: "flex",
                            }}
                          >
                            <img
                              src={item.Image}
                              style={{
                                width: "60px",
                                height: "60px",
                                marginRight: "20px",
                              }}
                            />
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <div>
                                <b>{item?.Name}</b>
                                <p>{item?.Category}</p>
                              </div>
                              <div>
                                <b
                                  style={{ marginTop: "0px", display: "flex" }}
                                >
                                  <i className="bi bi-currency-rupee"></i>
                                  {item?.Price} <br />{" "}
                                </b>
                              </div>
                            </div>
                          </div>
                          <hr />
                        </div>
                      );
                    })
                  : ""}
              </div>
              <div
                className="final-bill"
                style={{
                  display: "flex",
                  width: "100%",
                  height: "30px",
                  backgroundColor: "white",
                  paddingTop: "8px",
                }}
              >
                <h6 style={{ marginRight: "80px", marginTop: "10px" }}>
                  TOTAL ITEMS : {cartItems?.length}{" "}
                </h6>
                <h6 style={{ marginRight: "", marginTop: "10px" }}>
                  TO PAY :{totalPrice}{" "}
                </h6>
              </div>
              <div style={{ marginTop: "20px", textAlign: "end" }}>
                <button
                  className="order-now-button"
                  style={{
                    backgroundColor: "#fc8019",
                    color: "white",
                    fontWeight: "700",
                    border: "none",
                    padding: "5px 10px",
                    margin: "5px",
                  }}
                >
                  {" "}
                  ORDER NOW
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <ToastContainer
        onClick={() => {
          navigate("/Cart");
        }}
        position="bottom-right"
        autoClose={1500}
      />
    </>
  );
}
export default Cart;
