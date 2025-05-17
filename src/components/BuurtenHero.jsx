import React from 'react';
import heroImg from '../assets/images/3mensen.jpg';

const styles = {
    hero: {
        width: '100%',
        height: 'min(50vh, 400px)',
        minHeight: 320,
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
    },
    title: {
        color: '#fff',
        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
        fontWeight: 700,
        fontFamily: 'CocogooseProTrial',
        letterSpacing: 2,
        textShadow: '0 4px 24px rgba(0,0,0,0.3)',
        margin: 0,
        lineHeight: 1.2,
    },
    subtitle: {
        color: '#d0f7d2',
        fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
        fontWeight: 500,
        fontFamily: 'Montserrat, sans-serif',
        marginTop: '1rem',
        opacity: 0.9,
        textShadow: '0 2px 12px rgba(0,0,0,0.2)',
    }
};

export default function BuurtenHero() {
    return (
        <div style={styles.hero}>
            <div style={styles.overlay} />
            <div style={styles.content}>
                <h1 style={styles.title}>BUURTEN</h1>
                <p style={styles.subtitle}>Ontdek de buurten en contreien van Tienen</p>
            </div>
        </div>
    );
} 