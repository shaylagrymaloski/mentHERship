import logo from "./logo-headtags.png";
import "./App.css";

import Home from "./pages/Home";
import Donation from "./pages/Donations";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StartPage from "./pages/StartPage";
import { ChatScreen } from "./pages/ChatScreen";
import { WelcomeScreen } from "./pages/WelcomeScreen";

import { Routes, Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      {/* <Header/> */}

      <Routes>
        <Route index element={<StartPage />} />
        <Route path="/welcome" element={<WelcomeScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/donations" element={<Donation />} />
        <Route path="/chat" element={<ChatScreen />} />
      </Routes>
    </div>
  );
}

export default App;
