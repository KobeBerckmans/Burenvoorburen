import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo-zwart.png';
import '../styles/Header.css';
import Werkingsprincipes from './Werkingsprincipes';
import PropTypes from 'prop-types';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import TextDecreaseIcon from '@mui/icons-material/TextDecrease';
import { speakText } from '../speak';

const menuItems = [
    { label: 'Aanvraag', to: '/hulp', className: 'header-help' },
    { label: 'Doe mee', to: '/doe-je-mee' },
    { label: 'Buurten', to: '/buurten' },
    { label: 'Over ons', to: '/partners' },
    { label: 'Contact', to: '/contact' },
    { label: 'Uitgebreid', to: '#', hasDropdown: true },
];

const dropdownItems = [
    { label: 'Concept', to: '/concept' },
    { label: 'Werkingsprincipes', to: '/werkingsprincipes' },
    { label: 'Werkvormen', to: '/werkvormen' },
    { label: 'Links & Literatuur', to: '/links-literatuur' },
];

const styles = {
    dropdown: {
        position: 'absolute',
        top: '100%',
        right: 0,
        background: '#fbeeea',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        padding: '0.5rem 0',
        minWidth: '220px',
        zIndex: 1000,
        opacity: 0,
        visibility: 'hidden',
        transform: 'translateY(-10px)',
        transition: 'all 0.2s ease',
    },
    dropdownVisible: {
        opacity: 1,
        visibility: 'visible',
        transform: 'translateY(0)',
    },
    dropdownItem: {
        display: 'block',
        padding: '0.75rem 1.25rem',
        color: '#222',
        textDecoration: 'none',
        fontSize: '0.95rem',
        fontWeight: 500,
        transition: 'all 0.2s ease',
        ':hover': {
            background: '#fff',
            color: '#e2725b',
        },
    },
    dropdownItemActive: {
        color: '#e2725b',
        background: '#fff',
    },
    dropdownDivider: {
        height: '1px',
        background: '#e2725b',
        opacity: 0.2,
        margin: '0.5rem 0',
    },
    moreButton: {
        position: 'relative',
        cursor: 'pointer',
        padding: '0.5rem 0',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
    },
    moreIcon: {
        width: '12px',
        height: '12px',
        borderLeft: '2px solid currentColor',
        borderBottom: '2px solid currentColor',
        transform: 'rotate(-45deg)',
        transition: 'transform 0.2s ease',
    },
    moreIconOpen: {
        transform: 'rotate(135deg)',
    },
};

/**
 * Header component
 * Renders the main navigation bar and handles menu logic
 */
