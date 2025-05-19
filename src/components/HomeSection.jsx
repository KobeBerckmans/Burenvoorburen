import React, { useState, useEffect, useRef } from 'react';
import mensenImg from '../assets/images/3mensen.jpg';
import puzzelImg from '../assets/images/puzzel.jpg';
import logoImg from '../assets/images/BVB-Transparant.png';
import communityImg from '../assets/images/community.jpg';
import NewsFeed from './NewsFeed';
import VideoSection from './VideoSection';
import Footer from './Footer';
import FadeInOnScroll from './FadeInOnScroll';

function HomeSlider() {
    const points = [
        {
            title: 'Voor wie?',
            icon: (
                <svg width="48" height="48" viewBox="0 0 48 48" style={{ display: 'block' }}>
                    <circle cx="24" cy="24" r="22" fill="#137c3a" />
                    <path d="M24 18a6 6 0 1 1 0 12a6 6 0 0 1 0-12z" fill="#fff" />
                    <path d="M16 36c0-4 4-8 8-8s8 4 8 8" stroke="#fff" strokeWidth="2" fill="none" />
                </svg>
            ),
            text: `Voor al wie ondersteuning nodig heeft en weinig of geen beroep kan doen op familie of vrienden,\n\nIn de eerste plaats de meest kwetsbaren: ouderen, mensen met een fysieke of mentale kwetsbaarheid, of met heel weinig financiële mogelijkheden, (anderstalige) nieuwkomers, mensen die zich eenzaam voelen…\n\nMaar iedereen is op een of ander gebied kwetsbaar, of kan het plots worden. Dat kan ook tijdelijk zijn: je wordt plots ziek, je mantelzorger wil er even een dagje tussenuit, je partner moet naar het ziekenhuis… Iedereen mag dus een beroep op ons doen.`
        },
        {
            title: 'Wat bieden we?',
            icon: (
                <svg width="48" height="48" viewBox="0 0 48 48" style={{ display: 'block' }}>
                    <circle cx="24" cy="24" r="22" fill="#137c3a" />
                    <polyline points="16,28 22,34 34,20" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            text: `- Een zinvolle bezigheid;\n- Een grote vrijheid: je bepaalt zelf wat je wil doen, als je een taak niet ziet zitten of de vraag komt ongelegen, dan zoeken we iemand anders;\n- Goede verzekeringen (voor ons afgesloten door Samana): BA, lichamelijke ongevallen, rechtsbijstand en ook een omniumverzekering als je met je auto burendiensten wil verrichten (meer info);\n- Vormingsmomenten;\n- Gezelschap;\n…maar vooral de fantastische kans om in jouw buurt de solidariteit te helpen organiseren, en daarmee ook de grootste aller beloningen: nieuwe vriendschappen!`
        },
        {
            title: 'Maar ook:',
            icon: (
                <svg width="48" height="48" viewBox="0 0 48 48" style={{ display: 'block' }}>
                    <circle cx="24" cy="24" r="22" fill="#137c3a" />
                    <path d="M24 16v16M16 24h16" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
            ),
            text: `We zorgen voor sociaal contact door gezelschap te bieden, samen te wandelen, voor te lezen of boodschappen te doen. Vervoer kan in uitzonderlijke gevallen, zoals naar de dokter, met een kilometervergoeding. Als we zelf niet kunnen helpen, zoeken we graag mee naar de juiste hulp.`
        },
        {
            title: 'Hoe werkt het?',
            icon: (
                <svg width="48" height="48" viewBox="0 0 48 48" style={{ display: 'block' }}>
                    <circle cx="24" cy="24" r="22" fill="#137c3a" />
                    <path d="M32 18l-8 8-4-4" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                    <rect x="16" y="30" width="16" height="2" rx="1" fill="#fff" />
                </svg>
            ),
            text: `Bel ons gewoon op, of geef je vraag door via het elektronische formulier onder 'contact' hierboven.`
        },
        {
            title: 'Waar?',
            icon: (
                <svg width="48" height="48" viewBox="0 0 48 48" style={{ display: 'block' }}>
                    <circle cx="24" cy="24" r="22" fill="#137c3a" />
                    <path d="M24 16a8 8 0 1 1 0 16a8 8 0 0 1 0-16z" fill="#fff" />
                    <circle cx="24" cy="24" r="3" fill="#137c3a" />
                    <path d="M24 28v4" stroke="#137c3a" strokeWidth="2" />
                </svg>
            ),
            text: `Voorlopig enkel in de buurten Bost, Kumtich, Potterij en Watertoren (Park Passionisten), maar hopelijk straks in heel Tienen, dankzij jouw hulp misschien. Geïnteresseerd? Lees dan zeker dit.`
        },
        {
            title: 'Voorwaarden',
            icon: (
                <svg width="48" height="48" viewBox="0 0 48 48" style={{ display: 'block' }}>
                    <circle cx="24" cy="24" r="22" fill="#137c3a" />
                    <rect x="16" y="18" width="16" height="12" rx="2" fill="#fff" />
                    <path d="M20 24h8" stroke="#137c3a" strokeWidth="2" />
                </svg>
            ),
            text: `Onze burenhulp is gratis, maar voor vervoer reken we wel de wettelijke kilometervergoeding aan. Verder kunnen we niet op álle vragen ingaan. Het moet gaan om hulp die beperkt is in duur en die niet aangeboden wordt door professionelen en bestaande diensten (gezinshulp, poetshulp…)`
        },
    ];
    const [index, setIndex] = useState(0);
    // Responsive visible count
    const isMobile = window.innerWidth <= 600;
    const isTablet = window.innerWidth > 600 && window.innerWidth <= 1024;
    const visible = isMobile ? 1 : isTablet ? 2 : 3;
    const prev = () => setIndex(i => (i === 0 ? points.length - 1 : i - 1));
    const next = () => setIndex(i => (i === points.length - visible ? 0 : i + 1));
    // Zorg dat de slider wrapt als je voorbij het einde gaat
    const getVisiblePoints = () => {
        let arr = [];
        for (let i = 0; i < visible; i++) {
            arr.push(points[(index + i) % points.length]);
        }
        return arr;
    };
    const visiblePoints = getVisiblePoints();
    return (
        <div style={{
            width: isMobile ? '95vw' : '100%',
            maxWidth: isMobile ? 320 : isTablet ? 540 : 1100,
            margin: '2.5rem auto 0 auto',
            background: 'rgba(234,255,234,0.15)',
            borderRadius: 18,
            boxShadow: '0 4px 18px 0 rgba(44,62,80,0.10)',
            padding: isMobile ? '1.2rem 0.5rem' : isTablet ? '1.2rem 0.5rem' : '2.5rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            minHeight: isMobile ? 220 : isTablet ? 220 : 340,
            justifyContent: 'center',
        }}>
            <button onClick={prev} style={{
                position: 'static',
                marginRight: isMobile ? 8 : isTablet ? 2 : 0,
                background: 'none',
                border: 'none',
                width: 38,
                height: 38,
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 2,
            }}>
                <svg width="38" height="38" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#e2725b" strokeWidth="3.5" fill="none" strokeLinecap="round" /></svg>
            </button>
            <div style={{ display: 'flex', flex: 1, justifyContent: 'center', gap: isMobile ? 0 : isTablet ? 12 : 32 }}>
                {visiblePoints.map((point) => (
                    <div key={point.title} style={{ width: isMobile ? 220 : isTablet ? 220 : 320, minWidth: 0, background: 'none', borderRadius: 14, boxShadow: 'none', padding: isMobile ? '0.7rem 0.5rem' : isTablet ? '0.7rem 0.5rem' : '1.2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: isMobile ? 160 : isTablet ? 160 : 260, justifyContent: 'flex-start' }}>
                        <div style={{ marginBottom: 12 }}>{point.icon}</div>
                        <div style={{ color: '#e2725b', fontWeight: 700, fontSize: isMobile ? '1.1rem' : isTablet ? '1rem' : '1.1rem', marginBottom: 8, fontFamily: 'CocogooseProTrial', textAlign: 'center' }}>{point.title}</div>
                        <div style={{ color: '#222', fontSize: isMobile ? '0.92rem' : isTablet ? '0.82rem' : '0.98rem', whiteSpace: 'pre-line', textAlign: 'center', maxWidth: isMobile ? 180 : isTablet ? 170 : 260, lineHeight: 1.35, height: isMobile ? 80 : isTablet ? 70 : 140, overflow: 'auto', margin: '0 auto', fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>{point.text}</div>
                    </div>
                ))}
            </div>
            <button onClick={next} style={{
                position: 'static',
                marginLeft: isMobile ? 8 : isTablet ? 2 : 0,
                background: 'none',
                border: 'none',
                width: 38,
                height: 38,
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 2,
            }}>
                <svg width="38" height="38" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke="#e2725b" strokeWidth="3.5" fill="none" strokeLinecap="round" /></svg>
            </button>
        </div>
    );
}

// Dynamische quote met animatie bij in beeld komen
function AnimatedQuote() {
    const [visible, setVisible] = useState(false);
    const ref = useRef();
    useEffect(() => {
        const observer = new window.IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            { threshold: 0.4 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current); };
    }, []);
    const isMobile = window.innerWidth <= 600;
    const isTablet = window.innerWidth > 600 && window.innerWidth <= 1024;
    return (
        <div style={{ width: '100%', maxWidth: isMobile ? 320 : isTablet ? 500 : 800, margin: isMobile ? '1.5rem auto' : isTablet ? '2rem auto' : '3.5rem auto', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: isMobile ? 80 : isTablet ? 100 : 160 }}>
            <div
                ref={ref}
                className={`quote-card${visible ? ' quote-card-animate' : ''}`}
                style={{
                    background: 'linear-gradient(105deg, #eaffea 80%, #fff 100%)',
                    borderRadius: 32,
                    boxShadow: '0 6px 32px 0 rgba(44,62,80,0.13)',
                    padding: isMobile ? '1rem 0.7rem 1rem 1.2rem' : isTablet ? '1.2rem 1rem 1.2rem 1.5rem' : '2.5rem 2.5rem 2.5rem 3.5rem',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: isMobile ? 60 : isTablet ? 70 : 120,
                    width: '100%',
                    maxWidth: isMobile ? 260 : isTablet ? 350 : 700,
                    transform: 'skew(-6deg, 0deg)',
                    transition: 'box-shadow 0.25s, transform 0.25s',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                }}
            >
                <span style={{ color: '#e2725b', fontSize: isMobile ? '1.2rem' : isTablet ? '1.5rem' : '2.2rem', fontWeight: 700, fontFamily: 'CocogooseProTrial', marginRight: isMobile ? 7 : isTablet ? 10 : 14, transform: 'skew(6deg, 0deg)' }}>&ldquo;</span>
                <span style={{ fontSize: isMobile ? '0.78rem' : isTablet ? '1rem' : '1.65rem', maxWidth: isMobile ? 140 : isTablet ? 180 : undefined, fontStyle: 'italic', color: '#137c3a', fontFamily: 'Poppins, serif', fontWeight: 500, transform: 'skew(6deg, 0deg)', display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>
                    Beter een goede buur dan een verre vriend
                </span>
                <span style={{ color: '#e2725b', fontSize: isMobile ? '1.2rem' : isTablet ? '1.5rem' : '2.2rem', fontWeight: 700, fontFamily: 'CocogooseProTrial', marginLeft: isMobile ? 7 : isTablet ? 10 : 16, transform: 'skew(6deg, 0deg)' }}>&rdquo;</span>
            </div>
            <style>{`
                .quote-card {
                    opacity: 0;
                    transform: translateY(40px) skew(-6deg, 0deg);
                }
                .quote-card-animate {
                    opacity: 1 !important;
                    transform: translateY(0) skew(-6deg, 0deg) scale(1.035) !important;
                    box-shadow: 0 10px 40px 0 rgba(44,62,80,0.18) !important;
                    transition: box-shadow 0.25s, transform 0.7s cubic-bezier(.4,1.7,.7,1.01), opacity 0.7s;
                }
            `}</style>
        </div >
    );
}

export default function HomeSection() {
    // Hoogte van het vlak groter maken dan de images
    const greenHeight = 360; // bijvoorbeeld 400px
    // Richtingen voor animatie per onderdeel
    const fadeDirections = ['right', 'left', 'up', 'right', 'left', 'up'];
    // Media query styles
    const isMobile = window.innerWidth <= 600;
    // Desktop waarden voor groene vlak en image box
    const greenLeft = 120;
    const greenWidth = 420;
    const imageBoxHeight = 260;
    // Responsive styles
    const responsiveSection = {
        background: 'white',
        padding: window.innerWidth <= 600 ? '0 1rem' : window.innerWidth > 600 && window.innerWidth <= 1024 ? '0 2rem' : '0 3rem',
        position: 'relative',
        width: '100%',
        minHeight: window.innerWidth <= 600 ? 'auto' : greenHeight + 80,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: window.innerWidth <= 600 ? 24 : 0,
    };
    if (window.innerWidth <= 600) {
        responsiveSection.flexDirection = 'column';
        responsiveSection.padding = '0 1rem';
        responsiveSection.minHeight = 'auto';
    } else if (window.innerWidth > 600 && window.innerWidth <= 1024) {
        responsiveSection.padding = '0 2rem';
    } else {
        responsiveSection.padding = '0 3rem';
    }
    return (
        <div style={{ maxWidth: 1440, margin: '0 auto', position: 'relative', overflowX: 'hidden', width: '100%' }}>
            <FadeInOnScroll delay={0} direction={fadeDirections[0]}>
                {(window.innerWidth > 1024 || (window.innerWidth > 600 && window.innerWidth <= 1024)) ? (
                    // DESKTOP & TABLET: zelfde layoutstructuur, maar op tablet alles kleiner
                    (() => {
                        // Tablet: kleinere waarden
                        const isTablet = window.innerWidth > 600 && window.innerWidth <= 1024;
                        const tabletScale = isTablet ? 0.7 : 1; // schaalfactor voor tablet
                        const sectionStyle = {
                            background: 'white',
                            padding: '0',
                            position: 'relative',
                            width: '100%',
                            minHeight: greenHeight * tabletScale + 80 * tabletScale,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        };
                        const svgStyle = {
                            position: 'absolute',
                            top: isTablet ? '-25px' : '-35px',
                            left: isTablet ? '-600px' : '-900px',
                            zIndex: 20,
                            pointerEvents: 'none',
                            width: isTablet ? 1400 : 2200,
                            height: isTablet ? 120 : 200,
                        };
                        const greenStyle = {
                            position: 'absolute',
                            left: isTablet ? 60 : greenLeft,
                            top: isTablet ? 20 : 40,
                            width: isTablet ? greenWidth * 0.7 : greenWidth,
                            height: isTablet ? greenHeight * 0.7 : greenHeight,
                            background: '#eaffea',
                            zIndex: 1,
                            boxShadow: '0 4px 24px 0 rgba(44, 62, 80, 0.07)',
                            display: 'flex',
                            alignItems: 'center',
                        };
                        const imageBoxStyle = {
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            minHeight: isTablet ? imageBoxHeight * 0.7 : imageBoxHeight,
                            minWidth: isTablet ? '240px' : '340px',
                            marginRight: isTablet ? '2rem' : '3.5rem',
                            zIndex: 2,
                        };
                        const innerImageBoxStyle = {
                            position: 'relative',
                            width: isTablet ? 240 : 340,
                            height: isTablet ? imageBoxHeight * 0.7 : imageBoxHeight,
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-end',
                        };
                        const puzzelImgStyle = {
                            position: 'absolute',
                            top: '0',
                            right: '0',
                            width: isTablet ? 120 : 180,
                            height: isTablet ? 180 : 260,
                            objectFit: 'cover',
                            background: 'white',
                            zIndex: 2,
                            border: 'none',
                            borderRadius: 0,
                            boxShadow: '0 2px 12px #0002',
                        };
                        const mensenImgStyle = {
                            position: 'absolute',
                            bottom: '0',
                            left: isTablet ? '-60px' : '-100px',
                            right: '0',
                            width: isTablet ? 220 : 320,
                            height: isTablet ? 120 : 180,
                            objectFit: 'cover',
                            border: '4px solid #e2725b',
                            background: 'white',
                            zIndex: 3,
                            borderRadius: 0,
                        };
                        const textBoxStyle = {
                            marginLeft: '0',
                            color: '#222',
                            maxWidth: isTablet ? '300px' : '420px',
                            zIndex: 2,
                        };
                        const h2Style = {
                            color: '#26913a',
                            fontWeight: 700,
                            fontSize: isTablet ? '1.3rem' : '2.2rem',
                            marginBottom: '0.7rem',
                            marginTop: 0,
                            fontFamily: 'CocogooseProTrial',
                        };
                        const pStyle = {
                            fontFamily: 'Poppins',
                            fontSize: isTablet ? '10px' : '12px',
                            lineHeight: 1.6,
                            color: '#222',
                            margin: 0,
                        };
                        return (
                            <section style={sectionStyle}>
                                {/* SVG-krul alleen tonen als het geen tablet is */}
                                {!isTablet && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width={svgStyle.width} height={svgStyle.height} viewBox="0 0 613.218 279.661" style={svgStyle}>
                                        <path d="M3117,1370.862s275.759-124.079,345.419,0,87.076,209.163,169.8,163.076,113.2-113.444,39.184-127.625-113.2,14.18-65.306,88.628S3714.938,1583.57,3728,1590.66" transform="translate(-3115.975 -1313.196)" fill="none" stroke="#e2725b" strokeWidth="5" />
                                    </svg >
                                )}
                                {/* Groene vlak links breder en hoogte groter dan images */}
                                <div style={greenStyle} />
                                {/* Foto's in het groene vlak */}
                                <div style={imageBoxStyle}>
                                    <div style={innerImageBoxStyle}>
                                        {/* Puzzel achter de mensenfoto */}
                                        <img src={puzzelImg} alt="Puzzel" style={puzzelImgStyle} />
                                        <img src={mensenImg} alt="Groep mensen" style={mensenImgStyle} />
                                    </div>
                                </div>
                                {/* Tekst rechts van de foto's */}
                                <div style={textBoxStyle}>
                                    <h2 style={h2Style}>Wat doen we?</h2>
                                    <div style={{ height: '4px', width: '60px', background: '#26913a', marginBottom: '1.2rem', borderRadius: '2px' }} />
                                    <p style={pStyle}>
                                        Buren voor Buren Tienen is een burgerinitiatief dat streeft naar zorgzamer buurten.
                                        We zijn vrijwilligers die zich in de eerste plaats belangeloos inzetten
                                        voor de burenhulp.
                                        Daarmee doen we eigenlijk wat buren in onze ogen horen te doen: elkaar helpen als
                                        het niet anders kan, als er geen familieleden of vrienden zijn die kunnen helpen
                                        voor eenvoudige dingen. Veel mensen zijn of hebben al goede buren,
                                        wij zijn er voor wie op een bepaald moment niemand heeft.
                                        Zie <span style={{ color: '#e2725b', fontWeight: 700, cursor: 'pointer' }}>Burenhulp</span> voor meer info.
                                        Naast burenhulp kan elke buurt bijkomende initiatieven nemen,
                                        bijvoorbeeld huiswerkbegeleiding, buurtfeesten, samentuin, buurtrestaurant…
                                        Elke buurt is anders en heeft andere mogelijkheden en andere vrijwilligers
                                        met andere wensen en vaardigheden.
                                        Onder <a href="/buurten" style={{ color: '#e2725b', fontWeight: 700, cursor: 'pointer' }}>&apos;Buurten&apos;</a> stelt  elke buurt zich voor.
                                    </p>
                                </div>
                            </section>
                        );
                    })()
                ) : (
                    // MOBILE: nieuwe layout
                    <section style={responsiveSection}>
                        {/* Titel en tekst centraal */}
                        <div style={{
                            width: '100%',
                            maxWidth: window.innerWidth <= 600 ? '85vw' : 400,
                            textAlign: 'center',
                            margin: window.innerWidth <= 600 ? '2.2rem auto 0 auto' : '3.2rem auto 0 auto',
                            zIndex: 2,
                            marginLeft: window.innerWidth <= 600 ? '4vw' : undefined,
                        }}>
                            <h2 style={{ color: '#26913a', fontWeight: 700, fontSize: window.innerWidth <= 600 ? (window.innerWidth <= 350 ? '1.2rem' : '1.4rem') : '2.5rem', marginBottom: '0.7rem', marginTop: window.innerWidth <= 600 ? '1.2rem' : '2.2rem', fontFamily: 'CocogooseProTrial', textAlign: 'center' }}>Wat doen we?</h2>
                            <div style={{ height: '4px', width: '60px', background: '#26913a', margin: '0 auto 1.2rem auto', borderRadius: '2px' }} />
                            <p style={{
                                fontFamily: 'Poppins',
                                fontSize: window.innerWidth <= 600 ? (window.innerWidth <= 350 ? '10px' : '11px') : '13px',
                                lineHeight: 1.6,
                                color: '#222',
                                margin: 0,
                                textAlign: 'center',
                            }}>
                                Buren voor Buren Tienen is een burgerinitiatief dat streeft naar zorgzamer buurten.
                                We zijn vrijwilligers die zich in de eerste plaats belangeloos inzetten
                                voor de burenhulp.
                                Daarmee doen we eigenlijk wat buren in onze ogen horen te doen: elkaar helpen als
                                het niet anders kan, als er geen familieleden of vrienden zijn die kunnen helpen
                                voor eenvoudige dingen. Veel mensen zijn of hebben al goede buren,
                                wij zijn er voor wie op een bepaald moment niemand heeft.
                                Zie <span style={{ color: '#e2725b', fontWeight: 700, cursor: 'pointer' }}>Burenhulp</span> voor meer info.
                                Naast burenhulp kan elke buurt bijkomende initiatieven nemen,
                                bijvoorbeeld huiswerkbegeleiding, buurtfeesten, samentuin, buurtrestaurant…
                                Elke buurt is anders en heeft andere mogelijkheden en andere vrijwilligers
                                met andere wensen en vaardigheden.
                                Onder <span style={{ color: '#e2725b', fontWeight: 700, cursor: 'pointer' }}>Buurten</span> stelt elke buurt zich voor.
                            </p>
                        </div>
                        {/* Afbeeldingen eronder, altijd overlappend */}
                        <div
                            style={{
                                position: 'relative',
                                width: window.innerWidth <= 600 ? '95vw' : window.innerWidth > 600 && window.innerWidth <= 1024 ? 420 : 440,
                                maxWidth: window.innerWidth <= 600 ? 260 : window.innerWidth > 600 && window.innerWidth <= 1024 ? 420 : 440,
                                height: window.innerWidth <= 600 ? 180 : window.innerWidth > 600 && window.innerWidth <= 1024 ? 300 : 300,
                                margin: '2.5rem auto 0 auto',
                                display: 'block',
                            }}
                        >
                            {/* Puzzel achter de mensenfoto */}
                            <img
                                src={puzzelImg}
                                alt="Puzzel"
                                style={{
                                    position: 'absolute',
                                    top: window.innerWidth <= 600 ? 18 : 0,
                                    right: window.innerWidth <= 600 ? 18 : 0,
                                    width: window.innerWidth <= 600 ? 150 : window.innerWidth > 600 && window.innerWidth <= 1024 ? 260 : 270,
                                    height: window.innerWidth <= 600 ? 150 : window.innerWidth > 600 && window.innerWidth <= 1024 ? 260 : 270,
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'cover',
                                    background: 'white',
                                    zIndex: 2,
                                    border: 'none',
                                    borderRadius: 0,
                                    boxShadow: '0 2px 12px #0002',
                                }}
                            />
                            <img
                                src={mensenImg}
                                alt="Groep mensen"
                                style={{
                                    position: 'absolute',
                                    bottom: window.innerWidth <= 600 ? 0 : -36,
                                    left: window.innerWidth <= 600 ? 0 : window.innerWidth > 600 && window.innerWidth <= 1024 ? -90 : -70,
                                    width: window.innerWidth <= 600 ? 200 : window.innerWidth > 600 && window.innerWidth <= 1024 ? 320 : 350,
                                    height: window.innerWidth <= 600 ? 100 : window.innerWidth > 600 && window.innerWidth <= 1024 ? 180 : 200,
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'cover',
                                    border: '3px solid #e2725b',
                                    background: 'white',
                                    zIndex: 3,
                                    borderRadius: 0,
                                }}
                            />
                        </div>
                    </section>
                )}
            </FadeInOnScroll>
            <FadeInOnScroll delay={150} direction={fadeDirections[1]}>
                <section style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    maxHeight: isMobile ? 160 : '300px',
                    minHeight: isMobile ? 160 : undefined,
                    marginTop: '2.5rem',
                    padding: 0,
                }}>
                    {/* Linkerhelft: community-foto */}
                    <div style={{
                        flex: 1,
                        minWidth: 0,
                        minHeight: isMobile ? 160 : '100px',
                        maxHeight: isMobile ? 160 : undefined,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: isMobile ? 'white' : '#eaffea',
                        boxShadow: isMobile ? undefined : '0 4px 18px 0 rgba(44, 62, 80, 0.10)',
                        padding: 0,
                        margin: 0,
                        borderRight: isMobile ? 'none' : undefined,
                    }}>
                        <img
                            src={communityImg}
                            alt="Community"
                            style={{
                                width: isMobile ? '100%' : '200%',
                                height: isMobile ? 160 : '100%',
                                maxHeight: isMobile ? 160 : undefined,
                                objectFit: 'cover',
                                borderRadius: 0,
                                boxShadow: isMobile ? undefined : '0 2px 12px 0 rgba(44,62,80,0.13)',
                                display: 'block',
                            }}
                        />
                    </div>
                    {/* Rechterhelft: groen vlak met logo */}
                    <div style={{
                        flex: 1,
                        minWidth: 0,
                        minHeight: isMobile ? 160 : '100px',
                        maxHeight: isMobile ? 160 : undefined,
                        background: '#eaffea',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: isMobile ? undefined : '0 4px 18px 0 rgba(44, 62, 80, 0.10)',
                        padding: 0,
                        margin: 0,
                        borderLeft: isMobile ? 'none' : undefined,
                    }}>
                        <img
                            src={logoImg}
                            alt="Buren voor Buren logo"
                            style={{
                                maxWidth: isMobile ? 60 : 200,
                                maxHeight: isMobile ? 60 : 180,
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 2px 8px rgba(44,62,80,0.13))',
                            }}
                        />
                    </div>
                </section >
            </FadeInOnScroll>
            <FadeInOnScroll delay={300} direction={fadeDirections[2]}><HomeSlider /></FadeInOnScroll>
            <FadeInOnScroll delay={450} direction={fadeDirections[3]}><AnimatedQuote /></FadeInOnScroll>
            <FadeInOnScroll delay={600} direction={fadeDirections[4]}>
                {/* TODO: Pas NewsFeed aan zodat op tablet (601-1024px) 2 nieuwsitems tegelijk zichtbaar zijn, net als in de slider hierboven. */}
                <NewsFeed />
            </FadeInOnScroll>
            <FadeInOnScroll delay={750} direction={fadeDirections[5]}><VideoSection /></FadeInOnScroll>
            <FadeInOnScroll delay={900} direction={fadeDirections[0]}><Footer /></FadeInOnScroll>
        </div>
    );
} 