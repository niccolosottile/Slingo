import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InHomeCSS from "../css/inhome.module.css";
import Navbar from "./navbar";

export default function InHome() {

  const name = localStorage.getItem("name");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('was_visited')){
      return;
    }
    localStorage.setItem('was_visited', 1)
    return(navigate("/tutorial"))

  })

  return (
    <div className={InHomeCSS.container}>
      <Navbar/>
      <div className={InHomeCSS.intro}>
        <h1 className={InHomeCSS.home}>Home</h1>
        <p className={InHomeCSS.greeting}>Hello, {name}</p>
      </div>
      <div className={InHomeCSS["navigation-buttons"]}>
        <button onClick={() => navigate("/learn")} className={InHomeCSS["translate-button"]}>Learn</button>
        <button onClick={() => navigate("/translate")} className={InHomeCSS["learn-button"]}>Translate</button>
      </div>
    </div>
  );
}