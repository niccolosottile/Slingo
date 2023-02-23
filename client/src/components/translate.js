import React, { useState, useRef } from "react";
import TranslateCSS from "../css/translate.module.css";
import Navbar from "./navbar";
import Webcam from "react-webcam";

export default function Translate() {
  return (
    <div className={TranslateCSS.container}>
      <Navbar />
      <div className={TranslateCSS["results-container"]}>
        <div className={TranslateCSS["results-container-content"]}>
          <div className={TranslateCSS["clear-output-container"]}>
            <button className={TranslateCSS["clear-output-button"]}>
              Clear output
            </button>
          </div>
          <p className={TranslateCSS.results}>"Translation result here"</p>
        </div>
      </div>
      <div className={TranslateCSS["camera-view"]}>
        <div className={TranslateCSS.webcam}>
          <Webcam mirrored={true} />
        </div>
      </div>
    </div>
  );
}