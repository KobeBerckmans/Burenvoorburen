import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import heroImg from '../assets/images/3mensen.jpg';
import { UserGroupIcon, GiftIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

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
    },
    subtitle: {
        color: '#b6eec0',
        fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
        fontWeight: 500,
        fontFamily: 'Montserrat, sans-serif',
        marginTop: '1rem',
        opacity: 0.95,
        textShadow: '0 2px 12px rgba(0,0,0,0.08)',
    }
};

const sliderPoints = [
    {
        title: 'Wie zoeken we?',
        icon: (
            <UserGroupIcon style={{ width: 48, height: 48, color: '#137c3a', background: '#eaffea', borderRadius: '50%', padding: 8, boxShadow: '0 2px 8px rgba(44,62,80,0.10)' }} />
        ),
        text: `We hebben mensen nodig die:\n\n- Graag mensen helpen;\n- Geen oordeel of uitsluiting verdragen;\n- Respectvol en discreet zijn;\n- Openstaan voor andere culturen, godsdiensten en opvattingen;\n- Achter iemands zijn of oordeel kunnen kijken;\n- Zelf actief willen uitkijken of er in hun buurt ergens ondersteuning nodig is.`
    },
    {
        title: 'Wat krijg je?',
        icon: (
            <GiftIcon style={{ width: 48, height: 48, color: '#137c3a', background: '#eaffea', borderRadius: '50%', padding: 8, boxShadow: '0 2px 8px rgba(44,62,80,0.10)' }} />
        ),
        text: `- Een zinvolle bezigheid;\n- Een grote vrijheid: je bepaalt zelf wat je wil doen, als je een taak niet ziet zitten of de vraag komt ongelegen, dan zoeken we iemand anders;\n- Goede verzekeringen (voor ons afgesloten door Samana): BA, lichamelijke ongevallen, rechtsbijstand en ook een omniumverzekering als je met je auto burendiensten wil verrichten (meer info);\n- Vormingsmomenten;\n- Gezelschap;\n...maar vooral de fantastische kans om in jouw buurt de solidariteit te helpen organiseren, en daarmee ook de grootste aller beloningen: nieuwe vriendschappen!`
    },
    {
        title: 'Dus:',
        icon: (
            <CheckCircleIcon style={{ width: 48, height: 48, color: '#137c3a', background: '#eaffea', borderRadius: '50%', padding: 8, boxShadow: '0 2px 8px rgba(44,62,80,0.10)' }} />
        ),
        text: `Wil je graag je steentje bijdragen? Geef ons dan vlug een seintje (zie hieronder) of neem zelf heel graag even contact op.\n\nDenk je andere geïnteresseerden te kennen? Bezorg ze de naam en link naar deze website. Bedankt!`
    }
];

