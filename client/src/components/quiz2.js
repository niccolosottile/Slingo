import Navbar from "./navbar";
import Webcam from "react-webcam";
import React, { useRef, useState, useEffect } from "react";
// import { nextFrame } from "@tensorflow/tfjs";
import * as tf from "@tensorflow/tfjs";
// 2. TODO - Import drawing utility here
import { drawRectQuizFamily } from "./utilities";
import { useTranslatedSign } from "./translationUtils";
import QuizCSS from "../css/quiz.module.css";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
	const navigate = useNavigate();
  const [score, setScore] = useState(0);
	const [i, questionIndex] = useState(0);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
	const [translatedSign, setTranslatedSign] = useState(""); // state variable to store translated sign
  
	const webcamRef = useRef(null);
	const canvasRef = useRef(null);

  useEffect(() => {
    if (translatedSign === questions[i].answers) {
      setIsAnswerCorrect(true);
      setScore(score + 1);
      questionIndex(i + 1);
    } else {
      setIsAnswerCorrect(false);
    }
  }, [translatedSign]);
  
	// Main function
	const runCoco = async () => {
    // 3. TODO - Load network
		const net = await tf.loadGraphModel(
      "https://raw.githubusercontent.com/dp846/SlingoModels/main/family_v1/model.json"
      ); //Loads the model
        
        // Loop and detect hands
        setInterval(() => {
          detect(net);
        }, 16.7);
      };
      
      const questions = [
        {
          questionText: "Sign: Step",
          answers: "step",
        },
        {
          questionText: "Sign: Father",
          answers: "father",
        },
        {
			questionText: "Sign: Mother",
			answers: "mother",
		},
		{
		questionText: "Sign: Brother",
		answers: "brother",
		},
      ];

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
            
            // const boxes = await obj[2].array();
            // const classes = await obj[4].array();
            // const scores = await obj[7].array();


			//model indexes for family model
			const boxes = await obj[3].array();
			const classes = await obj[7].array();
			const scores = await obj[4].array();
            
            // console.log(await obj[7].array())
            
            // Draw mesh
            const ctx = canvasRef.current.getContext("2d");
            
            // 5. TODO - Update drawing utility
            // drawSomething(obj, ctx)
            requestAnimationFrame(() => {
				drawRectQuizFamily(
                boxes[0],
                classes[0],
                scores[0],
                0.65,
                videoWidth,
                videoHeight,
                ctx,
                setTranslatedSign,
                setIsAnswerCorrect,
                questions[i].answers,
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


	if (i !== questions.length) {
		return (
			<div className={QuizCSS.container}>
				<Navbar />
				<div className={QuizCSS["course-details"]}>
					<p className={QuizCSS["course-heading"]}>Coursename - test</p>
					<p className={QuizCSS["question-count"]}>
						{i + 1} out of {questions.length} questions left
					</p>
				</div>
				<div className={QuizCSS["header-container"]}>
					<div className={QuizCSS["question-section"]}>
						<div className={QuizCSS["question-text"]}>
							<p>{questions[i].questionText}</p>
						</div>
					</div>
					<div className={QuizCSS["answer-section"]}>
					</div>
				</div>
				<div className={QuizCSS["camera-view"]}>
					<div className={QuizCSS.webcam}>
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
          {/* Button to skip to next question */}
					<button className={QuizCSS["skip-button"]} onClick={() => questionIndex(i + 1)}>Skip →</button>
				</div>
				<div className={QuizCSS["leave-section"]}>
					<button onClick={() => navigate("/inhome")} className={QuizCSS["leave-button"]}>Leave session</button>
				</div>
			</div>
		);
	}

	return (
		<div className={QuizCSS.container}>
			<Navbar />
			<div className={QuizCSS["course-details"]}>
				<p className={QuizCSS["course-heading"]}>Coursename - test</p>
				<p className={QuizCSS["question-count"]}>You have completed the test</p>
			</div>
			<div className={QuizCSS["header-container"]}>
				<div className={QuizCSS["results-section"]}>
					<div className={QuizCSS["score"]}>
						<p>
							You got {score} / {questions.length} correct.
						</p>
					</div>
				</div>
				<div className={QuizCSS["leave-section"]}>
					<button onClick={() => navigate("/inhome")} className={QuizCSS["leave-button"]}>Leave session</button>
				</div>
			</div>
		</div>
	);
}