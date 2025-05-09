import React from "react";
import "./App.css";

function LocationError() {
  return (
    <>
      <div
        style={{
          textAlign: "center",
          width: "300px",
          margin: "10px 200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: "15px",
          fontWeight: "400",
          letterSpacing: "0.5px",
        }}
      >
        <img
          style={{ width: "80%" }}
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png"
        />
        <b>Location Unserviceable</b>
        <p>
          We don’t have any services here till now.
          <br /> Try changing location.
        </p>
      </div>
    </>
  );
}
export default LocationError;
