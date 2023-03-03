import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import learnSignCSS from "../css/learnSign.module.css";
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

export default function LearnSign() {
	const navigate = useNavigate();

	// Retrieving course details
	const [loading, setLoading] = useState(true);
	const [signs, setSigns] = useState([]);

	useEffect(() => {
		const retrieveSigns = async () => {
			try {
				const url = `http://localhost:8080/api/courses/greetings`;
				const { data: res } = await axios.get(url);
				setSigns(res.course.signs);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		retrieveSigns();
	}, []);

	// Tracking user progress
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

	const updateProgress = async () => {
		try {
			const url = `http://localhost:8080/api/progress/${userId}`;
			const newProgress = progress + 1;
			await axios.post(url, { newProgress });
			setProgress(newProgress);
		} catch (error) {
			console.log(error);
		}
	};

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

	const [currentIndex, setCurrentIndex] = useState(0);

	function handleNextClick() {
		const nextIndex = (currentIndex + 1) % images.length;
		setCurrentIndex(nextIndex);
		updateProgress();
	}

	function handlePrevClick() {
		const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
		setCurrentIndex(prevIndex);
	}

	if (!loading) {
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
						<button
							className={learnSignCSS.next}
							onClick={handleNextClick}
						>
							Next
						</button>
					</div>
					<p className={learnSignCSS.description}>{signs[currentIndex]["description"]}</p>
			<button onClick={() => navigate("/learn")} className={learnSignCSS["leave-button"]}>Leave session</button>
				</div>
			</div>
		);
	}
}