function Slider({ fontSizeFactor }) {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;
    const isTablet = typeof window !== 'undefined' && window.innerWidth > 600 && window.innerWidth <= 1024;
    const [index, setIndex] = useState(0);
    const visible = isMobile ? 1 : isTablet ? 2 : sliderPoints.length;

    const prev = () => setIndex(i => (i === 0 ? sliderPoints.length - visible : i - 1));
    const next = () => setIndex(i => (i === sliderPoints.length - visible ? 0 : i + 1));

    const getVisiblePoints = () => {
        let arr = [];
        for (let i = 0; i < visible; i++) {
            arr.push(sliderPoints[(index + i) % sliderPoints.length]);
        }
        return arr;
    };
    const visiblePoints = getVisiblePoints();

    return (
        <div style={{
            width: '100%',
            maxWidth: isMobile ? 425 : isTablet ? 650 : 1100,
            margin: isMobile ? '1.2rem auto 0 auto' : '2.5rem auto 0 auto',
            background: 'rgba(234,255,234,0.15)',
            borderRadius: 18,
            boxShadow: '0 4px 18px 0 rgba(44,62,80,0.10)',
            padding: isMobile ? '1.2rem 0.5rem' : isTablet ? '2rem 1rem' : '2.5rem 1.5rem',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: isMobile ? 0 : 32,
            minHeight: isMobile ? 0 : 340,
            position: 'relative',
            overflowX: isMobile ? 'auto' : 'visible',
            scrollSnapType: isMobile ? 'x mandatory' : undefined
        }}>
            {(isMobile || isTablet) && (
                <button onClick={prev} aria-label="Vorige" style={{ position: 'absolute', left: isTablet ? 0 : 8, top: isTablet ? '60%' : '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', fontSize: 28, color: '#e2725b', cursor: 'pointer', zIndex: 2 }}>&lt;</button>
            )}
            {visiblePoints.map((point, idx) => (
                <div key={point.title} style={{
                    width: isMobile ? 200 : isTablet ? 280 : 320,
                    minWidth: isMobile ? 200 : 0,
                    background: 'none',
                    borderRadius: 14,
                    boxShadow: 'none',
                    padding: isMobile ? '0.5rem 0.3rem' : '1.2rem 1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    height: isMobile ? 'auto' : 260,
                    justifyContent: 'flex-start',
                    margin: isMobile && idx > 0 ? '0 0 0 8px' : 0,
                    scrollSnapAlign: isMobile ? 'start' : undefined
                }}>
                    <div style={{ marginBottom: 12 }}>{point.icon}</div>
                    <div style={{ color: '#e2725b', fontWeight: 700, fontSize: (isMobile ? 1.1 : isTablet ? 1 : 1.1) * fontSizeFactor + 'rem', marginBottom: 8, fontFamily: 'CocogooseProTrial', textAlign: 'center' }}>{point.title}</div>
                    <div style={{
                        color: '#222',
                        fontSize: (isMobile ? 0.98 : isTablet ? 0.92 : 1.08) * fontSizeFactor + 'rem',
                        whiteSpace: 'pre-line',
                        textAlign: 'center',
                        maxWidth: 180,
                        lineHeight: 1.35,
                        height: isMobile ? 90 : 140,
                        overflowY: isMobile ? 'auto' : 'auto',
                        margin: '0 auto',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 400
                    }}>{point.text}</div>
                </div>
            ))}
            {(isMobile || isTablet) && (
                <button onClick={next} aria-label="Volgende" style={{ position: 'absolute', right: isTablet ? 0 : 8, top: isTablet ? '60%' : '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', fontSize: 28, color: '#e2725b', cursor: 'pointer', zIndex: 2 }}>&gt;</button>
            )}
        </div>
    );
}

