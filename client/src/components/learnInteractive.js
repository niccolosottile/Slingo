import { React, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import learnSignCSS from "../css/learnSign.module.css";
import QuizCSS from "../css/quiz.module.css";
import Navbar from "./navbar";
import axios from "axios";
import afternoon from "./greetings/afternoon.jpg";
import bad from "./greetings/bad.jpg";
import good from "./greetings/good.jpg";
import hello from "./greetings/hello.jpg";
import how from "./greetings/how.jpg";
import luck from "./greetings/luck.jpg";
import meet from "./greetings/meet.jpg";
import morning from "./greetings/morning.jpg";
import name from "./greetings/name.jpg";
import thanks from "./greetings/thanks.jpg";
import you from "./greetings/you.jpg";

import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
// Import drawing utility here
import { drawRectQuizGreetings } from "./utilities";

export default function LearnSign() {
	const navigate = useNavigate();

	// Retrieving course details
	const [loading, setLoading] = useState(true);
	const [signs, setSigns] = useState([]);
	const [signId, setSignId] = useState("");

	useEffect(() => {
		const retrieveSignsAndSetSign = async () => {
			try {
				const url = `http://localhost:8080/api/courses/greetings`;
				const { data: res } = await axios.get(url);
				setSigns(res.course.signs);
				setSignId(res.course.signs[0]._id);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		retrieveSignsAndSetSign();
	}, []);

	const userId = localStorage.getItem("userid");
	const [currentIndex, setCurrentIndex] = useState(0);
	
	useEffect(() => {
        if (!loading) {
            const updateProgress = async () => {
                try {
                    const url = `http://localhost:8080/api/progress/${userId}/${signId}`;
                    await axios.post(url);
                } catch (error) {
                    console.log(error);
                }
            };
            updateProgress();
        }
	}, [currentIndex]);

	const images = [
		{ src: afternoon, alt: "afternoon" },
		{ src: bad, alt: "bad" },
		{ src: good, alt: "good" },
		{ src: hello, alt: "hello" },
		{ src: how, alt: "how" },
		{ src: luck, alt: "luck" },
		{ src: meet, alt: "meet" },
		{ src: morning, alt: "morning" },
		{ src: name, alt: "name" },
		{ src: thanks, alt: "thanks" },
		{ src: you, alt: "you" },
	];

	function handleNextClick() {
		const nextIndex = (currentIndex + 1) % images.length;
		setCurrentIndex(nextIndex);
		setSignId(signs[nextIndex]._id);
	}

	function handlePrevClick() {
		const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
		setCurrentIndex(prevIndex);
		setSignId(signs[prevIndex]._id);
	}

    // Sign checking
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [translatedSign, setTranslatedSign] = useState("");
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!loading) {
            if (translatedSign === signs[currentIndex]["name"].toLowerCase()) {
                setIsAnswerCorrect(true);
            } else {
                setIsAnswerCorrect(false);
            }
        }
    }, [translatedSign]);

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
                drawRectQuizGreetings(
                    boxes[0],
                    classes[0],
                    scores[0],
                    0.65,
                    videoWidth,
                    videoHeight,
                    ctx,
                    setTranslatedSign,
                    setIsAnswerCorrect,
                    signs[currentIndex]["name"].toLowerCase(),
                );
            });
            
            tf.dispose(img);
            tf.dispose(resized);
            tf.dispose(casted);
            tf.dispose(expanded);
            tf.dispose(obj);
        }
    };

    if (!loading) {
        runCoco();

		return (
			<div className={learnSignCSS.container}>
				<Navbar />
				<div className={learnSignCSS.content}>
					<h1 className={learnSignCSS.title}>{signs[currentIndex]["name"]}</h1>
					<div className={learnSignCSS["slide-show"]}>
                        <button
                                className={learnSignCSS.previous}
                                onClick={handlePrevClick}
                            >
                                Previous
                        </button>
                        <img
                            src={images[currentIndex].src}
                            alt={images[currentIndex].alt}
                        />
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
                        <button
                                className={learnSignCSS.next}
                                onClick={handleNextClick}
                            >
                                Next
                        </button>
					</div>
                    <p className={learnSignCSS.description}>
						{signs[currentIndex]["description"]}
                    </p>
                    <button onClick={() => navigate("/learn")} className={learnSignCSS["leave-button"]}>
						Leave session
					</button>
				</div>
			</div>
		);
	}
}