import React, { useState } from 'react';
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

function PartnerSlider() {
    const [index, setIndex] = useState(0);
    const visible = 3;
    const max = partners.length;
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
    return (
        <div style={sliderStyles.wrapper}>
            <button onClick={prev} style={sliderStyles.arrow} aria-label="Vorige partners">&#60;</button>
            {visiblePartners.map((p) =>
                p.logo ? (
                    p.url ? (
                        <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <img src={p.logo} alt={p.name} style={sliderStyles.logo} />
                            <div style={sliderStyles.name}>{p.name}</div>
                        </a>
                    ) : (
                        <div key={p.name} style={{ textAlign: 'center' }}>
                            <img src={p.logo} alt={p.name} style={sliderStyles.logo} />
                            <div style={sliderStyles.name}>{p.name}</div>
                        </div>
                    )
                ) : (
                    <div key={p.name} style={{ ...sliderStyles.logo, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb', fontSize: 18, fontStyle: 'italic', flexDirection: 'column' }}>
                        <span>Geen logo</span>
                        <div style={sliderStyles.name}>{p.name}</div>
                    </div>
                )
            )}
            <button onClick={next} style={sliderStyles.arrow} aria-label="Volgende partners">&#62;</button>
        </div>
    );
}

export default function Partners() {
    return (
        <div style={{ width: '100%', minHeight: '100vh', background: '#fff' }}>
            <div style={heroStyles.hero}>
                <div style={heroStyles.overlay} />
                <div style={heroStyles.content}>
                    <h1 style={heroStyles.title}>PARTNERS</h1>
                </div>
            </div>
            <div style={textStyles.wrapper}>
                <div>
                    Onder <Link to="/buurten" style={{ ...textStyles.strong, textDecoration: 'none' }}>&apos;Buurten&apos;</Link> vind je informatie over de coördinatoren en hun buurten.<br />
                    We vinden dat niet enkel mensen, maar ook organisaties elkaar zoveel mogelijk moeten ondersteunen.<br />
                    Daarom werken we met zoveel mogelijk verenigingen en organisaties samen. Onze hoofdpartner is <a href="https://samana.be/" target="_blank" rel="noopener noreferrer" style={{ ...textStyles.strong, textDecoration: 'none' }}>Samana</a>, maar we krijgen ook steun van:
                </div>
            </div>
            <PartnerSlider />
            <Footer />
        </div>
    );
} 