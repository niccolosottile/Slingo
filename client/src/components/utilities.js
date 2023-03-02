// The labelMap for the greetings model
const labelMapGreetings = {
	1: { name: "hello", color: "red" },
	2: { name: "thanks", color: "yellow" },
	3: { name: "name", color: "lime" },
	4: { name: "good", color: "blue" },
	5: { name: "luck", color: "red" },
	6: { name: "bad", color: "yellow" },
	7: { name: "meet", color: "lime" },
	8: { name: "you", color: "blue" },
	9: { name: "morning", color: "red" },
	10: { name: "afternoon", color: "yellow" },
	11: { name: "how", color: "lime" },
};

//The labelMap for family model
const labelMapFamily = {
	1: { name: "step", color: "red" },
	2: { name: "mother", color: "yellow" },
	3: { name: "father", color: "lime" },
	4: { name: "son", color: "blue" },
	5: { name: "daughter", color: "red" },
	6: { name: "brother", color: "yellow" },
	7: { name: "sister", color: "lime" },
	8: { name: "baby", color: "blue" },
	9: { name: "home", color: "red" },
	10: { name: "my", color: "yellow" },
	11: { name: "your", color: "lime" },
};

// Define a drawing function
export const drawRectTranslate = (
	boxes,
	classes,
	scores,
	threshold,
	imgWidth,
	imgHeight,
	ctx,
	setTranslatedSign
) => {
	for (let i = 0; i <= boxes.length; i++) {
		if (scores[i] > threshold && boxes[i] && classes[i]) {
			// Extract variables
			const [y, x, height, width] = boxes[i];
			const key = classes[i];

			// Update translated sign
			setTranslatedSign(labelMapGreetings[key]['name']);

			// Set styling
			ctx.strokeStyle = labelMapGreetings[key]["color"];
			ctx.lineWidth = 4;
			ctx.fillStyle = "white";
			ctx.font = "30px Arial";

			// DRAW!!
			ctx.beginPath();
			ctx.fillText(
				labelMapGreetings[key]['name'] + " - " + Math.round(scores[i] * 100) / 100,
				x * imgWidth,
				y * imgHeight - 10
			);
			ctx.rect(
				x * imgWidth,
				y * imgHeight,
				(width * imgWidth) / 2,
				(height * imgHeight) / 2
			);
			ctx.stroke();
		}
	}
};

export const drawRectQuizGreetings = (
	boxes,
	classes,
	scores,
	threshold,
	imgWidth,
	imgHeight,
	ctx,
	setTranslatedSign,
	setIsAnswerCorrect,
	answers
) => {
	for (let i = 0; i <= boxes.length; i++) {
		if (scores[i] > threshold && boxes[i] && classes[i]) {
			// Extract variables
			const [y, x, height, width] = boxes[i];
			const key = classes[i];

			console.log(key);

			// Update translated sign
			setTranslatedSign(labelMapGreetings[key]["name"]);

			/* Check if answer is correct
			if (labelMapGreetings[key]["name"] === answers) {
			 	setIsAnswerCorrect(true);
			} */

			// Set styling
			ctx.strokeStyle = labelMapGreetings[key]["color"];
			ctx.lineWidth = 4;
			ctx.fillStyle = "white";
			ctx.font = "30px Arial";

			// DRAW!!
			ctx.beginPath();
			ctx.fillText(
				labelMapGreetings[key]["name"] + " - " + Math.round(scores[i] * 100) / 100,
				x * imgWidth,
				y * imgHeight - 10
			);
			ctx.rect(
				x * imgWidth,
				y * imgHeight,
				(width * imgWidth) / 2,
				(height * imgHeight) / 2
			);
			ctx.stroke();
		}
	}
};


export const drawRectQuizFamily = (
	boxes,
	classes,
	scores,
	threshold,
	imgWidth,
	imgHeight,
	ctx,
	setTranslatedSign,
	setIsAnswerCorrect,
	answers
) => {
	for (let i = 0; i <= boxes.length; i++) {
		if (scores[i] > threshold && boxes[i] && classes[i]) {
			// Extract variables
			const [y, x, height, width] = boxes[i];
			const key = classes[i];

			// Update translated sign
			setTranslatedSign(labelMapFamily[key]["name"]);

			/* Check if answer is correct
			if (labelMapGreetings[key]["name"] === answers) {
			 	setIsAnswerCorrect(true);
			} */

			// Set styling
			ctx.strokeStyle = labelMapFamily[key]["color"];
			ctx.lineWidth = 4;
			ctx.fillStyle = "white";
			ctx.font = "30px Arial";

			// DRAW!!
			ctx.beginPath();
			ctx.fillText(
				labelMapFamily[key]["name"] + " - " + Math.round(scores[i] * 100) / 100,
				x * imgWidth,
				y * imgHeight - 10
			);
			ctx.rect(
				x * imgWidth,
				y * imgHeight,
				(width * imgWidth) / 2,
				(height * imgHeight) / 2
			);
			ctx.stroke();
		}
	}
};
