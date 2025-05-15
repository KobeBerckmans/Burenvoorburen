import React from 'react';
import heroImg from '../assets/images/3mensen.jpg';

const styles = {
    hero: {
        width: '100%',
        height: '320px',
        background: `url(${heroImg}) center/cover no-repeat`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.25)',
        zIndex: 1,
    },
    title: {
        color: '#fff',
        fontSize: '3.2rem',
        fontWeight: 700,
        fontFamily: 'CocogooseProTrial',
        zIndex: 2,
        letterSpacing: 2,
        textShadow: '0 4px 24px #0008',
    }
};

export default function BuurtenHero() {
    return (
        <div style={styles.hero}>
            <div style={styles.overlay} />
            <span style={styles.title}>BUURTEN</span>
        </div>
    );
} 