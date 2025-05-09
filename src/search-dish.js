import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "./reducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
function SearchDish() {
  const [searchDish, setSearchDish] = useState("");
  const [RestDish, setRestDish] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const geo = useSelector((state) => {
    return state.geo;
  });
  //    console.log(geo[0].lat)
  // const DishApi = `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${geo[0].lat}&lng=${geo[0].lng}&str=${searchDish}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=652e40c2-c091-d5e2-1a71-b8470cdbd857&`;
  useEffect(() => {
    // axios.get(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=17.4320096&lng=78.5426602&str=${searchDish}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=652e40c2-c091-d5e2-1a71-b8470cdbd857&`)
    axios
      .get(`https://swiggy-backend-gwfo.onrender.com/searchDish`, {
        params: { lat: geo[0].lat, lng: geo[0].lng, SearchDish: searchDish },
      })
      .then((res) => {
        // console.log(res)
        if (res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH) {
          setRestDish(
            res.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH.cards.splice(
              1
            )
          );
        }
      });
  }, [searchDish]);

  return (
    <>
      {" "}
      <div className="dish-div" style={{ marginBottom: "200px" }}>
        <input
          value={searchDish}
          onChange={(e) => {
            setSearchDish(e.target.value);
          }}
          className="search-input"
          placeholder="Search for Dish"
        ></input>

        <NavLink to={"/SearchRestuarants"}>
          <button className=" search-button">Restuarants</button>
        </NavLink>
        {/* <button className=" search-button">Dishes</button> */}
        <br />
        <br />

        <div className="pp">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {RestDish.map((item, i) => {
              // console.log(item)

              return (
                <div
                  style={{ width: "32%" }}
                  className="card dish-card container-fluid"
                  key={i}
                >
                  <div className="row">
                    <div className="col-10">
                      {" "}
                      <h5 className="card-title">
                        {item?.card?.card?.restaurant?.info?.name}
                      </h5>
                      <p className="small-top">
                        <span
                          style={{
                            marginRight: "5px",
                            color: `${
                              item.card?.card?.info?.ratings?.aggregatedRating
                                ?.rating >= 3.5
                                ? "green"
                                : "orange"
                            }`,
                          }}
                        >
                          <i className="fa-solid fa-star"></i>
                        </span>
                        <span style={{ marginRight: "5px" }}>
                          {
                            item.card?.card?.info?.ratings?.aggregatedRating
                              ?.rating
                          }
                        </span>
                        <span>
                          {
                            item.card?.card?.info?.ratings?.aggregatedRating
                              ?.ratingCount
                          }
                        </span>
                        <span style={{ marginLeft: "5px" }}>
                          {" "}
                          <i className="fa-solid fa-motorcycle"></i>
                          <span>
                            {item?.card?.card?.restaurant?.info?.sla?.slaString}
                          </span>
                        </span>
                      </p>
                    </div>
                    <div className="col-2">
                      <span
                        onClick={() => {
                          navigate(
                            `/${item?.card?.card?.restaurant?.info?.name}/${item?.card?.card?.restaurant?.info?.id}`
                          );
                        }}
                        style={{ margin: " 15px" }}
                      >
                        <i className="bi bi-arrow-right"></i>{" "}
                      </span>{" "}
                    </div>

                    <hr />
                    <div className="card-body  col-7 dish-body-left ">
                      <p className="card-text"></p>
                      <p className="">{item?.card?.card?.info?.name}</p>
                      <b className="">
                        <i className="bi bi-currency-rupee"></i>
                        {item.card.card.info.price / 100}
                      </b>

                      <p>
                        {" "}
                        {item.card.card.info.isVeg ? (
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
                      <b> {item?.card?.card?.restaurant?.info?.areaName}</b>
                    </div>
                    <div className="card-body col-5 dish-body-right ">
                      <img
                        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item?.card?.card?.info?.imageId}`}
                        alt="Food image not available "
                        className="card-img "
                      />
                      <button
                        onClick={() => {
                          toast(
                            <>
                              <span style={{ marginRight: "50px" }}>
                                1 item added
                              </span>{" "}
                              <b>
                                VIEW CART <i className="bi bi-cart3"></i>
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
                              Name: item?.card?.card?.info?.name,
                              Price: item.card.card.info.price / 100,
                              Image: `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item?.card?.card?.info?.imageId}`,
                            })
                          );
                        }}
                        style={{ marginTop: "20px", marginLeft: "10px" }}
                        type="button"
                        className="add-to-cart-button"
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <ToastContainer
          onClick={() => {
            navigate("/Cart");
          }}
          position="bottom-right"
          autoClose={1500}
        />
      </div>
    </>
  );
}
export default SearchDish;