function VrijwilligersForm({ fontSizeFactor }) {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;
    const isTablet = typeof window !== 'undefined' && window.innerWidth > 600 && window.innerWidth <= 1024;
    const [form, setForm] = useState({ naam: '', voornaam: '', adres: '', tel: '', mail: '', motivatie: '' });
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);
        try {
            const res = await fetch('http://localhost:3001/api/volunteers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            if (res.ok) {
                setStatus('success');
                setForm({ naam: '', voornaam: '', adres: '', tel: '', mail: '', motivatie: '' });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section style={{ background: '#fff7f4', padding: isMobile ? '1.5rem 0 1.2rem 0' : isTablet ? '2rem 0 1.5rem 0' : '3rem 0 2rem 0', margin: isMobile ? '1.5rem 0 0 0' : isTablet ? '2.5rem 0 0 0' : '3rem 0 0 0', borderRadius: 18, maxWidth: isMobile ? 425 : isTablet ? 768 : 1100, marginLeft: 'auto', marginRight: 'auto', boxShadow: '0 4px 18px 0 rgba(44,62,80,0.10)' }}>
            <h2 style={{ color: '#e2725b', fontWeight: 800, fontSize: ((isMobile ? 1.1 : isTablet ? 1.7 : 2.2) * fontSizeFactor) + 'rem', textAlign: 'center', fontFamily: 'CocogooseProTrial', marginBottom: '0.5rem', letterSpacing: 1 }}>WORD VRIJWILLIGER</h2>
            <div style={{ color: '#e2725b', textAlign: 'center', marginBottom: isMobile ? '1.2rem' : '2.5rem', fontSize: ((isMobile ? 0.92 : 1.1) * fontSizeFactor) + 'rem' }}>Geïnteresseerd? Laat het ons vlug weten:</div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '0.5rem' : '1.2rem', maxWidth: isMobile ? 220 : isTablet ? 420 : 700, margin: '0 auto' }}>
                <div style={{ display: 'flex', gap: isMobile ? '0.3rem' : '1.2rem', flexDirection: isMobile ? 'column' : 'row' }}>
                    <input name="naam" type="text" placeholder="Naam" value={form.naam} onChange={handleChange} style={{ flex: 1, padding: isMobile ? '0.5rem' : '0.9rem', border: '1.5px solid #e2725b', borderRadius: 6, fontSize: ((isMobile ? 0.95 : 1.1) * fontSizeFactor) + 'rem', fontFamily: 'Montserrat, sans-serif', background: '#fff', color: '#137c3a', width: isMobile ? '100%' : undefined, minWidth: isMobile ? 0 : undefined }} />
                    <input name="voornaam" type="text" placeholder="Voornaam" value={form.voornaam} onChange={handleChange} style={{ flex: 1, padding: isMobile ? '0.5rem' : '0.9rem', border: '1.5px solid #e2725b', borderRadius: 6, fontSize: ((isMobile ? 0.95 : 1.1) * fontSizeFactor) + 'rem', fontFamily: 'Montserrat, sans-serif', background: '#fff', color: '#137c3a', width: isMobile ? '100%' : undefined, minWidth: isMobile ? 0 : undefined }} />
                </div>
                <div style={{ display: 'flex', gap: isMobile ? '0.3rem' : '1.2rem', flexDirection: isMobile ? 'column' : 'row' }}>
                    <input name="adres" type="text" placeholder="Adres" value={form.adres} onChange={handleChange} style={{ flex: 2, padding: isMobile ? '0.5rem' : '0.9rem', border: '1.5px solid #e2725b', borderRadius: 6, fontSize: ((isMobile ? 0.95 : 1.1) * fontSizeFactor) + 'rem', fontFamily: 'Montserrat, sans-serif', background: '#fff', color: '#137c3a', width: isMobile ? '100%' : undefined, minWidth: isMobile ? 0 : undefined }} />
                    <input name="tel" type="text" placeholder="Tel" value={form.tel} onChange={handleChange} style={{ flex: 1, padding: isMobile ? '0.5rem' : '0.9rem', border: '1.5px solid #e2725b', borderRadius: 6, fontSize: ((isMobile ? 0.95 : 1.1) * fontSizeFactor) + 'rem', fontFamily: 'Montserrat, sans-serif', background: '#fff', color: '#137c3a', width: isMobile ? '100%' : undefined, minWidth: isMobile ? 0 : undefined }} />
                </div>
                <input name="mail" type="email" placeholder="Mail" value={form.mail} onChange={handleChange} style={{ padding: isMobile ? '0.5rem' : '0.9rem', border: '1.5px solid #e2725b', borderRadius: 6, fontSize: ((isMobile ? 0.95 : 1.1) * fontSizeFactor) + 'rem', fontFamily: 'Montserrat, sans-serif', background: '#fff', color: '#137c3a', width: isMobile ? '100%' : undefined, minWidth: isMobile ? 0 : undefined }} />
                <textarea name="motivatie" placeholder="Motivatie..." value={form.motivatie} onChange={handleChange} rows={4} style={{ padding: isMobile ? '0.5rem' : '0.9rem', border: '1.5px solid #e2725b', borderRadius: 6, fontSize: ((isMobile ? 0.95 : 1.1) * fontSizeFactor) + 'rem', fontFamily: 'Montserrat, sans-serif', resize: 'vertical', background: '#fff', color: '#137c3a', width: isMobile ? '100%' : undefined, minWidth: isMobile ? 0 : undefined }} />
                <button type="submit" disabled={loading} style={{ background: '#4b8e5b', color: '#fff', fontWeight: 700, fontSize: ((isMobile ? 0.95 : 1.15) * fontSizeFactor) + 'rem', border: 'none', borderRadius: 6, padding: isMobile ? '0.7rem 0' : '1rem 0', marginTop: '0.5rem', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'CocogooseProTrial', letterSpacing: 1 }}>{loading ? 'Verzenden...' : 'VERZEND'}</button>
                {status === 'success' && <div style={{ color: '#26913a', textAlign: 'center', marginTop: 12 }}>Bedankt voor je aanmelding!</div>}
                {status === 'error' && <div style={{ color: '#e2725b', textAlign: 'center', marginTop: 12 }}>Er is iets misgegaan. Probeer opnieuw.</div>}
            </form>
        </section>
    );
}

