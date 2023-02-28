import React from "react";
import InHomeCSS from "../css/inhome.module.css";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";

export default function InHome() {
  const navigate = useNavigate();
  return (
    <div className={InHomeCSS.container}>
      <Navbar/>
      <div className={InHomeCSS.intro}>
        <h1 className={InHomeCSS.home}>Home</h1>
        <p className={InHomeCSS.greeting}>Hello, Username</p>
      </div>
      <div className={InHomeCSS["navigation-buttons"]}>
        <button onClick={() => navigate("/quiz")} className={InHomeCSS["translate-button"]}>Learn</button>
        <button onClick={() => navigate("/translate")} className={InHomeCSS["learn-button"]}>Translate</button>
      </div>
    </div>
  );
}