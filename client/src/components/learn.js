import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
import Modal from "react-modal";
import Navbar from "./navbar";
import axios from "axios";

import learnCSS from "../css/learn.module.css"

export default function Learn() {
    const navigate = useNavigate();

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

    const [greetingsModalIsOpen, setGreetingsModalIsOpen] = React.useState(false);
    const [familyModalIsOpen, setFamilyModalIsOpen] = React.useState(false);

    const handleOpenGreetingsModal = () => {
        setGreetingsModalIsOpen(true);
    };

    const handleCloseGreetingsModal = () => {
        setGreetingsModalIsOpen(false);
    };

    const handleOpenFamilyModal = () => {
        setFamilyModalIsOpen(true);
    };

    const handleCloseFamilyModal = () => {
        setFamilyModalIsOpen(false);
    };

    return (
        <div className={learnCSS.container}>
            <Navbar />
            <div className={learnCSS.title}>
                <h1 className={learnCSS["learn-title"]}>Learn</h1>
                <p className={learnCSS["learn-text"]}>
                What do you want to learn today?
                </p>
                <div className={learnCSS["progress-bar"]}>
                <ProgressBar
                    width={600}
                    text={`${progress}% progress`}
                    percent={progress} 
                />
                </div>
            </div>
            <div className={learnCSS["navigation-buttons"]}>
                <button
                onClick={handleOpenGreetingsModal}
                className={learnCSS["greeting-button"]}
                >
                Greetings
                </button>
                <button
                onClick={handleOpenFamilyModal}
                className={learnCSS["family-button"]}
                >
                Family
                </button>
                <button className={learnCSS["numbers-button"]}>Basic Numbers</button>
                <button className={learnCSS["weather-button"]}>Weather</button>
                <button className={learnCSS["travel-button"]}>Travel and Transport</button>
                <button className={learnCSS["directions-button"]}>Giving Directions</button>
            </div>

            <Modal
                isOpen={greetingsModalIsOpen}
                onRequestClose={handleCloseGreetingsModal}
                contentLabel="Greetings Modal"
                className={learnCSS["modal-container"]}
            >
                <button
                className={learnCSS["close-button"]}
                onClick={handleCloseGreetingsModal}
                >
                X
                </button>
                <div className={learnCSS["modal-content"]}>
                    <p className={learnCSS["modal-header"]}>Greetings section</p>
                    <p className={learnCSS["modal-sub-header"]}>
                        What do you want to do?
                    </p>
                    <div className={learnCSS["modal-buttons"]}>
                        <button onClick={() => navigate("/quiz")}>Test</button>
                        <button onClick={() => navigate("/learnsign")}>Learn</button>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={familyModalIsOpen}
                onRequestClose={handleCloseFamilyModal}
                contentLabel="Family Modal"
                className={learnCSS["modal-container"]}
            >
                <button
                className={learnCSS["close-button"]}
                onClick={handleCloseFamilyModal}
                >
                X
                </button>
                <div className={learnCSS["modal-content"]}>
                    <p className={learnCSS["modal-header"]}>Family section</p>
                    <p className={learnCSS["modal-sub-header"]}>
                        What do you want to do?
                    </p>
                    <div className={learnCSS["modal-buttons"]}>
                        <button onClick={() => navigate("/quiz2")}>Test</button>
                        <button onClick={() => navigate("/learnsign2")}>Learn</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}