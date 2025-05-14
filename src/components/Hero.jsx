import React from 'react';
import heroImage from '../assets/images/helping2.png';
import '../styles/Hero.css';

export default function Hero() {
    return (
        <section className="hero-section">
            <img src={heroImage} alt="Hero" className="hero-bg" />
            <div className="hero-center-content">
                <div className="hero-title-block">
                    <span className="hero-title">Buren voor Buren</span>
                </div>
                <div className="hero-row">
                    <div className="hero-location-block">
                        <span className="hero-location">Tienen</span>
                    </div>
                    <button className="hero-help-btn">HULP?</button>
                </div>
            </div>
        </section>
    );
} 