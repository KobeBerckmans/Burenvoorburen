import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './Hero';
import Header from './Header';
import HomeSection from './HomeSection';
import Buurten from './Buurten';

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
      </Routes>
    </Router>
  );
}

export default App;
