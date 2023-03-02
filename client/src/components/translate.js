import React, { useRef, useState, useEffect } from "react";
import Navbar from "./navbar";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";

// Import drawing utility here
import { drawRectTranslate } from "./utilities";

import TranslateCSS from "../css/translate.module.css";

function Translate() {
	const webcamRef = useRef(null);
	const canvasRef = useRef(null);
	const [translatedSign, setTranslatedSign] = useState(""); // state variable to store translated sign
  	const [translatedString, setTranslatedString] = useState(""); // state variable to store translated string


  	// concat translated sign to translated string when translatedSign is changed delay 1.5 seconds
	useEffect(() => {
		const timer = setTimeout(() => {
			setTranslatedString(translatedString + " " + translatedSign);
		}, 1500);
		return () => clearTimeout(timer);
	}, [translatedSign]);


	// clear translated string when button clicked, ignoring the interval
	const clearTranslatedString = () => {
		setTranslatedString("");
	};

	// Main function
	const runCoco = async () => {
		// Loading the graph model
		const net = await tf.loadGraphModel(
			"https://raw.githubusercontent.com/dp846/SlingoModels/main/model.json"
		); 

		// Detect every 16.7 ms
		setInterval(() => {
			detect(net);
		}, 16.7);
	};

	const detect = async (net) => {
		// Check data is available
		if (
			typeof webcamRef.current !== "undefined" &&
			webcamRef.current !== null &&
			webcamRef.current.video.readyState === 4
		) {
			// Get video properties
			const video = webcamRef.current.video;
			const videoWidth = webcamRef.current.video.videoWidth;
			const videoHeight = webcamRef.current.video.videoHeight;

			// Set video width
			webcamRef.current.video.width = videoWidth;
			webcamRef.current.video.height = videoHeight;

			// Set canvas height and width
			canvasRef.current.width = videoWidth;
			canvasRef.current.height = videoHeight;

			// Make Detections
			const img = tf.browser.fromPixels(video);
			const resized = tf.image.resizeBilinear(img, [640, 480]);
			const casted = resized.cast("int32");
			const expanded = casted.expandDims(0);
			const obj = await net.executeAsync(expanded);

			const boxes = await obj[2].array();
			const classes = await obj[4].array();
			const scores = await obj[7].array();

			// Draw mesh
			const ctx = canvasRef.current.getContext("2d");

			// Update drawing utility
			requestAnimationFrame(() => {
				drawRectTranslate(
					boxes[0],
					classes[0],
					scores[0],
					0.65,
					videoWidth,
					videoHeight,
					ctx,
          			setTranslatedSign,
				);
			});

			tf.dispose(img);
			tf.dispose(resized);
			tf.dispose(casted);
			tf.dispose(expanded);
			tf.dispose(obj);
		}
	};

	useEffect(() => {
		runCoco();
	}, []);

	return (
		<div className={TranslateCSS.container}>
			<Navbar />
			<div className={TranslateCSS["results-container"]}>
				<div className={TranslateCSS["results-container-content"]}>
					<div className={TranslateCSS["clear-output-container"]}>
						<button
							className={TranslateCSS["clear-output-button"]}
							onClick={() => clearTranslatedString()}
						>
							Clear output
						</button>
					</div>
					<p className={TranslateCSS.results}>{translatedString}</p>
				</div>
			</div>
			<div className={TranslateCSS["camera-view"]}>
				<div className={TranslateCSS.webcam}>
					<Webcam
						ref={webcamRef}
						muted={true}
					/>

					<canvas
						ref={canvasRef}
						style={{
							position: "absolute",
							marginLeft: "auto",
							marginRight: "auto",
							left: 0,
							right: 0,
							textAlign: "center",
							zindex: 8,
							width: 640,
							height: 480,
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default Translate;
