import React from "react";
import { Route, Routes } from "react-router-dom";

import InHome from "./components/inHome"; 
import Home from "./components/home";
import Login from "./components/login";
import Signup from "./components/signup";
import EmailVerify from "./components/emailVerify";
import ForgotPassword from "./components/forgotPassword";
import PasswordReset from "./components/passwordReset";
import Quiz from "./components/quiz";
import Translate from "./components/translate";

const App = () => {
    const user = localStorage.getItem("token");

    return (
        <div>
            <Routes>
                {user && <Route exact path="/" element={<InHome />} />}
                <Route exact path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/password-reset/:id/:token" element={<PasswordReset />} />
                {user && <Route path="/quiz" element={<Quiz />} />}
                {user && <Route path="/translate" element={<Translate />} />}
            </Routes>
        </div>
    );
};

export default App;