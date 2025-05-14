import React, { useState } from 'react';
import logo from '../assets/react.svg'; // Vervang door het echte logo als je die hebt

const LANGUAGES = [
    { code: 'fr', flag: '🇫🇷' },
    { code: 'en', flag: '🇬🇧' },
];

const MENU_ITEMS = [
    'HOME',
    'HULP NODIG?',
    'BUURTEN',
    'DOE JE MEE?',
    'BURENHULP',
    'OVER ONS',
    'CONTACT',
    'MEER',
];

const MORE_ITEMS = [
    'CONCEPT',
    'WERKINGSPRINCIPES',
    'WERKVORMEN',
    'LINKS & LITERATUUR',
];

export default function Menu() {
    const [showMore, setShowMore] = useState(false);

    return (
        <div className="menu">
            <img src={logo} alt="Logo" className="menu-logo" />
            <div className="menu-title">MENU</div>
            <div className="menu-lang">
                {LANGUAGES.map(lang => (
                    <span key={lang.code} style={{ fontSize: '1.5rem' }}>{lang.flag}</span>
                ))}
            </div>
            <div className="menu-list">
                {MENU_ITEMS.map((item, idx) => (
                    <button className="btn" key={item} onClick={() => item === 'MEER' && setShowMore(v => !v)}>
                        {item}
                    </button>
                ))}
            </div>
            {showMore && (
                <>
                    <div className="menu-more">&#x25BC;</div>
                    <div className="menu-more-list">
                        {MORE_ITEMS.map(item => (
                            <div key={item}>{item}</div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
} 