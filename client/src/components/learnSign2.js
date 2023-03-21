import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import learnSignCSS from "../css/learnSign.module.css";
import Navbar from "./navbar";
import axios from "axios";
import father from "./family/father.jpg";
import mother from "./family/mother.jpg";
import son from "./family/son.jpg";
import daughter from "./family/daughter.jpg";
import brother from "./family/brother.jpg";
import sister from "./family/sister.jpg";
import step from "./family/step.jpg";
import baby from "./family/baby.jpg";
import home from "./family/home.jpg";
import my from "./family/my.jpg";
import your from "./family/your.jpg";

export default function LearnSign2() {
	const navigate = useNavigate();

	// Retrieving course details
	const [loading, setLoading] = useState(true);
	const [signs, setSigns] = useState([]);
	const [signId, setSignId] = useState("");

	useEffect(() => {
		const retrieveSignsAndSetSign = async () => {
			try {
				const url = `http://localhost:8080/api/courses/family`;
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
		const updateProgress = async () => {
			try {
				const url = `http://localhost:8080/api/progress/${userId}/${signId}`;
				await axios.post(url);
			} catch (error) {
				console.log(error);
			}
		};
		updateProgress();
	}, [currentIndex]);

	const images = [
		{ src: father, alt: "Father" },
		{ src: mother, alt: "Mother" },
		{ src: son, alt: "Son" },
		{ src: daughter, alt: "Daughter" },
		{ src: brother, alt: "Brother" },
		{ src: sister, alt: "Sister" },
		{ src: step, alt: "Step" },
		{ src: baby, alt: "Baby" },
		{ src: home, alt: "Home" },
		{ src: my, alt: "My" },
		{ src: your, alt: "Your" },
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
