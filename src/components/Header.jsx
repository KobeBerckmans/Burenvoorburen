import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/BVB-Transparant.png';
import '../styles/Header.css';

const menuItems = [
    { label: 'Home', to: '/' },
    { label: 'Buurten', to: '/buurten' },
    { label: 'Doe je mee?', to: '/doe-je-mee' },
    { label: 'Over ons', to: '/partners' },
    { label: 'Contact', to: '/contact' },
    { label: 'Meer', to: '#', hasDropdown: true },
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

export default function Header() {
    const [activeDropdown, setActiveDropdown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setActiveDropdown(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="header">
            <div className="header-inner">
                <img src={logo} alt="Buren voor Buren logo" className="header-logo" />
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
                                <Link to={item.to} className="header-link" key={item.label}>{item.label}</Link>
                                : <a href={item.to} className="header-link" key={item.label}>{item.label}</a>
                        )
                    ))}
                </nav>
                <div className="header-actions">
                    <Link to="/hulp" className="header-help">HULP?</Link>
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