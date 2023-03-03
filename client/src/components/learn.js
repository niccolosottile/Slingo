import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
import Navbar from "./navbar";
import axios from "axios";

import learnCSS from "../css/learn.module.css"

export default function Learn() {

    const navigate = useNavigate();

    const [progress, setProgress] = useState(0);
    const userId = localStorage.getItem("userid");

    useEffect(() => {
        const retrieveProgress = async () => {
            try {
                const url = `http://localhost:8080/api/progress/${userId}`;
                const { data: res } = await axios.get(url);
                setProgress(res.overallProgress);
            } catch (error) {
                console.log(error);
            }
        };
        retrieveProgress();
    }, []);
    
    return (
    <div className={learnCSS.container}>
        <Navbar/>
        <div className={learnCSS.title}>
            <h1 className={learnCSS["learn-title"]}>Learn</h1>
            <p className={learnCSS["learn-text"]}>What do you want to learn today?</p>
            {<div className="progress-bar">
            <ProgressBar 
            width={600}
            text={`${progress}% Progress`}
            percent={progress} 
            filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"/>
            </div>}
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