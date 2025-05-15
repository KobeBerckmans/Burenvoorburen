import React, { useState, useEffect, useRef } from 'react';
import mensenImg from '../assets/images/3mensen.jpg';
import puzzelImg from '../assets/images/puzzel.jpg';
import logoImg from '../assets/images/BVB-Transparant.png';
import communityImg from '../assets/images/community.jpg';
import NewsFeed from './NewsFeed';
import VideoSection from './VideoSection';
import Footer from './Footer';

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
    const visible = 3;
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
        <div style={{ width: '100%', maxWidth: 1100, margin: '2.5rem auto 0 auto', background: 'rgba(234,255,234,0.15)', borderRadius: 18, boxShadow: '0 4px 18px 0 rgba(44,62,80,0.10)', padding: '2.5rem 1.5rem', display: 'flex', alignItems: 'center', position: 'relative', minHeight: 340 }}>
            <button onClick={prev} style={{ position: 'absolute', left: -56, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', width: 38, height: 38, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2 }}>
                <svg width="38" height="38" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#e2725b" strokeWidth="3.5" fill="none" strokeLinecap="round" /></svg>
            </button>
            <div style={{ display: 'flex', flex: 1, justifyContent: 'center', gap: 32 }}>
                {visiblePoints.map((point) => (
                    <div key={point.title} style={{ width: 320, minWidth: 0, background: 'none', borderRadius: 14, boxShadow: 'none', padding: '1.2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: 260, justifyContent: 'flex-start' }}>
                        <div style={{ marginBottom: 12 }}>{point.icon}</div>
                        <div style={{ color: '#e2725b', fontWeight: 700, fontSize: '1.1rem', marginBottom: 8, fontFamily: 'CocogooseProTrial', textAlign: 'center' }}>{point.title}</div>
                        <div style={{ color: '#222', fontSize: '0.98rem', whiteSpace: 'pre-line', textAlign: 'center', maxWidth: 260, lineHeight: 1.35, height: 140, overflow: 'auto', margin: '0 auto', fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>{point.text}</div>
                    </div>
                ))}
            </div>
            <button onClick={next} style={{ position: 'absolute', right: -56, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', width: 38, height: 38, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2 }}>
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
    return (
        <div style={{ width: '100%', maxWidth: 800, margin: '3.5rem auto 3.5rem auto', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 160 }}>
            <div
                ref={ref}
                className={`quote-card${visible ? ' quote-card-animate' : ''}`}
                style={{
                    background: 'linear-gradient(105deg, #eaffea 80%, #fff 100%)',
                    borderRadius: 32,
                    boxShadow: '0 6px 32px 0 rgba(44,62,80,0.13)',
                    padding: '2.5rem 2.5rem 2.5rem 3.5rem',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 120,
                    width: '100%',
                    maxWidth: 700,
                    transform: 'skew(-6deg, 0deg)',
                    transition: 'box-shadow 0.25s, transform 0.25s',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                }}
            >
                <span style={{ color: '#e2725b', fontSize: '2.2rem', fontWeight: 700, fontFamily: 'CocogooseProTrial', marginRight: 14, transform: 'skew(6deg, 0deg)' }}>&ldquo;</span>
                <span style={{ fontSize: '1.65rem', fontStyle: 'italic', color: '#137c3a', fontFamily: 'Poppins, serif', fontWeight: 500, transform: 'skew(6deg, 0deg)' }}>
                    Beter een goede buur dan een verre vriend
                </span>
                <span style={{ color: '#e2725b', fontSize: '2.2rem', fontWeight: 700, fontFamily: 'CocogooseProTrial', marginLeft: 16, transform: 'skew(6deg, 0deg)' }}>&rdquo;</span>
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
    const imageBoxHeight = 260; // hoogte van de image-container blijft 280px
    const greenWidth = 800;
    const greenLeft = -120;
    return (
        <>
            <section style={{
                background: 'white', padding: '0', position: 'relative', width: '100%', minHeight: greenHeight + 80, display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}>
                {/* SVG-krul veel groter maken */}
                <svg xmlns="http://www.w3.org/2000/svg" width="2200" height="200" viewBox="0 0 613.218 279.661" style={{
                    position: 'absolute', top: '-35px', left: '-900px', zIndex: 20, pointerEvents: 'none'
                }}>
                    <path d="M3117,1370.862s275.759-124.079,345.419,0,87.076,209.163,169.8,163.076,113.2-113.444,39.184-127.625-113.2,14.18-65.306,88.628S3714.938,1583.57,3728,1590.66" transform="translate(-3115.975 -1313.196)" fill="none" stroke="#e2725b" strokeWidth="5" />
                </svg >
                {/* Groene vlak links breder en hoogte groter dan images */}
                <div style={{
                    position: 'absolute',
                    left: greenLeft,
                    top: 40,
                    width: greenWidth,
                    height: greenHeight,
                    background: '#eaffea',
                    zIndex: 1,
                    boxShadow: '0 4px 24px 0 rgba(44, 62, 80, 0.07)',
                    display: 'flex',
                    alignItems: 'center',
                }} />
                {/* Foto's in het groene vlak */}
                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', minHeight: imageBoxHeight, minWidth: '340px', marginRight: '3.5rem', zIndex: 2 }}>
                    <div style={{ position: 'relative', width: '340px', height: imageBoxHeight, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
                        {/* Puzzel achter de mensenfoto */}
                        <img src={puzzelImg} alt="Puzzel" style={{ position: 'absolute', top: '0', right: '0', width: '180px', height: '260px', objectFit: 'cover', background: 'white', zIndex: 2, border: 'none', borderRadius: 0, boxShadow: '0 2px 12px #0002' }} />
                        <img src={mensenImg} alt="Groep mensen" style={{ position: 'absolute', bottom: '0', left: '-100px', right: '0', width: '320px', height: '180px', objectFit: 'cover', border: '4px solid #e2725b', background: 'white', zIndex: 3, borderRadius: 0 }} />
                    </div>
                </div>
                {/* Tekst rechts van de foto's */}
                <div style={{ marginLeft: '0', color: '#222', maxWidth: '420px', zIndex: 2 }}>
                    <h2 style={{ color: '#26913a', fontWeight: 700, fontSize: '2.2rem', marginBottom: '0.7rem', marginTop: 0, fontFamily: 'CocogooseProTrial' }}>Wat doen we?</h2>
                    <div style={{ height: '4px', width: '60px', background: '#26913a', marginBottom: '1.2rem', borderRadius: '2px' }} />
                    <p style={{
                        fontFamily: 'Poppins', fontSize: '12px', lineHeight: 1.6, color: '#222', margin: 0
                    }}>
                        Buren voor Buren Tienen is een burgerinitiatief dat streeft naar zorgzamer buurten.
                        We zijn vrijwilligers die zich in de eerste plaats belangeloos inzetten
                        voor de burenhulp.
                        Daarmee doen we eigenlijk wat buren in onze ogen horen te doen: elkaar helpen als
                        het niet anders kan, als er geen familieleden of vrienden zijn die kunnen helpen
                        voor eenvoudige dingen. Veel mensen zijn of hebben al goede buren,
                        wij zijn er voor wie op een bepaald moment niemand heeft.
                        Zie 'Burenhulp' voor meer info.
                        Naast burenhulp kan elke buurt bijkomende initiatieven nemen,
                        bijvoorbeeld huiswerkbegeleiding, buurtfeesten, samentuin, buurtrestaurant…
                        Elke buurt is anders en heeft andere mogelijkheden en andere vrijwilligers
                        met andere wensen en vaardigheden.
                        Onder <a href="/buurten" style={{ color: '#e2725b', fontWeight: 700, cursor: 'pointer' }}>‘Buurten’</a> stelt  elke buurt zich voor.
                    </p>
                </div>
            </section >
            {/* Nieuwe sectie onder het huidige deel */}
            <section style={{ width: '100%', display: 'flex', flexDirection: 'row', maxHeight: '300px', marginTop: '2.5rem' }}>
                {/* Linkerhelft: lichtgroen vlak met logo */}
                <div style={{ flex: 1, background: '#eaffea', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100px', boxShadow: '0 4px 18px 0 rgba(44, 62, 80, 0.10)' }}>
                    <img src={logoImg} alt="Buren voor Buren logo" style={{ maxWidth: '200px', maxHeight: '180px', objectFit: 'contain', filter: 'drop-shadow(0 2px 8px rgba(44,62,80,0.13))' }} />
                </div>
                {/* Rechterhelft: community.jpg */}
                <div style={{ flex: 1, minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', position: 'relative', overflow: 'visible', boxShadow: '0 4px 18px 0 rgba(44, 62, 80, 0.10)' }}>
                    <img src={communityImg} alt="Community" style={{ width: '200%', height: '100%', objectFit: 'cover', borderRadius: 0, boxShadow: '0 2px 12px 0 rgba(44,62,80,0.13)' }} />
                    {/* Oranje krul SVG overlay */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="1273.983" height="998.424" viewBox="0 0 1273.983 998.424" style={{
                        position: 'absolute', top: '-100px', right: '-800px', zIndex: 2, pointerEvents: 'none'
                    }}>
                        <path id="Path_38" data-name="Path 38" d="M4323.278,1406.079s-544.422-203.317-681.951,0S3469.417,1748.813,3306.1,1673.3s-223.483-185.89-77.358-209.126,223.483,23.236,128.933,145.226S3142.787,1754.622,3117,1766.24" transform="translate(-1814.252 -2695.235) rotate(30)" fill="none" stroke="#e2725b" strokeWidth="5" />
                    </svg>
                </div>
            </section >
            <HomeSlider />
            <AnimatedQuote />
            <NewsFeed />
            <VideoSection />
            <Footer />
        </>
    );
} 