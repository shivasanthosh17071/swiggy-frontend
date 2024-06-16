import React from "react";
import axios from "axios";
import './App.css'
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import Shimmer from "./shimmer";
import LocationData from "./locationData";
import TopRestaurants from "./topRestruantsSection";
import Loader from "./loader";
import LocationError from "./locationnotfound";
import Footer from "./footer";
import { useSelector } from "react-redux";
function Home (){

const [topRestaurants,setTopRestaurants]=useState([])
const [suggetions,setSuggetions]=useState("")
const [locations,setLocations]=useState([])
// const [geoLocation,setGeoLocation]=useState({ lat : "17.4357403", lng : "78.4401809"})
const [forYou,setForYou]=useState([])
const [yourLocation,setYourLocation]=useState("hyderabad")
const navigate = useNavigate()
const geo =useSelector((state)=>{
  return state.geo
 })
// apis
//top rest


useEffect(()=>{
  axios.get(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${geo[0].lat}&lng=${geo[0].lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
.then((res)=>{
  
  // console.log(res.data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants)
 if(res?.data?.data?.cards[1]?.card?.card?.gridElements){
  setTopRestaurants(res?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
 setForYou(res?.data?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info)
}})
.catch((err)=>{
  return err
})
},[geo])

useEffect(()=>{
  axios.get(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=${suggetions}&types=`)
.then((res)=>{
// console.log(res.data.data)
if(res.data.data){
setLocations(res?.data?.data)}
})
},[suggetions])

useEffect(()=>{
axios.get(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${geo[0].lat}&lng=${geo[0].lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
.then((res)=>{
  // console.log(res)
})
},[])

  return(
   <> 
  {/* <div style={{display:"none"}}><Header yourLocation={yourLocation}/></div> */}
<div className="container-fluid top-restaurants">

  {forYou.length <= 0 ? <Loader/>:""}
<div className="row">
 <div className="col-2 left-wrapper">
  

{/* offcanvas */}

<button style={{backgroundColor:"white",color:"black",padding:"0px 10px",border: "2px solid white",borderRadius:"20px",boxShadow:"1px 1px 5px gray"}} data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
  Location <i className="bi bi-chevron-compact-down"></i>
</button>

<div className="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div className="offcanvas-header">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqpHDFHQXYclFyO5rYKUOYQmPT8OrWucjftg&s" style={{width:"40%"}}/>
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
    
   <LocationData 
     suggetions={suggetions}
     setSuggetions={ setSuggetions}
     locations={ locations}
     setLocations ={setLocations}
     topRestaurants={ topRestaurants }
     setTopRestaurants={setTopRestaurants}
    //  setGeoLocation={setGeoLocation}
    //  geoLocation={geoLocation}
     yourLocation= {yourLocation}
     setYourLocation ={setYourLocation}
      />
  </div>
</div>



 </div>




 {/* wall */}

 <div className="col-10 right-wrapper">
 <h2 style={{fontSize:"25px",fontWeight:"700 ",wordSpacing:"0.5px"}}>What's on your mind?</h2>
 
 <div className=" fav-restaurants">
  {forYou.map((item,i)=>{
    // console.log(item)
    return  <div className="ss" key={i}
    onClick={()=>{
      navigate(`/Open/${item.action?.text}/${item.entityId.slice(36,41)    }`)
    }}> 
    <img className="ss-img" src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item?.imageId}` }alt="img" /> 
    </div>
    
  })}
  </div>
  <hr style={{width:"90%",margin:"30px 0px"}}/>



  <h2 style={{fontSize:"25px",fontWeight:"700 ",wordSpacing:"0.5px"}}>Top restaurant chains in {yourLocation?.slice(0,40)}</h2>
  <div className=" fav-restaurants1">
  
  {topRestaurants.length > 0 ?  topRestaurants.map((item,i)=>{
    // console.log(item)
    return  <div className="ss1 card" key={i}
    onClick={()=>{
      navigate(`/${item?.info?.name}/${item?.info?.id}`)
    }} >
    <img  style={{width:"100%" ,height:"160px", borderRadius:"20px"}} src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item?.info?.cloudinaryImageId}`}  className="card" alt="..."/>
    <div className="card-body1">
    <h6>{item.info.name}</h6>
    <p style={{color : "#333435"}}><span style={{marginRight:"5px", color: `${item?.info?.avgRatingString >= 3.5 ?"green":"orange" }`}}><i className="fa-solid fa-star"></i></span><span style={{marginRight:"5px"}}>{item?.info?.avgRatingString}</span> <span style={{marginRight:"05px"}}><i className="fa-solid fa-motorcycle"></i></span><span>{item?.info?.sla?.slaString}</span></p>
    <p>{item?.info?.cuisines.slice(0,3).join()}</p>
    <b style={{margin : "0px",padding:"0px"}}>{item?.info?.locality}</b>
    </div>
  </div>
    
  }) :<Shimmer/> 
}
 

  </div><hr style={{width:"90%",margin:"30px 0px"}}/>



<TopRestaurants topRestaurants={topRestaurants} yourLocation={yourLocation}/>
 

<div className="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div className="offcanvas-header">
    {/* <h5 className="offcanvas-title" id="offcanvasExampleLabel">YourLocation</h5> */}
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqpHDFHQXYclFyO5rYKUOYQmPT8OrWucjftg&s" style={{width:"40%"}}/> <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    
  </div>
  <div className="offcanvas-body">
  <LocationData/>
   
  </div>
</div>



</div>
 </div>
 </div>
 <Footer/>
 </>)
}

export default Home
// img src   https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/