VrijwilligersForm.propTypes = {
    fontSizeFactor: PropTypes.number.isRequired,
};

const getDevice = () => {
    if (typeof window !== 'undefined') {
        if (window.innerWidth <= 600) return 'mobile';
        if (window.innerWidth > 600 && window.innerWidth <= 1024) return 'tablet';
    }
    return 'desktop';
};

// Web Speech API helper voor DoeJeMee
function speakDoeJeMeeText() {
    if ('speechSynthesis' in window) {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            return;
        }
    }
    const mainContent = document.getElementById('doejemee-main-content');
    let text = '';
    if (mainContent) {
        text = mainContent.innerText;
        // Filter 'Lees meer' knoppen en 🔊 emoji uit de tekst
        text = text.replace(/Lees meer/g, '').replace(/🔊/g, '').replace(/\s{2,}/g, ' ').trim();
    } else {
        text = `Word vrijwilliger bij Buren voor Buren.`;
    }
    console.log('Voorleestekst:', text);
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new window.SpeechSynthesisUtterance(text);
        utterance.lang = 'nl-BE';
        // Kies expliciet een Nederlandse stem
        const voices = window.speechSynthesis.getVoices();
        const dutchVoice = voices.find(v => v.lang && v.lang.startsWith('nl'));
        if (dutchVoice) {
            utterance.voice = dutchVoice;
        }
        utterance.rate = 0.85;
        window.speechSynthesis.speak(utterance);
    } else {
        alert('Deze browser ondersteunt geen voorleesfunctie.');
    }
}

/**
 * Main DoeJeMee component
 * Renders volunteer info, slider, and sign-up logic
 */
export default function DoeJeMee({ fontSizeFactor }) {
    const [device, setDevice] = useState(getDevice());
    useEffect(() => {
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
    const titleFontSize = (isMobile || isTablet ? 2.5 : 3.5) * fontSizeFactor + 'rem';
    const subtitleFontSize = (isMobile || isTablet ? 1.1 : 1.4) * fontSizeFactor + 'rem';
    return (
        <div id="doejemee-main-content" style={{ width: '100%', minHeight: '100vh', background: '#fff' }}>
            <div style={heroResponsive}>
                <div style={heroStyles.overlay} />
                <div style={{ ...heroStyles.content, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                    <h1 style={{ ...heroStyles.title, fontSize: titleFontSize }}>DOE JE MEE?</h1>
                    <p style={{ ...heroStyles.subtitle, fontSize: subtitleFontSize }}>Word vrijwilliger bij Buren voor Buren</p>
                </div>
            </div>
            {/* Screenreader knop */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '1.2rem 0 0 0', width: '100%' }}>
                <button
                    onClick={speakDoeJeMeeText}
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
                    aria-label="Lees de Doe Je Mee pagina voor"
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
            <Slider fontSizeFactor={fontSizeFactor} />
            <VrijwilligersForm fontSizeFactor={fontSizeFactor} />
            <Footer />
            <style>{`
                input::placeholder, textarea::placeholder {
                    color: #000;
                    opacity: 1;
                }
                button[aria-label="Vorige"], button[aria-label="Volgende"] {
                    outline: none !important;
                    border: none !important;
                    box-shadow: none !important;
                }
                button[aria-label="Vorige"]:focus, button[aria-label="Vorige"]:active,
                button[aria-label="Volgende"]:focus, button[aria-label="Volgende"]:active {
                    outline: none !important;
                    border: none !important;
                    box-shadow: none !important;
                }
            `}</style>
        </div>
    );
}

DoeJeMee.propTypes = {
    fontSizeFactor: PropTypes.number.isRequired,
};

Slider.propTypes = {
    fontSizeFactor: PropTypes.number.isRequired,
}; 