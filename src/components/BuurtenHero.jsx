import React from 'react';
import PropTypes from 'prop-types';
import heroImg from '../assets/images/3mensen.jpg';

const styles = {
    hero: {
        width: '100%',
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

const getDevice = () => {
    if (typeof window !== 'undefined') {
        if (window.innerWidth <= 600) return 'mobile';
        if (window.innerWidth > 600 && window.innerWidth <= 1024) return 'tablet';
    }
    return 'desktop';
};

function BuurtenHero({ fontSizeFactor }) {
    const [device, setDevice] = React.useState(getDevice());
    React.useEffect(() => {
        const handleResize = () => setDevice(getDevice());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const isMobile = device === 'mobile';
    const isTablet = device === 'tablet';
    const heroResponsive = {
        ...styles.hero,
        height: isMobile ? 180 : isTablet ? 260 : 'min(50vh, 400px)',
        minHeight: isMobile ? 120 : isTablet ? 180 : 320,
        marginTop: isMobile ? 64 : isTablet ? 56 : 0,
    };
    const titleFontSize = (isMobile || isTablet ? 2.5 : 3.5) * fontSizeFactor + 'rem';
    const subtitleFontSize = (isMobile || isTablet ? 1.1 : 1.4) * fontSizeFactor + 'rem';
    return (
        <div style={heroResponsive}>
            <div style={styles.overlay} />
            <div style={styles.content}>
                <h1 style={{ ...styles.title, fontSize: titleFontSize }}>BUURTEN</h1>
                <p style={{ ...styles.subtitle, fontSize: subtitleFontSize }}>Ontdek de buurten van Tienen</p>
            </div>
        </div>
    );
}

BuurtenHero.propTypes = {
    fontSizeFactor: PropTypes.number.isRequired,
};

export default BuurtenHero; 