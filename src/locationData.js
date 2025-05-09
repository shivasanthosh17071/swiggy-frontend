import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addLoc, clearG, deleteLoc, setG } from "./reducer";
function LocationData({
  suggetions,
  setSuggetions,
  locations,
  setTopRestaurants,
  setGeoLocation,
  setLocations,
  yourLocation,
  setYourLocation,
}) {
  const dispatch = useDispatch();

  return (
    <>
      {/* <div className="location-input"> {yourLocation.slice(0,40)}..</div> */}
      <div className="location-div-in">
        <input
          value={suggetions}
          onChange={(e) => {
            setSuggetions(e.target.value);
          }}
          className="location-input"
          placeholder="Search your city"
        ></input>

        {suggetions != "" && suggetions?.length >= 3
          ? locations?.map((item, i) => {
              // console.log(item.description)
              return (
                <div
                  className="location-result locations"
                  key={i}
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                  onClick={() => {
                    setTopRestaurants([]); // https://www.swiggy.com/dapi/misc/address-recommend?place_id=${item?.place_id}
                    axios
                      .get(
                        `
                       https://swiggy-backend-gwfo.onrender.com/${item?.place_id}/placeId
                        `
                      )
                      .then((res) => {
                        console.log(res.data.data[0].geometry.location);
                        // setGeoLocation(res?.data?.data[0]?.geometry?.location)
                        // setLocations([])
                        setSuggetions("");
                        setYourLocation(item?.description);
                        dispatch(deleteLoc());
                        dispatch(addLoc({ Name: item?.description }));
                        dispatch(clearG());
                        dispatch(setG(res?.data?.data[0]?.geometry?.location));
                      });
                  }}
                >
                  {" "}
                  <i className="bi bi-geo-alt"></i> {item?.description}..{" "}
                </div>
              );
            })
          : ""}
      </div>
    </>
  );
}
export default LocationData;
