import React from "react";

// We use Route in order to define the different routes of our application 
import { Route, Routes } from "react-router-dom";

// Import all the components needed into the app
import Home from "./components/home";
import Login from "./components/login";
import Signup from "./components/signup";
import InHome from "./components/inHome"; 
import Quiz from "./components/quiz";
import Translate from "./components/translate";

const App = () => {
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/inhome" element={<InHome />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/translate" element={<Translate />} />
            </Routes>
        </div>
    );
};

export default App;