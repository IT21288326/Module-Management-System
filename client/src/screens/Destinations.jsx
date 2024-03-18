import React from "react";
import './Destinations.css';

export default function Destinations() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h2 style={{color:"rgb(52, 4, 142)", paddingTop:"30px",paddingBottom:"30px"}}>Our Destinations</h2>
      

      <div style={{ position: "relative" ,padding:"40px"}}>
        <img
          style={{ height: "440px", width: "640px" }}
          src="/images/mal.jpg"
          alt="Your Image Alt Text"
          className="background-image"
        />
        <div className="card1" style={{ width: "300px", position: "absolute", top: 70, right: -150 }}>
          <div className="card-body">
            <p style={{ fontFamily: "monospace", color: "rgb(52, 4, 142)", fontWeight: "lighter", paddingLeft: "35px", paddingRight: "35px", paddingTop: "30px", textAlign: "left", fontSize: "20px" }}><i>Cinnamon Dhonveli Maldives</i></p>
            <p className="card-text" style={{ paddingLeft: "35px", paddingRight: "35px", paddingTop: "20px", paddingBottom: "35px", textAlign: "justify" }}>
              Feel an irrepressible wave of excitement as you have the best surfing experience, set to the backdrop of serenity, and pristine blue waters.
            </p>
            <div style={{ paddingLeft: "30px", paddingBottom: "90px" }}>
              <a href="#" className="blue-box-button">Go somewhere</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
