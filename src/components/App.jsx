import React, { useState, useEffect } from 'react';
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
import { speakText } from '../speak';

/**
 * Main App component
 * Handles routing and global state
 */
function App() {
  const [fontSizeFactor, setFontSizeFactor] = useState(1);

  useEffect(() => {
    // Welkomstboodschap bij laden
    const welcomeText =
      'Welkom op Buren voor Buren. Bent u slechtziend of blind? Druk op de toets P om de tekst van deze pagina te laten voorlezen.';
    if ('speechSynthesis' in window) {
      if (!window.speechSynthesis.speaking) {
        speakText(welcomeText);
      }
    }
    // Keydown event voor P
    const handleKeyDown = (e) => {
      if (
        (e.key === 'p' || e.key === 'P') &&
        document.activeElement.tagName !== 'INPUT' &&
        document.activeElement.tagName !== 'TEXTAREA'
      ) {
        if ('speechSynthesis' in window) {
          if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            return;
          } else {
            const homeMain = document.getElementById('home-main-content');
            if (homeMain) {
              const text = homeMain.innerText;
              speakText(text);
            }
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
        <Route path="/werkvormen" element={<Werkvormen fontSizeFactor={fontSizeFactor} />} />
        <Route path="/werkingsprincipes" element={<Werkingsprincipes fontSizeFactor={fontSizeFactor} />} />
        <Route path="/links-literatuur" element={<LinksLiteratuur fontSizeFactor={fontSizeFactor} />} />
      </Routes>
    </Router>
  );
}

export default App;
