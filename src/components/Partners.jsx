import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import heroImg from '../assets/images/3mensen.jpg';
import burgersaanzetLogo from '../assets/images/partners/burgersaanzet.png';
import curieusLogo from '../assets/images/partners/curieus.png';
import dekoepelLogo from '../assets/images/partners/dekoepel.png';
import femmaLogo from '../assets/images/partners/femma.png';
import fietsersbondLogo from '../assets/images/partners/fietsersbond.jpg';
import huisvandeMensLogo from '../assets/images/partners/huisvdmens.png';
import inzLogo from '../assets/images/partners/inz.png';
import kumtichcomiteLogo from '../assets/images/partners/kumtichcomite.png';
import landelijkeGildenLogo from '../assets/images/partners/Landelijke-Gilden-1.png';
import okraLogo from '../assets/images/partners/okra.png';
import taalinpraktijkLogo from '../assets/images/partners/taalinpraktijk.png';
import vissenakenLogo from '../assets/images/partners/vissenaken.png';
import tienenLogo from '../assets/images/partners/tienen.png';
import tienensolidairLogo from '../assets/images/partners/solidairtienen.jpeg';
import { Link } from 'react-router-dom';

const partners = [
    { name: 'BurgersAanZet', logo: burgersaanzetLogo, url: 'https://burgersaanzet.be/' },
    { name: 'Curieus', logo: curieusLogo, url: 'https://curieus.be/' },
    { name: 'De Koepel vzw', logo: dekoepelLogo, url: 'https://ocdekoepel.be/' },
    { name: 'Femma Houtem', logo: femmaLogo, url: 'https://www.femma.be/nl/jouw-femma-de-buurt/femma-sint-margriete-houtem' },
    { name: 'Fietsersbond', logo: fietsersbondLogo, url: 'https://www.fietsersbond.be/tienen' },
    { name: 'huisvandeMens', logo: huisvandeMensLogo, url: 'https://www.vrijzinnigbrabant.be/huisvandemens' },
    { name: 'IN-Z', logo: inzLogo, url: 'https://in-z.be/' },
    { name: 'Kumtichcomité', logo: kumtichcomiteLogo, url: 'https://www.kumtichcomité.be/' },
    { name: 'Landelijke Gilden', logo: landelijkeGildenLogo, url: 'https://www.landelijkegilden.be/' },
    { name: 'Okra', logo: okraLogo, url: 'https://okra.be/' },
    { name: 'Taal in Praktijk', logo: taalinpraktijkLogo, url: 'https://taalinpraktijk.jimdofree.com/' },
    { name: 'TienenSolidair', logo: tienensolidairLogo, url: 'https://www.facebook.com/SolidairTienen/' },
    { name: 'Ons dorp leeft vzw', logo: vissenakenLogo, url: 'https://www.vissenaken.be/vissenakenleeft/' },
    { name: 'Stad Tienen', logo: tienenLogo, url: 'https://www.tienen.be/' },
];

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
        color: '#FFF',
        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
        fontWeight: 700,
        fontFamily: 'CocogooseProTrial',
        letterSpacing: 2,
        textShadow: '0 4px 24px rgba(0,0,0,0.3)',
        margin: 0,
        lineHeight: 1.2,
    }
};

const textStyles = {
    wrapper: {
        background: '#fff',
        padding: '2.5rem 1.5rem 1.5rem 1.5rem',
        textAlign: 'center',
        fontSize: '1.1rem',
        color: '#222',
        fontFamily: 'Montserrat, sans-serif',
        fontStyle: 'italic',
        maxWidth: 900,
        margin: '0 auto',
        borderBottom: '1px solid #e0e0e0',
    },
    strong: {
        fontWeight: 700,
        fontStyle: 'normal',
        color: '#26913a',
    }
};

