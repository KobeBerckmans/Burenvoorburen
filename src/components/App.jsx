import React, { useState } from 'react';
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
  const [fontSizeFactor, setFontSizeFactor] = useState(1);
  return (
    <Router>
      <Header fontSizeFactor={fontSizeFactor} setFontSizeFactor={setFontSizeFactor} />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <HomeSection fontSizeFactor={fontSizeFactor} />
          </>
        } />
        <Route path="/buurten" element={<Buurten fontSizeFactor={fontSizeFactor} />} />
        <Route path="/doe-je-mee" element={<DoeJeMee fontSizeFactor={fontSizeFactor} />} />
        <Route path="/hulp" element={<Help fontSizeFactor={fontSizeFactor} />} />
        <Route path="/partners" element={<Partners fontSizeFactor={fontSizeFactor} />} />
        <Route path="/contact" element={<Contact fontSizeFactor={fontSizeFactor} />} />
        <Route path="/concept" element={<Concept fontSizeFactor={fontSizeFactor} />} />
        <Route path="/werkvormen" element={<Werkvormen />} />
        <Route path="/werkingsprincipes" element={<Werkingsprincipes fontSizeFactor={fontSizeFactor} />} />
        <Route path="/links-literatuur" element={<LinksLiteratuur />} />
      </Routes>
    </Router>
  );
}

export default App;
