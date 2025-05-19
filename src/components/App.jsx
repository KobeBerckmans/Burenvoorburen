import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './Hero';
import Header from './Header';
import HomeSection from './HomeSection';
import Buurten from './Buurten';
import DoeJeMee from './DoeJeMee';
import Help from './Help';
import Partners from './Partners';
import Contact from './Contact';
import Concept from './Concept';
import Werkvormen from './Werkvormen';
import Werkingsprincipes from './Werkingsprincipes';
import LinksLiteratuur from './LinksLiteratuur';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <HomeSection />
          </>
        } />
        <Route path="/buurten" element={<Buurten />} />
        <Route path="/doe-je-mee" element={<DoeJeMee />} />
        <Route path="/hulp" element={<Help />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/concept" element={<Concept />} />
        <Route path="/werkvormen" element={<Werkvormen />} />
        <Route path="/werkingsprincipes" element={<Werkingsprincipes />} />
        <Route path="/links-literatuur" element={<LinksLiteratuur />} />
      </Routes>
    </Router>
  );
}

export default App;
