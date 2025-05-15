import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/BVB-Transparant.png';
import '../styles/Header.css';

const menuItems = [
    { label: 'Home', to: '/' },
    { label: 'Buurten', to: '/buurten' },
    { label: 'Doe je mee?', to: '#' },
    { label: 'Over ons', to: '#' },
    { label: 'Contact', to: '#' },
    { label: 'Meer', to: '#' },
];

export default function Header() {
    return (
        <header className="header">
            <div className="header-inner">
                <img src={logo} alt="Buren voor Buren logo" className="header-logo" />
                <nav className="header-nav">
                    {menuItems.map(item => (
                        item.to.startsWith('/') ?
                            <Link to={item.to} className="header-link" key={item.label}>{item.label}</Link>
                            : <a href={item.to} className="header-link" key={item.label}>{item.label}</a>
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
    );
}