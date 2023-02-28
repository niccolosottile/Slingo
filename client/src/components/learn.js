import React from "react"
import learnCSS from "../css/learn.module.css"
import Navbar from "./navbar"
import { useNavigate } from "react-router-dom";

// import "react-step-progress-bar/styles.css";
// import { ProgressBar } from "react-step-progress-bar";


export default function Learn() {

    const navigate = useNavigate();
    
    return (
    <div className={learnCSS.container}>
        <Navbar/>
        <div className={learnCSS.title}>
            <h1 className={learnCSS["learn-title"]}>Learn</h1>
            <p className={learnCSS["learn-text"]}>What do you want to learn today?</p>
            {/* <div className="progress-bar">
            <ProgressBar 
            width={600}
            text="20% Progress"
            percent={20} 
            filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"/>
            </div> */}
        </div>
        <div className={learnCSS["navigation-buttons"]}>
            <button onClick={() => navigate("/quiz")} className={learnCSS["greeting-button"]}>Greetings</button>
            <button onClick={() => navigate("/quiz2")} className={learnCSS["family-button"]}>Family</button>
            <button className={learnCSS["alphabet-button"]}>Alphabet</button>
            <button className={learnCSS["adj-button"]}>Adjectives</button>
            <button className={learnCSS["noun-button"]}>Nouns</button>
            <button className={learnCSS["verb-button"]}>Verbs</button>
      </div>
    </div>
    )
}