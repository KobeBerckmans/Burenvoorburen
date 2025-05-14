import React from 'react';
import logo from '../assets/images/BVB-Transparant.png';
import headerImage from '../assets/images/header-image.png';
import '../styles/Header.css';

const menuItems = [
    'Home',
    'Buurten',
    'Doe je mee?',
    'Burenhulp',
    'Over ons',
    'Contact',
    'Meer',
];

export default function Header() {
    return (
        <>
            <header className="header">
                <div className="header-inner">
                    <img src={logo} alt="Buren voor Buren logo" className="header-logo" />
                    <nav className="header-nav">
                        {menuItems.map(item => (
                            <a href="#" className="header-link" key={item}>{item}</a>
                        ))}
                    </nav>
                    <div className="header-actions">
                        <button className="header-help">HULP?</button>
                        <div className="header-lang">
                            <span role="img" aria-label="Frans" className="header-flag">🇫🇷</span>
                            <span role="img" aria-label="Engels" className="header-flag">🇬🇧</span>
                        </div>
                        <button className="header-plus">+</button>
                    </div>
                </div>
            </header>
            <img src={headerImage} alt="Header" className="header-image" />
        </>
    );
} 