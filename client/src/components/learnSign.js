import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import learnSignCSS from "../css/learnSign.module.css";
import Navbar from "./navbar";
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
	const [currentIndex, setCurrentIndex] = useState(0);

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

	const signs = [
		{
			name: "Afternoon",
			description:
				"Hold up your index finger and your middle finger on one hand up to your chin.",
		},
		{
			name: "Bad",
			description: "Hold just your little finger pointing up to the sky.",
		},
		{
			name: "Good",
			description: "Hold up your hand with your thumbs up.",
		},
		{
			name: "Hello",
			description: "Put your hand in a waving position.",
		},
		{
			name: "How",
			description:
				"Interlace your fingers on both hands with your palms facing upwards.",
		},
		{
			name: "Luck",
			description:
				"Hold your index finger and your thumb up in an L shape on one hand and touch your nose with your index finger.",
		},
		{
			name: "Meet",
			description:
				"Hold up your index fingers on both hands and bring your wands together.",
		},
		{
			name: "Morning",
			description: "Touch your chest with a loose fist.",
		},
		{
			name: "Name",
			description:
				"Hold up your index finger and you middle finger one one hand sideways at your head.",
		},
		{
			name: "Thanks",
			description: "Use an open flush hand to touch your chin.",
		},
		{
			name: "You",
			description: "Point with your index finger.",
		},
	];

	function handleNextClick() {
		const nextIndex = (currentIndex + 1) % images.length;
		setCurrentIndex(nextIndex);
	}

	function handlePrevClick() {
		const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
		setCurrentIndex(prevIndex);
	}

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
        <button onClick={() => navigate("/")} className={learnSignCSS["leave-button"]}>Leave session</button>
			</div>
		</div>
	);
}
