import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Search() {
  const [searchRestuarants, setSearchRestuarants] = useState("");
  const [restaurants, SetRestuarants] = useState([]);
  const [similarRestuarants, setSimilarRestuarants] = useState([]);
  const [geoLocation, setGeoLocation] = useState({});
  const navigate = useNavigate();
  const geo = useSelector((state) => {
    return state.geo;
  });
  //apis
  // const searchRestuarantsApi = `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${geo[0].lat}&lng=${geo[0].lng}&str=${searchRestuarants}&trackingId=d9f7c559-9fa7-c036-aeda-f47e8701d692&submitAction=ENTER&queryUniqueId=d5205c14-7d27-441d-e1cf-178d60ecbbe6`;
  useEffect(() => {
    SetRestuarants(null);
    // axios.get(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=17.4320096&lng=78.5426602&str=${searchRestuarants}&trackingId=d9f7c559-9fa7-c036-aeda-f47e8701d692&submitAction=ENTER&queryUniqueId=d5205c14-7d27-441d-e1cf-178d60ecbbe6`)
    axios
      .get(`https://swiggy-backend-gwfo.onrender.com/searchRestuarants`, {
        params: {
          lat: geo[0].lat,
          lng: geo[0].lng,
          SearchRestuarants: searchRestuarants,
        },
      })

      .then((res) => {
        // console.log(res?.data);
        if (
          res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT
            ?.cards
        ) {
          if (
            res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT
              ?.cards?.length == 2
          ) {
            SetRestuarants(
              res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT
                ?.cards[0]?.card?.card?.info
            );
          }
          setSimilarRestuarants(
            res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT
              ?.cards[1]?.card?.card?.restaurants
          );
        }
      });
  }, [searchRestuarants]);

  return (
    <>
      <div style={{ marginBottom: "200px" }}>
        <div className="search-div">
          <input
            value={searchRestuarants}
            onChange={(e) => {
              setSearchRestuarants(e.target.value);
            }}
            className="search-input"
            placeholder="Search for restuarants"
          ></input>
          {/* <button className=" search-button" >Restuarants</button> */}
          <button
            onClick={() => {
              navigate("/SearchDishes");
            }}
            className=" search-button"
          >
            Dishes
          </button>
          <div>
            {/* {console.log(restaurants)} */}
            <div className="search-result-div">
              {restaurants != null ? (
                <div
                  onClick={() => {
                    navigate(`/${restaurants?.name}/${restaurants?.id}`);
                  }}
                  className="card SearchRestuarants  "
                  style={{
                    width: "450px",
                    display: "flex",
                    flexDirection: "row",
                    fontSize: "14px",
                  }}
                >
                  <img
                    className=""
                    style={{ height: "200px" }}
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${restaurants?.cloudinaryImageId}`}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body" style={{}}>
                    <h5>{restaurants?.name}</h5>
                    <p>
                      <span
                        style={{
                          marginRight: "5px",
                          color: `${
                            restaurants?.avgRatingString >= 3.5
                              ? "green"
                              : "orange"
                          }`,
                        }}
                      >
                        <i className="fa-solid fa-star"></i>
                      </span>
                      <span style={{ marginRight: "5px" }}>
                        {restaurants?.avgRatingString}
                      </span>{" "}
                      <span style={{ marginRight: "05px" }}>
                        <i className="fa-solid fa-motorcycle"></i>
                      </span>
                      <span>{restaurants?.sla?.slaString}</span>
                    </p>
                    <p>{restaurants?.cuisines}</p>
                    <b style={{ margin: "0px", padding: "0px" }}>
                      {restaurants?.locality}
                    </b>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="">
            {similarRestuarants?.length > 0 ? (
              <h2>Similar Restuarants</h2>
            ) : (
              <p style={{ textAlign: "center", margin: "20px" }}>
                No restaurants found !! please search again
              </p>
            )}
            <div className="  similar-restaurants">
              {similarRestuarants?.length > 0 ? (
                similarRestuarants?.map((item, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        navigate(`/${item?.info?.name}/${item?.info?.id}`);
                      }}
                      className="card similar-restaurants-card  "
                    >
                      <img
                        className=""
                        style={{ height: "200px" }}
                        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item.info.cloudinaryImageId}`}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body" style={{}}>
                        <b>{item?.info?.name}</b>
                        <p>
                          <span
                            style={{
                              marginRight: "5px",
                              color: `${
                                item?.info?.avgRatingString >= 3.5
                                  ? "green"
                                  : "orange"
                              }`,
                            }}
                          >
                            <i className="fa-solid fa-star"></i>
                          </span>
                          <span style={{ marginRight: "5px" }}>
                            {item.info.avgRatingString}
                          </span>{" "}
                          <span style={{ marginRight: "05px" }}>
                            <i className="fa-solid fa-motorcycle"></i>
                          </span>
                          <span>{item.info.sla.slaString}</span>
                        </p>
                        <p>{item?.info?.cuisines?.slice(0, 3).join()}</p>
                        <b style={{ margin: "0px", padding: "0px" }}>
                          {item?.info?.locality}
                        </b>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p style={{ textAlign: "center", margin: "20px" }}></p>
              )}
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}
export default Search;
