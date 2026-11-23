
import MBBSPage from "./components/MBBSPage";
import MBBSHero from "./components/MBBSHero";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Universities from "./components/Universities";
import ScholarshipPopup from "./components/ScholarshipPopup";
import StudyAbroad from "./components/StudyAbroad";
import Contact from "./components/Contact";
import Home from "./components/Home";

import "./App.css";

function OnlineMBA() {
  const [showPopup, setShowPopup] = useState(true);
  const [showAllUniversities, setShowAllUniversities] = useState(false);
  const [hasOpenedForm, setHasOpenedForm] = useState(false);

  const handleViewAll = () => {
    if (!hasOpenedForm) {
      setShowPopup(true);
      setHasOpenedForm(true);
    } else {
      setShowPopup(false);
      setShowAllUniversities(true);
    }
  };

  const handleViewDetails = () => {
    setShowAllUniversities(false);
    setShowPopup(true);
  };

  const handleClosePopup = () => setShowPopup(false);

  return (
    <>
      <Hero />
      <Universities
        onViewAll={handleViewAll}
        showAllUniversities={showAllUniversities}
        onViewDetails={handleViewDetails}
      />
      {showPopup && <ScholarshipPopup onClose={handleClosePopup} />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/study-abroad" element={<StudyAbroad />} />
        <Route path="/online-mba" element={<OnlineMBA />} />
         <Route path="/mbbs" element={<MBBSPage />} />
        <Route path="/contact" element={<Contact />} />
            </Routes>
    </BrowserRouter>
  );
}

export default App;
