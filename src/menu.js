import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "./reducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Menu() {
  const [menu, setMenu] = useState([]);
  const params = useParams();
  // console.log(params)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [restaurantName, setRestuarantName] = useState("");

  //api
  // const MenuApi = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.37240&lng=78.43780&restaurantId=${params.restId}&catalog_qa=undefined&submitAction=ENTER`;

  useEffect(() => {
    axios
      .get(`https://swiggy-backend-gwfo.onrender.com/menu`, {
        params: { restId: params.restId },
      })
      .then((res) => {
        console.log(res.data);
        setMenu(
          res?.data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.slice(
            1
          )
        );
      });
  }, []);
  return (
    <>
      <div className="menu-page" style={{ marginBottom: "200px" }}>
        <div className="menu-header">
          <b> {params?.restName?.toUpperCase()}(Menu)</b>
        </div>

        <div className="accordion" id="accordionExample">
          {menu?.map((item, i) => {
            return item?.card?.card?.itemCards ? (
              <div className="accordion-item" key={i}>
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed "
                    style={{ backgroundColor: "white" }}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${i}`}
                    aria-expanded="false"
                    aria-controls={`collapse${i}`}
                  >
                    <b> {item?.card?.card?.title}</b>
                  </button>
                </h2>
                <div
                  id={`collapse${i}`}
                  className="accordion-collapse collapse "
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <div className="accordion-body">
                      {/* <p> here shows food items</p> */}
                      <div className="row row-cols-1 row-cols-md-4 g-4">
                        {item?.card?.card?.itemCards
                          ? item?.card?.card?.itemCards?.map((item, i) => {
                              // console.log(item)
                              return item?.card?.info?.imageId &&
                                item?.card?.info?.price ? (
                                <div className="card menu-card" key={i}>
                                  <img
                                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.card.info.imageId}`}
                                    className="card-img-top menu-img"
                                    alt="..."
                                  />

                                  <div className="card-body">
                                    <b className="card-title">
                                      {item?.card?.info?.name}
                                    </b>
                                    <p style={{ marginBottom: "0px" }}>
                                      {" "}
                                      {item?.card?.info?.isVeg ? (
                                        <p>
                                          {" "}
                                          <div
                                            style={{
                                              width: "10px",
                                              height: "10px",
                                              borderRadius: "20px",
                                              backgroundColor: "green",
                                              color: "green",
                                              display: "inline-block",
                                            }}
                                          >
                                            {" "}
                                          </div>{" "}
                                          Veg
                                        </p>
                                      ) : (
                                        <p>
                                          {" "}
                                          <div
                                            style={{
                                              width: "10px",
                                              height: "10px",
                                              borderRadius: "20px",
                                              backgroundColor: "red",
                                              color: "red",
                                              display: "inline-block",
                                            }}
                                          >
                                            {" "}
                                          </div>{" "}
                                          NonVeg
                                        </p>
                                      )}{" "}
                                    </p>
                                    {item?.card?.info?.price ? (
                                      <h6>
                                        <i className="bi bi-currency-rupee"></i>{" "}
                                        {item?.card?.info?.price / 100} /-{" "}
                                      </h6>
                                    ) : (
                                      ""
                                    )}
                                    <p className="card-text">
                                      <span
                                        style={{
                                          marginRight: "5px",
                                          color: `${
                                            item?.card?.info?.ratings
                                              ?.aggregatedRating.rating
                                              ? "green"
                                              : "white"
                                          }`,
                                        }}
                                      >
                                        <i className="fa-solid fa-star"></i>
                                      </span>
                                      {
                                        item.card.info.ratings.aggregatedRating
                                          .rating
                                      }{" "}
                                      <span style={{ marginLeft: "5px" }}>
                                        {
                                          item.card.info.ratings
                                            .aggregatedRating.ratingCount
                                        }{" "}
                                      </span>
                                    </p>

                                    <button
                                      onClick={() => {
                                        toast(
                                          <>
                                            <span
                                              style={{ marginRight: "50px" }}
                                            >
                                              1 item added
                                            </span>{" "}
                                            <b>
                                              {" "}
                                              VIEW CART{" "}
                                              <i className="bi bi-cart3"></i>
                                            </b>{" "}
                                          </>,
                                          {
                                            style: {
                                              color: "black",
                                              backgroundColor: "white",
                                            },
                                          }
                                        );
                                        dispatch(
                                          addToCart({
                                            Name: item?.card?.info?.name,
                                            Price:
                                              item?.card?.info?.price / 100,
                                            Category:
                                              item?.card?.info?.category,
                                            Image: `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.card.info.imageId}`,
                                          })
                                        );
                                      }}
                                      style={{ marginTop: "", marginLeft: "" }}
                                      type="button"
                                      className="add-to-cart-button"
                                    >
                                      ADD TO CART
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                ""
                              );
                            })
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            );
          })}

          <ToastContainer
            onClick={() => {
              navigate("/Cart");
            }}
            position="bottom-right"
            autoClose={1500}
          />
        </div>
      </div>{" "}
    </>
  );
}
export default Menu;
