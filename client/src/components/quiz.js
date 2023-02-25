import React, { useState} from "react";
import QuizCSS from "../css/quiz.module.css";
import Navbar from "./navbar";
import Webcam from "react-webcam";

export default function Quiz() {
  const [score, setScore] = useState(0);
  const [i, questionIndex] = useState(0);

  const questions = [
    {
      questionText: "Sign the letter A",
      answers: ["Correct", "Wrong"],
    },
    {
      questionText: "Sign the letter B",
      answers: ["Correct", "Wrong"],
    },
  ];

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
            <button
              className={QuizCSS["button-1"]}
              onClick={() => {
                setScore(score + 1);
                questionIndex(i + 1);
              }}
            >
              {questions[i].answers[0]}
            </button>
            <button
              className={QuizCSS["button-2"]}
              onClick={() => questionIndex(i + 1)}
            >
              {questions[i].answers[1]}
            </button>
          </div>
        </div>
        <div className={QuizCSS["camera-view"]}>
          <div className={QuizCSS.webcam}>
            <Webcam mirrored={true} />
          </div>
          <button className={QuizCSS["skip-button"]}>Skip →</button>
        </div>
        <div className={QuizCSS["leave-section"]}>
          <button className={QuizCSS["leave-button"]}>Leave session</button>
        </div>
      </div>
    );
  }

  return (
    <div className={QuizCSS.container}>
      <Navbar />
      <div className={QuizCSS["course-details"]}>
        <p className={QuizCSS["course-heading"]}>Coursename - test</p>
        <p className={QuizCSS["question-count"]}>
          You have completed the test
        </p>
      </div>
      <div className={QuizCSS["header-container"]}>
        <div className={QuizCSS["results-section"]}>
          <div className={QuizCSS["score"]}>
            <p>
              You got {score} / {questions.length}. Pretty bad.
            </p>
          </div>
        </div>
        <div className={QuizCSS["leave-section"]}>
          <button className={QuizCSS["leave-button"]}>Leave session</button>
        </div>
      </div>
    </div>
  );
}