import React from "react";
import InHomeCSS from "../css/inhome.module.css";
import Navbar from "./navbar";

export default function InHome() {
  const name = localStorage.getItem("name");

  return (
    <div className={InHomeCSS.container}>
      <Navbar/>
      <div className={InHomeCSS.intro}>
        <h1 className={InHomeCSS.home}>Home</h1>
        <p className={InHomeCSS.greeting}>Hello, {name}</p>
      </div>
      <div className={InHomeCSS["navigation-buttons"]}>
        <button className={InHomeCSS["translate-button"]}>Learn</button>
        <button className={InHomeCSS["learn-button"]}>Translate</button>
      </div>
    </div>
  );
}