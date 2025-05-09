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
  currentLocation,
  setCurrentLocation
}) {
  const dispatch = useDispatch();

  return (
    <>
      {/* <div className="location-input"> {yourLocation.slice(0,40)}..</div> */}
      <div className="location-div-in">
      <button style={{color:"gray",textAlign:"left"}} className="location-input" onClick={()=>{
            if (!navigator.geolocation) {
             // setLocation("Geolocation is not supported by your browser.");
             return;
           }
         
           navigator.geolocation.getCurrentPosition(
             (position) => {
               const { latitude, longitude } = position.coords;
              
              //  console.log(position)
               setCurrentLocation({lat: `${latitude}` , lng: `${longitude}`})
              //  console.log(currentLocation)
               
               dispatch(clearG());
                dispatch(setG(currentLocation));
           dispatch(deleteLoc());
           setYourLocation("area")
         
             },
             (error) => {
              //  console.log(error)
             }
           );
         
               }}>Auto detect my location</button>
        <input
          value={suggetions}
          onChange={(e) => {
            setSuggetions(e.target.value);
          }}
          className="location-input"
          placeholder="Search your city"
        ></input>
        {/*  */}
          
        {/*  */}
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
                        // console.log(res.data.data[0].geometry.location);
                        // setGeoLocation(res?.data?.data[0]?.geometry?.location)
                        // setLocations([])
                        // console.log(res?.data?.data[0]?.geometry?.location)
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
