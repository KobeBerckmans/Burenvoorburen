import React from 'react';
import Footer from './Footer';
import heroImg from '../assets/images/3mensen.jpg';
import logo from '../assets/images/BVB-Transparant.png';
import Menu from './Menu';

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
        color: '#b6f7c2',
        fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
        fontWeight: 500,
        fontFamily: 'Montserrat, sans-serif',
        marginTop: '1rem',
        textShadow: '0 2px 12px rgba(0,0,0,0.3)',
        maxWidth: '600px',
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
    section: {
        margin: '2.5rem 0',
        textAlign: 'left',
    },
    heading: {
        color: '#26913a',
        fontWeight: 700,
        fontSize: '1.2rem',
        margin: '2.2rem 0 1rem 0',
        fontFamily: 'Montserrat, sans-serif',
        letterSpacing: 1,
    },
    list: {
        margin: '1.2rem 0 1.2rem 1.5rem',
        padding: 0,
        color: '#222',
        fontWeight: 500,
        fontSize: '1.05rem',
        lineHeight: 1.7,
    },
    link: {
        color: '#e2725b',
        textDecoration: 'underline',
        wordBreak: 'break-all',
    }
};

const cardStyles = {
    card: {
        background: '#fbeeea',
        borderRadius: 14,
        boxShadow: '0 2px 8px 0 rgba(44,62,80,0.08)',
        padding: '1.2rem 1.2rem 1.1rem 1.2rem',
        margin: '1.2rem 0',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
    },
    cardTitle: {
        color: '#26913a',
        fontWeight: 700,
        fontSize: '1.08rem',
        fontFamily: 'Montserrat, sans-serif',
        marginBottom: 2,
    },
    cardDesc: {
        color: '#222',
        fontSize: '1.01rem',
        fontFamily: 'Montserrat, sans-serif',
        marginBottom: 2,
    },
    cardLink: {
        color: '#e2725b',
        textDecoration: 'underline',
        wordBreak: 'break-all',
        fontWeight: 600,
    }
};

