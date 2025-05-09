import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Shimmer from "./shimmer";
import Footer from "./footer";
import { useSelector } from "react-redux";
function FoodRestaurant() {
  const params1 = useParams();
  const navigate = useNavigate();
  const [foodRestaurants, setFoodRestaurants] = useState([]);
  const [header, setHeader] = useState({});
  const geo = useSelector((state) => {
    return state.geo;
  });
  // .get(
  // `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${geo[0].lat}&lng=${geo[0].lng}&collection=${params1.id}&tags=layout_${params1.foodName}_Contextual&sortBy=&filters=&type=rcv2&offset=0&page_type=null`
  // )
  useEffect(() => {
    axios
      .get(`https://swiggy-backend-gwfo.onrender.com/moreRestaurants`, {
        params: {
          lat: geo[0].lat,
          lng: geo[0].lng,
          paramsId: params1.id,
          foodName: params1.foodName,
        },
      })

      .then((res) => {
        // console.log(typeof res?.data?.data?.cards[0]);
        setFoodRestaurants(res?.data?.data?.cards?.slice(3));
        setHeader(res?.data?.data?.cards[0]?.card?.card);
        // console.log(header)
      });
  }, []);

  return (
    <>
      <div className="Food-restaurants-div ">
        <div
          className="food-header"
          style={{
            backgroundColor: "white",
            position: "sticky",
            top: "70px",
            zIndex: "2",
          }}
        >
          <h2
            style={{
              fontSize: "35px",
              fontWeight: "700 ",
              wordSpacing: "0.5px",
            }}
          >
            {header?.title}
          </h2>
          <p style={{ fontSize: "20px" }}>{header?.description}</p>
          <hr />
          {/* <h2 style={{fontSize:"25px",fontWeight:"700 ",wordSpacing:"0.5px"}}>{header?.count} to explore</h2> */}
        </div>
        {/* {console.log(header)} */}

        <div className=" Food-restaurants  ">
          {foodRestaurants.length > 0 ? (
            foodRestaurants?.map((item, i) => {
              return (
                <div
                  className="card Food-restaurants-card "
                  key={i}
                  onClick={() => {
                    navigate(
                      `/${item?.card?.card?.info?.name}/${item?.card?.card?.info?.id}`
                    );
                  }}
                >
                  <img
                    style={{ height: "180px", width: "75%" }}
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item?.card?.card?.info?.cloudinaryImageId}`}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h6 className="card-title">
                      {item?.card?.card?.info?.name.slice(0,20)}
                    </h6>
                    <b className="card-text">
                      {" "}
                      Offer : {item?.card?.card?.info?.costForTwo}
                    </b>
                    <p>{item?.card?.card?.info?.locality}</p>
                    <p style={{ marginTop: "-8px" }}>
                      <span
                        style={{
                          marginRight: "5px",
                          color: `${
                            item?.card?.card?.info?.avgRatingString >= 3.5
                              ? "green"
                              : "orange"
                          }`,
                        }}
                      >
                        <i className="fa-solid fa-star"></i>
                      </span>
                      <span style={{ marginRight: "5px" }}>
                        {item?.card?.card?.info?.avgRatingString}
                      </span>{" "}
                      <span style={{ marginRight: "05px" }}>
                        <i className="fa-solid fa-motorcycle"></i>
                      </span>
                      <span>{item?.card?.card?.info?.sla?.slaString}</span>
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <Shimmer />
          )}
        </div>
      </div>
    </>
  );
}
export default FoodRestaurant;
