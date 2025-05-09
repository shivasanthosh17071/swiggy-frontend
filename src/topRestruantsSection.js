import React, { useState, useEffect } from "react";
import "./App.css";
import Shimmer from "./shimmer";
import { useNavigate } from "react-router-dom";

function TopRestaurantsSection({ topRestaurants, yourLocation }) {
  const [searchTopRestaruants, setSearchTopRestaruants] = useState("");
  const [filteredTopRestaruants, setFilteredTopRestaruants] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    let copyTopRestaurants = [...topRestaurants];
    let filteredResult = copyTopRestaurants?.filter((item, i) => {
      if (
        item?.info?.name
          ?.toLowerCase()
          .includes(searchTopRestaruants?.toLowerCase()) == true
      ) {
        return true;
      }
    });
    setFilteredTopRestaruants(filteredResult);
  }, [searchTopRestaruants]);

  function sortRestaurants(category) {
    let copyTopRestaurants = [...topRestaurants];
    let filteredResult = null;
    if (category == "highToLow") {
      filteredResult = copyTopRestaurants?.sort((a, b) => {
        return b.info?.avgRating - a.info?.avgRating;
      });
    } else if (category == "fastDelivery") {
      filteredResult = copyTopRestaurants.sort((a, b) => {
        return a.info?.sla?.deliveryTime - b.info?.sla?.deliveryTime;
      });
    }
    setFilteredTopRestaruants(filteredResult);
  }

  return (
    <>
      <h2
        style={{ fontSize: "25px", fontWeight: "700 ", wordSpacing: "0.5px" }}
      >
        {" "}
        Restaurants with online food delivery in {yourLocation.slice(0, 10)}..
      </h2>
      <div className="top-restaurants-filter-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Search top rated restaurants"
          aria-label="default input example"
          value={searchTopRestaruants}
          onChange={(e) => {
            setSearchTopRestaruants(e.target.value);
          }}
          style={{ width: "300px", margin: "0px 5px" }}
        />
        <button
          type="button"
          className="  filter-button"
          onClick={() => {
            sortRestaurants("highToLow");
          }}
        >
          Rating top
        </button>
        <button
          type="button"
          className=" filter-button"
          onClick={() => {
            sortRestaurants("fastDelivery");
          }}
        >
          Fast Delivery
        </button>
      </div>

      <div className="  row top-restaurants-wrapper">
        {topRestaurants == "" ? <Shimmer /> : ""}
        {filteredTopRestaruants?.length == 0 && searchTopRestaruants == ""
          ? topRestaurants?.map((item, i) => {
              // console.log(item.info.name)
              return <Card item={item} key={i} />;
            })
          : filteredTopRestaruants?.map((item, i) => {
              // console.log(item.info.name)
              return <Card item={item} key={i} />;
            })}
        {searchTopRestaruants != "" && filteredTopRestaruants?.length == 0 ? (
          <p>Sorry : ) We Cannot find any Top Restaurants with this Name</p>
        ) : (
          ""
        )}
      </div>
    </>
  );
  function Card({ item }) {
    return (
      <div
        onClick={() => {
          navigate(`/${item?.info?.name}/${item?.info?.id}`);
        }}
        className="card top-restaurants-card  "
        style={{ width: "230px" }}
      >
        <img
          className=""
          style={{ height: "200px" }}
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item?.info?.cloudinaryImageId}`}
          className="card-img-top"
          alt="..."
        />
        <div className=" card-body card-body2" style={{}}>
          <h5>{item?.info?.name}</h5>
          <p>
            <span
              style={{
                marginRight: "5px",
                color: `${
                  item?.info?.avgRatingString >= 3.5 ? "green" : "orange"
                }`,
              }}
            >
              <i className="fa-solid fa-star"></i>
            </span>
            <span style={{ marginRight: "5px" }}>
              {item?.info?.avgRatingString}
            </span>{" "}
            <span style={{ marginRight: "5px" }}>
              <i className="fa-solid fa-motorcycle"></i>
            </span>
            <span>{item?.info?.sla?.slaString}</span>
          </p>
          <p>{item?.info?.cuisines?.slice(0, 2).join()}</p>
          <b style={{ letterSpacing: "0.5px", fontWeight: "500px" }}>
            {item?.info?.locality}
          </b>
        </div>
      </div>
    );
  }
}
<h2> </h2>;

export default TopRestaurantsSection;
