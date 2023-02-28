import Navbar from "./navbar";
import Webcam from "react-webcam";
import React, { useRef, useState, useEffect } from "react";
// import { nextFrame } from "@tensorflow/tfjs";
import * as tf from "@tensorflow/tfjs";
// 2. TODO - Import drawing utility here
import { drawRectTranslate } from "./utilities";
import TranslatePageCSS from "../css/translate.module.css";
import { useTranslatedSign } from "./translationUtils";

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
		// 3. TODO - Load network
		const net = await tf.loadGraphModel(
			"https://raw.githubusercontent.com/dp846/SlingoModels/main/model.json"
		); //Loads the model


		// await net.load(
		// 	"https://raw.githubusercontent.com/dp846/SlingoModels/main/group1-shard.bin"
		// ); //Loads the weights, not needed I think

		// Loop and detect hands
		setInterval(() => {
			detect(net);
		}, 16.7);
	};

	const detect = async net => {
		// Check data is available
		if (
			typeof webcamRef.current !== "undefined" &&
			webcamRef.current !== null &&
			webcamRef.current.video.readyState === 4
		) {
			// Get Video Properties
			const video = webcamRef.current.video;
			const videoWidth = webcamRef.current.video.videoWidth;
			const videoHeight = webcamRef.current.video.videoHeight;

			// Set video width
			webcamRef.current.video.width = videoWidth;
			webcamRef.current.video.height = videoHeight;

			// Set canvas height and width
			canvasRef.current.width = videoWidth;
			canvasRef.current.height = videoHeight;

			// 4. TODO - Make Detections
			const img = tf.browser.fromPixels(video);
			const resized = tf.image.resizeBilinear(img, [640, 480]);
			const casted = resized.cast("int32");
			const expanded = casted.expandDims(0);
			const obj = await net.executeAsync(expanded);



			//model indexes for greetings model
			// const boxes = await obj[2].array();
			// const classes = await obj[4].array();
			// const scores = await obj[7].array();

			//model indexes for family model
			const boxes = await obj[3].array();
			const classes = await obj[7].array();
			const scores = await obj[4].array();



			// Draw mesh
			const ctx = canvasRef.current.getContext("2d");

			// 5. TODO - Update drawing utility
			// drawSomething(obj, ctx)
			requestAnimationFrame(() => {
				drawRectTranslate(
					boxes[0],
					classes[0],
					scores[0],
					0.65,
					videoWidth,
					videoHeight,
					ctx,
          setTranslatedSign
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

  console.log(translatedString)

	return (
		<div className={TranslatePageCSS.container}>
			<Navbar />
			<div className={TranslatePageCSS["results-container"]}>
				<div className={TranslatePageCSS["results-container-content"]}>
					<div className={TranslatePageCSS["clear-output-container"]}>
						<button
							className={TranslatePageCSS["clear-output-button"]}
							onClick={() => clearTranslatedString()}
						>
							Clear output
						</button>
					</div>
					<p className={TranslatePageCSS.results}>{translatedString}</p>
				</div>
			</div>
			<div className={TranslatePageCSS["camera-view"]}>
				<div className={TranslatePageCSS.webcam}>
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
