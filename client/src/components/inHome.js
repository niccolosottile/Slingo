import React from "react";
import { useNavigate } from "react-router-dom";
import InHomeCSS from "../css/inhome.module.css";
import Navbar from "./navbar";

export default function InHome() {
  const name = localStorage.getItem("name");
  const navigate = useNavigate();

  return (
    <div className={InHomeCSS.container}>
      <Navbar/>
      <div className={InHomeCSS.intro}>
        <h1 className={InHomeCSS.home}>Home</h1>
        <p className={InHomeCSS.greeting}>Hello, {name}</p>
      </div>
      <div className={InHomeCSS["navigation-buttons"]}>
        <button onClick={() => navigate("/learn")} className={InHomeCSS["translate-button"]}>Learn</button>
        <button className={InHomeCSS["learn-button"]}>Translate</button>
      </div>
    </div>
  );
}