import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./header";
import Home from "./home";
import Menu from "./menu";
import LocationData from "./locationData";
import TopRestaurants from "./topRestruantsSection";
import SearchDish from "./search-dish";
import Search from "./search";
import Cart from "./cart";
import FoodRestaurant from "./more-restaurants";
import MyOrders from "./my-orders";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:restName/:restId" element={<Menu />} />
          <Route path="/SearchRestuarants" element={<Search />} />
          <Route path="/SearchDishes" element={<SearchDish />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path={"/Open/:foodName/:id"} element={<FoodRestaurant />} />
          <Route path="/MyOrders" element={<MyOrders />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
// img src   https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/
