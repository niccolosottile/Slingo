import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import learnSignCSS from "../css/learnSign.module.css";
import Navbar from "./navbar";
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
	const [currentIndex, setCurrentIndex] = useState(0);

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

	const signs = [
		{
			name: "Father",
			description:
				"Hold up your index finger and your middle finger on both hands and cross them over, pointing downwards.",
		},
		{
			name: "Mother",
			description:
				"Hold up your three middle fingers on one hand and place them on the other hand's flat palm.",
		},
		{
			name: "Son",
			description:
				"Point with your index finger to the side of you at your chin level.",
		},
		{
			name: "Daughter",
			description:
				"Make a D shape using the index finger of one hand and the thumb and index finger of the other.",
		},
		{
			name: "Brother",
			description: "Hold two closed fists side by side in front of you.",
		},
		{
			name: "Sister",
			description:
				"Make a curl in your index finger on one hand and hold it above your nose.",
		},
		{
			name: "Step",
			description:
				"Touch your little finger on one hand with the other hand's index finger.",
		},
		{
			name: "Baby",
			description:
				"Place one flat hand over another as if you are cradling a baby.",
		},
		{
			name: "Home",
			description:
				"Hold two open flat hands at 45 degrees so the tips of them meet, like a tent.",
		},
		{
			name: "My",
			description: "Place one enclosed fist on your chest.",
		},
		{
			name: "Your",
			description:
				"Curl over all your fingers on a flat palm and hold it out in front of you.",
		},
	];

	function handleNextClick() {
		const nextIndex = (currentIndex + 1) % images.length;
		setCurrentIndex(nextIndex);
	};

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
				<p className={learnSignCSS.description}>
					{signs[currentIndex]["description"]}
				</p>
				<button
					onClick={() => navigate("/learn")}
					className={learnSignCSS["leave-button"]}
				>
					Leave session
				</button>
			</div>
		</div>
	);
}