export default function LinksLiteratuur() {
    React.useEffect(() => {
        document.body.dataset.page = 'links-literatuur';
        document.documentElement.style.overflowX = 'hidden';
        document.body.style.overflowX = 'hidden';
        return () => {
            delete document.body.dataset.page;
            document.documentElement.style.overflowX = '';
            document.body.style.overflowX = '';
        };
    }, []);
    return (
        <div style={{ width: '100%', minHeight: '100vh', background: '#fff' }}>
            <Menu />
            <div style={heroStyles.hero}>
                <div style={heroStyles.overlay} />
                <div style={heroStyles.content}>
                    <h1 style={heroStyles.title}>LINKS &amp; LITERATUUR</h1>
                    <div style={heroStyles.subtitle}>Enkele zeer toegankelijke bronnen</div>
                </div>
            </div>
            <div style={mainStyles.wrapper}>
                <div style={mainStyles.logoOverlay}>
                    <img src={logo} alt="Buren voor Buren logo" style={mainStyles.logo} />
                </div>
                <div style={mainStyles.section}>
                    <h2 style={mainStyles.heading}>Boeken &amp; Artikels</h2>
                    <div style={cardStyles.card}>
                        <div style={cardStyles.cardTitle}>Bekaert, A. e.a. (2016)</div>
                        <div style={cardStyles.cardDesc}>Buurtgerichte Zorg. De actief zorgzame buurt als toekomstmodel voor Vlaanderen en Brussel.<br />VVDC &amp; Kenniscentrum Woonzorg, Brussel.</div>
                        <a href="https://www.kenniscentrumwwz.be/sites/default/files/atoms/files/Visietekst%20Buurtgerichte%20Zorg.pdf" style={cardStyles.cardLink} target="_blank" rel="noopener noreferrer">Visietekst Buurtgerichte Zorg (kenniscentrumwwz.be)</a>
                    </div>
                    <div style={cardStyles.card}>
                        <div style={cardStyles.cardTitle}>Bloemen, R., K. Caymax, L. Vande Woestyne &amp; R. Derutter (2022)</div>
                        <div style={cardStyles.cardDesc}>Minder mazen, meer net. Aan de slag met zorgzame buurten. SAAMO.</div>
                        <a href="https://www.saamo.be/wp-content/uploads/2022/06/2022_SALI001_e-pub_zorgzame-buurt.pdf" style={cardStyles.cardLink} target="_blank" rel="noopener noreferrer">2022_SALI001_e-pub_zorgzame-buurten.pdf (saamo.be)</a>
                    </div>
                    <div style={cardStyles.card}>
                        <div style={cardStyles.cardTitle}>Decorte A. e.a. (2017)</div>
                        <div style={cardStyles.cardDesc}>Sociaal vernieuwen met burenhulp. Zesdelige reeks van VIEWZ. Vandenbroele, Brugge.
                            <ul style={{ margin: '0.5rem 0 0.5rem 1.5rem', color: '#26913a', fontWeight: 500, fontSize: '1.01rem' }}>
                                <li>Burenhulp als sociale interventie. Burenhulp draait in essentie om menselijke interactie.</li>
                                <li>Visie en strategie. Ken je eigen visie n strategie en houd die altijd voor ogen.</li>
                                <li>Buurtscan. Ken de buurt waarmee je aan de slag wilt.</li>
                                <li>Vraag en aanbod. Op zoek naar een goed systeem om vraag en aanbod op elkaar af te stemmen.</li>
                                <li>Promotie: Voer promotie, communiceer over je project.</li>
                                <li>Sociaal vernieuwen. Durf te vernieuwen!</li>
                            </ul>
                        </div>
                    </div>
                    <div style={cardStyles.card}>
                        <div style={cardStyles.cardTitle}>De Donder, L. e.a. (2021)</div>
                        <div style={cardStyles.cardDesc}>Lokaal samenwerken in zorgzame buurten. Fonds Dr. Daniël De Coninck, Brussel.</div>
                        <a href="https://www.kbs-frb.be/nl/Activities/Publications/2021/20210413PP" style={cardStyles.cardLink} target="_blank" rel="noopener noreferrer">kbs-frb.be</a>
                    </div>
                    <div style={cardStyles.card}>
                        <div style={cardStyles.cardTitle}>Dewulf, D. &amp; E. Verlinden (2019)</div>
                        <div style={cardStyles.cardDesc}>Aan de slag met buurtgerichte zorg. VVSG/Politeia, Brussel.</div>
                    </div>
                    <div style={cardStyles.card}>
                        <div style={cardStyles.cardTitle}>Dierinck, P. (2020)</div>
                        <div style={cardStyles.cardDesc}>Handboek kwartiermaken. De vermaatschappelijking van de geestelijke gezondheidszorg. Witsand Uitgevers.</div>
                    </div>
                    <div style={cardStyles.card}>
                        <div style={cardStyles.cardTitle}>Heylen, L, W. Van Damme &amp; J. Coussement (2021)</div>
                        <div style={cardStyles.cardDesc}>Ondersteuningspakket zorgzame buurtanalyse.</div>
                        <a href="https://www.thomasmore.be/ondersteuningspakket-zorgzame-buurtanalyse" style={cardStyles.cardLink} target="_blank" rel="noopener noreferrer">thomasmore.be</a>
                    </div>
                    <div style={cardStyles.card}>
                        <div style={cardStyles.cardTitle}>Pareit, L. (2015)</div>
                        <div style={cardStyles.cardDesc}>Draaiboek zorgnetwerken. Samenlevingsopbouw West-Vlaanderen vzw, Brugge.</div>
                        <a href="https://www.ontknoop.be/" style={cardStyles.cardLink} target="_blank" rel="noopener noreferrer">ontknoop.be</a>
                    </div>
                    <div style={cardStyles.card}>
                        <div style={cardStyles.cardTitle}>Plovie, E. &amp; L. Heylen (2020)</div>
                        <div style={cardStyles.cardDesc}>&quot;Buurtzorg in crisistijd: Wie al heeft, zal nog meer krijgen&quot;, in Sociaal.net 9 juli 2020.</div>
                    </div>
                    <div style={cardStyles.card}>
                        <div style={cardStyles.cardTitle}>Pless, S. (2023)</div>
                        <div style={cardStyles.cardDesc}>Samenwerken rond zorgzame buurten. UCLL, Leuven.</div>
                    </div>

                    <h2 style={mainStyles.heading}>Websites</h2>
                    <div style={cardStyles.card}>
                        <div style={cardStyles.cardTitle}>Burennetwerk Amsterdam</div>
                        <div style={cardStyles.cardDesc}>Inspirerend voorbeeld uit Nederland. Het Amsterdamse netwerk pakt de zaken zeer professioneel aan.</div>
                        <a href="https://www.burennetwerk.nl/" style={cardStyles.cardLink} target="_blank" rel="noopener noreferrer">burennetwerk.nl</a>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
} 