const sliderStyles = {
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        margin: '2.5rem auto',
        maxWidth: 900,
        minHeight: 180,
    },
    arrow: {
        fontSize: 36,
        color: '#e2725b',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        userSelect: 'none',
        transition: 'color 0.2s',
    },
    logo: {
        width: 120,
        height: 120,
        objectFit: 'contain',
        background: '#f8f8f8',
        borderRadius: 18,
        boxShadow: '0 2px 8px 0 rgba(44,62,80,0.08)',
        margin: '0 12px',
        display: 'block',
    },
    name: {
        marginTop: 12,
        fontWeight: 600,
        color: '#26913a',
        fontSize: '1.08rem',
        textAlign: 'center',
        fontFamily: 'Montserrat, sans-serif',
    }
};

function PartnerSlider({ fontSizeFactor }) {
    const getVisibleCount = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth <= 600) return 1;
            if (window.innerWidth > 600 && window.innerWidth <= 1024) return 2;
        }
        return 3;
    };
    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(getVisibleCount());
    const max = partners.length;

    React.useEffect(() => {
        const handleResize = () => {
            setVisible(getVisibleCount());
            // Zorg dat index niet buiten bereik valt
            setIndex(i => {
                if (i > max - getVisibleCount()) return 0;
                return i;
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [max]);

    const prev = () => setIndex(i => (i === 0 ? max - visible : i - 1));
    const next = () => setIndex(i => (i === max - visible ? 0 : i + 1));
    const getVisible = () => {
        let arr = [];
        for (let i = 0; i < visible; i++) {
            arr.push(partners[(index + i) % max]);
        }
        return arr;
    };
    const visiblePartners = getVisible();
    // Responsive wrapper style
    const isMobile = visible === 1;
    const isTablet = visible === 2;
    const wrapperStyle = {
        ...sliderStyles.wrapper,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isMobile ? 8 : isTablet ? 18 : 24,
        minHeight: isMobile ? 160 : isTablet ? 160 : 180,
        maxWidth: isMobile ? 320 : isTablet ? 540 : 900,
        margin: isMobile ? '1.2rem auto' : isTablet ? '2rem auto' : '2.5rem auto',
    };
    return (
        <div style={wrapperStyle}>
            <button onClick={prev} style={{ ...sliderStyles.arrow, fontSize: 36 * fontSizeFactor }} aria-label="Vorige partners">&#60;</button>
            {visiblePartners.map((p) =>
                p.logo ? (
                    p.url ? (
                        <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <img src={p.logo} alt={p.name} style={sliderStyles.logo} />
                            <div style={{ ...sliderStyles.name, fontSize: (1.08 * fontSizeFactor) + 'rem' }}>{p.name}</div>
                        </a>
                    ) : (
                        <div key={p.name} style={{ textAlign: 'center' }}>
                            <img src={p.logo} alt={p.name} style={sliderStyles.logo} />
                            <div style={{ ...sliderStyles.name, fontSize: (1.08 * fontSizeFactor) + 'rem' }}>{p.name}</div>
                        </div>
                    )
                ) : (
                    <div key={p.name} style={{ ...sliderStyles.logo, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb', fontSize: 18 * fontSizeFactor, fontStyle: 'italic', flexDirection: 'column' }}>
                        <span>Geen logo</span>
                        <div style={{ ...sliderStyles.name, fontSize: (1.08 * fontSizeFactor) + 'rem' }}>{p.name}</div>
                    </div>
                )
            )}
            <button onClick={next} style={{ ...sliderStyles.arrow, fontSize: 36 * fontSizeFactor }} aria-label="Volgende partners">&#62;</button>
        </div>
    );
}

PartnerSlider.propTypes = {
    fontSizeFactor: PropTypes.number.isRequired,
};

const getDevice = () => {
    if (typeof window !== 'undefined') {
        if (window.innerWidth <= 600) return 'mobile';
        if (window.innerWidth > 600 && window.innerWidth <= 1024) return 'tablet';
    }
    return 'desktop';
};

// Web Speech API helper voor Partners
function speakPartnersText() {
    if ('speechSynthesis' in window) {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            return;
        }
    }
    const mainContent = document.getElementById('partners-main-content');
    let text = '';
    if (mainContent) {
        text = mainContent.innerText;
        // Filter 'Lees meer' knoppen en 🔊 emoji uit de tekst
        text = text.replace(/Lees meer/g, '').replace(/🔊/g, '').replace(/\s{2,}/g, ' ').trim();
    } else {
        text = `Onze partners van Buren voor Buren.`;
    }
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new window.SpeechSynthesisUtterance(text);
        utterance.lang = 'nl-BE';
        utterance.rate = 0.85;
        window.speechSynthesis.speak(utterance);
    } else {
        alert('Deze browser ondersteunt geen voorleesfunctie.');
    }
}

function Partners({ fontSizeFactor }) {
    const [device, setDevice] = React.useState(getDevice());
    React.useEffect(() => {
        const handleResize = () => setDevice(getDevice());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const isMobile = device === 'mobile';
    const isTablet = device === 'tablet';
    const heroResponsive = {
        ...heroStyles.hero,
        height: isMobile ? 180 : isTablet ? 260 : 'min(50vh, 400px)',
        minHeight: isMobile ? 120 : isTablet ? 180 : 320,
        marginTop: isMobile ? 64 : isTablet ? 56 : 0,
    };
    return (
        <div id="partners-main-content" style={{ width: '100%', minHeight: '100vh', background: '#fff' }}>
            <div style={heroResponsive}>
                <div style={heroStyles.overlay} />
                <div style={heroStyles.content}>
                    <h1 style={{ ...heroStyles.title, fontSize: `calc(3.2rem * ${fontSizeFactor})` }}>PARTNERS</h1>
                </div>
            </div>
            {/* Screenreader knop */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '1.2rem 0 0 0', width: '100%' }}>
                <button
                    onClick={speakPartnersText}
                    style={{
                        fontSize: 18 * fontSizeFactor,
                        padding: '0.7em 2em',
                        borderRadius: 10,
                        border: '2.5px solid #26913a',
                        background: '#eaffea',
                        color: '#137c3a',
                        fontWeight: 900,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        boxShadow: '0 0 0 4px #e2725b33',
                        outline: 'none',
                        position: 'relative',
                        zIndex: 100,
                        animation: 'bvb-blink 1.2s linear infinite',
                        textTransform: 'uppercase',
                        letterSpacing: 1.5,
                        transition: 'box-shadow 0.2s, border 0.2s',
                    }}
                    aria-label="Lees de Partners pagina voor"
                >
                    <span role="img" aria-label="speaker" style={{ fontSize: 24 * fontSizeFactor }}>🔊</span>
                    <span style={{ fontSize: 18 * fontSizeFactor, fontFamily: 'CocogooseProTrial', fontWeight: 900 }}>Lees voor</span>
                </button>
                <style>{`
                    @keyframes bvb-blink {
                        0%, 100% { box-shadow: 0 0 0 4px #e2725b33, 0 0 16px 4px #e2725b44; border-color: #26913a; }
                        50% { box-shadow: 0 0 0 8px #e2725b77, 0 0 32px 8px #e2725b99; border-color: #e2725b; }
                    }
                    button[aria-label] {
                        outline: 3px solid #e2725b55;
                    }
                `}</style>
            </div>
            <div style={{ ...textStyles.wrapper, fontSize: `calc(1.1rem * ${fontSizeFactor})` }}>
                <div>
                    Onder <Link to="/buurten" style={{ ...textStyles.strong, textDecoration: 'none', fontSize: `calc(1.1rem * ${fontSizeFactor})` }}>&apos;Buurten&apos;</Link> vind je informatie over de coördinatoren en hun buurten.<br />
                    We vinden dat niet enkel mensen, maar ook organisaties elkaar zoveel mogelijk moeten ondersteunen.<br />
                    Daarom werken we met zoveel mogelijk verenigingen en organisaties samen. Onze hoofdpartner is <a href="https://samana.be/" target="_blank" rel="noopener noreferrer" style={{ ...textStyles.strong, textDecoration: 'none', fontSize: `calc(1.1rem * ${fontSizeFactor})` }}>Samana</a>, maar we krijgen ook steun van:
                </div>
            </div>
            <PartnerSlider fontSizeFactor={fontSizeFactor} />
            <Footer />
        </div>
    );
}

Partners.propTypes = {
    fontSizeFactor: PropTypes.number.isRequired,
};

export default Partners; 