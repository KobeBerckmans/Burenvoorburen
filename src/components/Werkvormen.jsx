import React from 'react';
import Footer from './Footer';
import heroImg from '../assets/images/3mensen.jpg';
import werkvormenImg from '../assets/images/werkvormen.jpg';
import logo from '../assets/images/BVB-Transparant.png';

const heroStyles = {
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
    }
};

const mainStyles = {
    wrapper: {
        background: '#fff',
        padding: '2.5rem 1.5rem 1.5rem 1.5rem',
        textAlign: 'center',
        fontSize: '1.08rem',
        color: '#222',
        fontFamily: 'Montserrat, sans-serif',
        maxWidth: 900,
        margin: '0 auto',
        borderBottom: '1px solid #e0e0e0',
        position: 'relative',
        overflow: 'visible',
    },
    logoOverlay: {
        position: 'relative',
        margin: '-70px auto 1.5rem auto',
        zIndex: 3,
        width: 180,
        maxWidth: '90vw',
        background: 'rgba(255,255,255,0.95)',
        borderRadius: 18,
        boxShadow: '0 2px 12px 0 rgba(44,62,80,0.10)',
        padding: '1.2rem 0.5rem 0.7rem 0.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    logo: {
        width: 120,
        marginBottom: 8,
    },
    columns: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 32,
        margin: '2.5rem 0 2rem 0',
    },
    col: {
        flex: '1 1 320px',
        minWidth: 260,
        maxWidth: 340,
        background: '#fbeeea',
        borderRadius: 18,
        boxShadow: '0 2px 8px 0 rgba(44,62,80,0.08)',
        padding: '2rem 1.2rem 1.2rem 1.2rem',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    colTitle: {
        color: '#e2725b',
        fontWeight: 700,
        fontSize: '1.15rem',
        marginBottom: 16,
        fontFamily: 'Montserrat, sans-serif',
    },
    colList: {
        color: '#222',
        fontSize: '1.08rem',
        fontWeight: 500,
        margin: 0,
        padding: 0,
        listStyle: 'none',
        lineHeight: 1.7,
    },
    image: {
        display: 'block',
        margin: '2.5rem auto',
        maxWidth: 420,
        width: '100%',
        borderRadius: 18,
        boxShadow: '0 2px 12px 0 rgba(44,62,80,0.10)',
    },
    explanation: {
        color: '#26913a',
        fontWeight: 500,
        fontSize: '1.01rem',
        margin: '2.5rem auto 0 auto',
        maxWidth: 700,
        textAlign: 'center',
    },
    svgKrul: {
        position: 'absolute',
        left: '-400px',
        width: '1600px',
        height: '120px',
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.28,
    },
    svgKrulBottom: {
        position: 'absolute',
        left: '-400px',
        bottom: '-40px',
        width: '1600px',
        height: '120px',
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.22,
        transform: 'rotate(180deg)',
    },
};

const getDevice = () => {
    if (typeof window !== 'undefined') {
        if (window.innerWidth <= 600) return 'mobile';
        if (window.innerWidth > 600 && window.innerWidth <= 1024) return 'tablet';
    }
    return 'desktop';
};

export default function Werkvormen() {
    const [device, setDevice] = React.useState(getDevice());
    React.useEffect(() => {
        document.body.dataset.page = 'werkvormen';
        document.documentElement.style.overflowX = 'hidden';
        document.body.style.overflowX = 'hidden';
        const handleResize = () => setDevice(getDevice());
        window.addEventListener('resize', handleResize);
        return () => {
            delete document.body.dataset.page;
            document.documentElement.style.overflowX = '';
            document.body.style.overflowX = '';
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const isMobile = device === 'mobile';
    const isTablet = device === 'tablet';
    const heroResponsive = {
        ...heroStyles.hero,
        height: isMobile ? 180 : isTablet ? 260 : 'min(50vh, 400px)',
        minHeight: isMobile ? 120 : isTablet ? 180 : 320,
        marginTop: isMobile ? 64 : isTablet ? 56 : 0,
    };
    const titleFontSize = isMobile || isTablet ? 'clamp(2rem, 6vw, 2.5rem)' : 'clamp(2.5rem, 5vw, 3.5rem)';
    return (
        <div style={{ width: '100%', minHeight: '100vh', background: '#fff' }}>
            <div style={heroResponsive}>
                <div style={heroStyles.overlay} />
                <div style={heroStyles.content}>
                    <h1 style={{ ...heroStyles.title, fontSize: titleFontSize }}>WERKVORMEN</h1>
                </div>
            </div>
            <div style={mainStyles.wrapper}>
                {/* SVG-krul bovenaan */}
                <svg style={mainStyles.svgKrul} viewBox="0 0 1600 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10,110 Q400,10 800,60 T1590,30" stroke="#e2725b" strokeWidth="7" fill="none" />
                </svg>
                <div style={mainStyles.logoOverlay}>
                    <img src={logo} alt="Buren voor Buren logo" style={mainStyles.logo} />
                </div>
                <img src={werkvormenImg} alt="Werkvormen" style={mainStyles.image} />
                <div style={mainStyles.explanation}>
                    Het zorgnetwerk kan op allerlei manieren ingezet worden. De methodes of organisatievormen om te komen tot zorgzame buurten, situeren zich tussen twee polen: die van de (individuele) ondersteuning en die van de verbinding. Hieronder een aantal voorbeelden. We gaan ervan uit dat de burenhulp in alle buurten georganiseerd wordt, maar verder kan elke buurt naargelang van eigen mogelijkheden en inzichten een keuze maken.
                </div>
                {/* SVG-krul onderaan */}
                <svg style={mainStyles.svgKrulBottom} viewBox="0 0 1600 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10,110 Q400,10 800,60 T1590,30" stroke="#e2725b" strokeWidth="7" fill="none" />
                </svg>
            </div>
            <Footer />
        </div>
    );
} 