export default function Header({ setFontSizeFactor }) {
    const [activeDropdown, setActiveDropdown] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showA11yInfo, setShowA11yInfo] = useState(false);
    const dropdownRef = useRef(null);
    const a11yInfoRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        // Stop spraak bij paginawissel
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    }, [location.pathname]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setActiveDropdown(false);
            }
            if (a11yInfoRef.current && !a11yInfoRef.current.contains(event.target)) {
                setShowA11yInfo(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Sluit mobiel menu bij navigatie
    function handleNavClick() {
        setMobileMenuOpen(false);
        setActiveDropdown(false);
    }

    // Toegankelijkheidsuitleg
    const a11yText =
        "Toegankelijkheid: Gebruik de tabtoets om door het menu en de pagina te navigeren. Gebruik de 'Lees voor'-knop op pagina's of druk op de letter p om de inhoud te laten voorlezen. Gebruik de plus- en minknoppen om de tekstgrootte aan te passen. Druk op Escape om dit bericht te sluiten.";

    // Voorleesfunctie voor toegankelijkheidsuitleg
    useEffect(() => {
        if (showA11yInfo) {
            speakText(a11yText);
        } else {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
        }
    }, [showA11yInfo]);

    return (
        <header className="header">
            <div className="header-inner">
                <Link to="/">
                    <img src={logo} alt="Buren voor Buren logo" className="header-logo" />
                </Link>
                {/* Gewone menu, verborgen op mobiel */}
                <nav className="header-nav">
                    {menuItems.map(item => (
                        item.hasDropdown ? (
                            <div key={item.label} ref={dropdownRef} style={{ position: 'relative' }}>
                                <div
                                    style={styles.moreButton}
                                    onClick={() => setActiveDropdown(!activeDropdown)}
                                    className="header-link"
                                >
                                    {item.label}
                                    <span style={{
                                        ...styles.moreIcon,
                                        ...(activeDropdown ? styles.moreIconOpen : {})
                                    }} />
                                </div>
                                <div style={{
                                    ...styles.dropdown,
                                    ...(activeDropdown ? styles.dropdownVisible : {})
                                }}>
                                    {dropdownItems.map((dropdownItem, index) => (
                                        <React.Fragment key={dropdownItem.label}>
                                            <Link
                                                to={dropdownItem.to}
                                                style={styles.dropdownItem}
                                                onClick={() => setActiveDropdown(false)}
                                            >
                                                {dropdownItem.label}
                                            </Link>
                                            {index < dropdownItems.length - 1 && (
                                                <div style={styles.dropdownDivider} />
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            item.to.startsWith('/') ?
                                <Link to={item.to} className={`${item.className || 'header-link'}`} key={item.label}>{item.label}</Link>
                                : <a href={item.to} className={`${item.className || 'header-link'}`} key={item.label}>{item.label}</a>
                        )
                    ))}
                </nav>
                <div className="header-actions">
                    {/* Accessibility icon in plaats van vlaggen */}
                    <div className="header-a11y" style={{ display: 'flex', alignItems: 'center', marginRight: 8 }}>
                        <button
                            aria-label="Toegankelijkheidsuitleg weergeven"
                            onClick={() => setShowA11yInfo(v => !v)}
                            onKeyDown={e => {
                                if (e.key === 'Enter' || e.key === ' ') setShowA11yInfo(v => !v);
                                if (e.key === 'Escape') setShowA11yInfo(false);
                            }}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: 28,
                                padding: 0,
                                margin: 0,
                                color: '#26913a',
                                outline: showA11yInfo ? '3px solid #e2725b' : 'none',
                                borderRadius: 8,
                                transition: 'outline 0.2s',
                            }}
                        >
                            <span role="img" aria-label="Toegankelijkheid / Accessibility">🔊</span>
                        </button>
                        {/* Tooltip/aria-live uitleg */}
                        {(showA11yInfo) && (
                            <div
                                ref={a11yInfoRef}
                                tabIndex={-1}
                                style={{
                                    background: '#fff',
                                    color: '#222',
                                    border: '2px solid #26913a',
                                    borderRadius: 10,
                                    boxShadow: '0 4px 18px 0 rgba(44,62,80,0.13)',
                                    padding: '1rem 1.2rem',
                                    marginLeft: 12,
                                    fontSize: 16,
                                    maxWidth: 340,
                                    zIndex: 2000,
                                    position: 'absolute',
                                    top: '110%',
                                    left: 0,
                                }}
                                aria-live="assertive"
                            >
                                {a11yText}
                            </div>
                        )}
                    </div>
                    {/* Tekstgrootte iconen helemaal rechts */}
                    <div className="header-fontsize-controls" style={{ display: 'flex', gap: '0.3rem', marginLeft: 16 }}>
                        <button className="header-plus" style={{ border: 'none', background: 'none', boxShadow: 'none', outline: 'none', borderRadius: 0, padding: 0, margin: 0 }} onClick={() => setFontSizeFactor(f => Math.min(2, f + 0.1))} aria-label="Vergroot tekstgrootte">
                            <TextIncreaseIcon style={{ width: 24, height: 24 }} />
                        </button>
                        <button className="header-plus" style={{ border: 'none', background: 'none', boxShadow: 'none', outline: 'none', borderRadius: 0, padding: 0, margin: 0 }} onClick={() => setFontSizeFactor(f => Math.max(0.7, f - 0.1))} aria-label="Verklein tekstgrootte">
                            <TextDecreaseIcon style={{ width: 24, height: 24 }} />
                        </button>
                    </div>
                </div>
                {/* Hamburger icon alleen op mobiel, nu helemaal rechts */}
                <button
                    className="hamburger"
                    onClick={() => setMobileMenuOpen(v => !v)}
                    aria-label="Menu"
                    style={{
                        display: 'none',
                        background: 'none',
                        border: 'none',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 40,
                        height: 40,
                        cursor: 'pointer',
                        zIndex: 1201,
                        padding: 0,
                        outline: 'none',
                        boxShadow: 'none',
                    }}
                >
                    <span className="hamburger-bar" />
                    <span className="hamburger-bar" />
                    <span className="hamburger-bar" />
                </button>
            </div>
            {/* Mobiel overlay menu */}
            <div className={`mobile-menu-overlay${mobileMenuOpen ? ' open' : ''}`} onClick={() => setMobileMenuOpen(false)} />
            <nav className={`mobile-menu${mobileMenuOpen ? ' open' : ''}`} aria-label="Mobiel menu">
                {/* Toegankelijkheidsicoon bovenaan in de mobiele menu */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.7rem', marginBottom: '1.5rem', position: 'relative' }}>
                    <button
                        aria-label="Toegankelijkheidsuitleg weergeven"
                        onClick={() => setShowA11yInfo(v => !v)}
                        onKeyDown={e => {
                            if (e.key === 'Enter' || e.key === ' ') setShowA11yInfo(v => !v);
                            if (e.key === 'Escape') setShowA11yInfo(false);
                        }}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: 28,
                            padding: 0,
                            margin: 0,
                            color: '#26913a',
                            outline: showA11yInfo ? '3px solid #e2725b' : 'none',
                            borderRadius: 8,
                            transition: 'outline 0.2s',
                        }}
                    >
                        <span role="img" aria-label="Toegankelijkheid / Accessibility">🔊</span>
                    </button>
                    {/* Tooltip/aria-live uitleg in mobiele menu */}
                    {(showA11yInfo) && (
                        <div
                            ref={a11yInfoRef}
                            tabIndex={-1}
                            style={{
                                background: '#fff',
                                color: '#222',
                                border: '2px solid #26913a',
                                borderRadius: 10,
                                boxShadow: '0 4px 18px 0 rgba(44,62,80,0.13)',
                                padding: '1rem 1.2rem',
                                marginLeft: 0,
                                marginTop: 12,
                                fontSize: 16,
                                maxWidth: 340,
                                zIndex: 2000,
                                position: 'absolute',
                                top: '110%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                            }}
                            aria-live="assertive"
                        >
                            {a11yText}
                        </div>
                    )}
                </div>
                <ul>
                    {menuItems.map(item => (
                        <li key={item.label}>
                            {item.hasDropdown ? (
                                <details>
                                    <summary>{item.label}</summary>
                                    <ul>
                                        {dropdownItems.map(drop => (
                                            <li key={drop.label}>
                                                <Link to={drop.to} onClick={handleNavClick}>{drop.label}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </details>
                            ) : (
                                item.to.startsWith('/') ?
                                    <Link to={item.to} onClick={handleNavClick} className={item.className || ''}>{item.label}</Link>
                                    : <a href={item.to} onClick={handleNavClick} className={item.className || ''}>{item.label}</a>
                            )}
                        </li>
                    ))}
                </ul>
                <div className="mobile-menu-actions">
                    {/* Plus en min knoppen onderaan */}
                    <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', marginTop: '1.2rem' }}>
                        <button className="header-plus" onClick={() => setFontSizeFactor(f => Math.min(2, f + 0.1))} aria-label="Vergroot tekstgrootte">
                            <TextIncreaseIcon style={{ width: 24, height: 24 }} />
                        </button>
                        <button className="header-plus" onClick={() => setFontSizeFactor(f => Math.max(0.7, f - 0.1))} aria-label="Verklein tekstgrootte">
                            <TextDecreaseIcon style={{ width: 24, height: 24 }} />
                        </button>
                    </div>
                </div>
            </nav>
            <style>{`
                .hamburger {
                    outline: none !important;
                    border: none !important;
                    box-shadow: none !important;
                }
                .hamburger:focus, .hamburger:active {
                    outline: none !important;
                    border: none !important;
                    box-shadow: none !important;
                }
            `}</style>
        </header>
    );
}

Header.propTypes = {
    setFontSizeFactor: PropTypes.func.isRequired,
};