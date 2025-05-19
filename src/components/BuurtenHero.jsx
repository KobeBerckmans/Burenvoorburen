import React from 'react';
import heroImg from '../assets/images/3mensen.jpg';

const styles = {
    hero: {
        width: '100%',
        height: 'min(40vh, 220px)',
        minHeight: 120,
        background: `url(${heroImg}) center/cover no-repeat`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5))',
        zIndex: 1,
    },
    content: {
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        padding: '0 1.5rem',
        maxWidth: 800,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 'clamp(2rem, 6vw, 2.5rem)',
        fontWeight: 700,
        fontFamily: 'CocogooseProTrial',
        letterSpacing: 2,
        textShadow: '0 4px 24px rgba(0,0,0,0.3)',
        margin: 0,
        lineHeight: 1.2,
        textAlign: 'center',
    },
    subtitle: {
        color: '#d0f7d2',
        fontSize: 'clamp(1rem, 3vw, 1.1rem)',
        fontWeight: 500,
        fontFamily: 'Montserrat, sans-serif',
        marginTop: '0.7rem',
        opacity: 0.9,
        textShadow: '0 2px 12px rgba(0,0,0,0.2)',
        textAlign: 'center',
    }
};

// Responsive inline styles voor mobile/tablet
const isMobile = window.innerWidth <= 600;
const isTablet = window.innerWidth > 600 && window.innerWidth <= 1024;
const heroHeight = isMobile ? 260 : isTablet ? 340 : 'min(50vh, 400px)';

// Dynamische fontSize voor title en subtitle
const titleFontSize = isMobile || isTablet ? 'clamp(2rem, 6vw, 2.5rem)' : 'clamp(2.5rem, 5vw, 3.5rem)';
const subtitleFontSize = isMobile || isTablet ? 'clamp(1rem, 3vw, 1.1rem)' : 'clamp(1.1rem, 2vw, 1.4rem)';

export default function BuurtenHero() {
    // Extra style voor mobile/tablet: iets meer naar rechts en naar onder
    const contentOffset = (isMobile || isTablet)
        ? { marginLeft: '8vw', marginTop: '32px' }
        : {};

    return (
        <div style={{ ...styles.hero, height: heroHeight }}>
            <div style={styles.overlay} />
            <div style={{ ...styles.content, ...contentOffset }}>
                <h1 style={{ ...styles.title, fontSize: titleFontSize }}>BUURTEN</h1>
                <p style={{ ...styles.subtitle, fontSize: subtitleFontSize }}>Ontdek de buurten en contreien van Tienen</p>
            </div>
        </div>
    );
} 