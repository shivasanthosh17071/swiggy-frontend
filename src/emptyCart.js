import React from "react";
import { useNavigate } from "react-router-dom";

function EmptyCart(){
    const navigate = useNavigate()
    return(
        <>
        <div className=" empty-cart-wrapper">
             <img style={{width:"250px"}} src="https://i.pinimg.com/736x/cf/b2/0a/cfb20aa6ad4b7ff865554e917ab7e1fc.jpg"/>
        <p style={{fontSize:"13px"}}>Your cart is empty</p>
        <p style={{fontSize:"14px"}}>You can go to home page to view more restaurants</p>
        <button 
        onClick={()=>{
            navigate(`/`)
        }}
        style={{fontSize:"14px",color:"white", backgroundColor:"#fc8019", padding: "5px 10px",fontWeight:"600" , border:"none"}}>SEE RESTAURANTS NEAR YOU</button>
        </div>
       
        </>
    )
}
export default EmptyCart