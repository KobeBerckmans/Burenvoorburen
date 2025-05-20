import React from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import heroImg from '../assets/images/3mensen.jpg';
import logo from '../assets/images/BVB-Transparant.png';
import Accordion from './Accordion';

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
    subtitle: {
        color: '#26913a',
        fontWeight: 600,
        margin: '1.5rem 0 2.5rem 0',
        fontSize: '1.05rem',
        fontFamily: 'Montserrat, sans-serif',
    },
    sectionTitle: {
        color: '#26913a',
        fontWeight: 700,
        fontSize: '1.15rem',
        margin: '2.2rem 0 1rem 0',
        fontFamily: 'Montserrat, sans-serif',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    principleTitle: {
        color: '#26913a',
        fontWeight: 700,
        fontSize: '1.08rem',
        margin: '2rem 0 0.5rem 0',
        fontFamily: 'Montserrat, sans-serif',
    },
    paragraph: {
        margin: '0.7rem 0',
        lineHeight: 1.7,
        fontSize: '1.05rem',
        textAlign: 'left',
    },
    highlight: {
        color: '#26913a',
        fontWeight: 600,
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

// Web Speech API helper voor Werkingsprincipes
function speakWerkingsprincipesText() {
    if ('speechSynthesis' in window) {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            return;
        }
    }
    const mainContent = document.getElementById('werkingsprincipes-main-content');
    let text = '';
    if (mainContent) {
        text = mainContent.innerText;
    } else {
        text = `De werkingsprincipes van Buren voor Buren.`;
    }
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new window.SpeechSynthesisUtterance(text);
        utterance.lang = 'nl-BE';
        window.speechSynthesis.speak(utterance);
    } else {
        alert('Deze browser ondersteunt geen voorleesfunctie.');
    }
}

function Werkingsprincipes({ fontSizeFactor }) {
    const [device, setDevice] = React.useState(getDevice());
    React.useEffect(() => {
        document.body.dataset.page = 'werkingsprincipes';
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
    const titleFontSize = ((isMobile ? 2.5 : 3.5) * fontSizeFactor) + 'rem';
    const mainWrapperResponsive = {
        ...mainStyles.wrapper,
        fontSize: (1.08 * fontSizeFactor) + 'rem',
    };
    const subtitleResponsive = {
        ...mainStyles.subtitle,
        fontSize: (1.05 * fontSizeFactor) + 'rem',
    };
    const sectionTitleResponsive = {
        ...mainStyles.sectionTitle,
        fontSize: (1.15 * fontSizeFactor) + 'rem',
    };
    const principleTitleResponsive = {
        ...mainStyles.principleTitle,
        fontSize: (1.08 * fontSizeFactor) + 'rem',
    };
    const paragraphResponsive = {
        ...mainStyles.paragraph,
        fontSize: (1.05 * fontSizeFactor) + 'rem',
    };
    const listResponsive = {
        margin: '1rem 0 1rem 1.5rem',
        padding: 0,
        color: '#26913a',
        fontWeight: 500,
        fontFamily: 'Montserrat, sans-serif',
        lineHeight: 1.7,
        fontSize: (1.05 * fontSizeFactor) + 'rem',
    };
    return (
        <div id="werkingsprincipes-main-content" style={{ width: '100%', minHeight: '100vh', background: '#fff' }}>
            <div style={heroResponsive}>
                <div style={heroStyles.overlay} />
                <div style={heroStyles.content}>
                    <h1 style={{ ...heroStyles.title, fontSize: titleFontSize }}>WERKINGSPRINCIPES</h1>
                </div>
            </div>
            {/* Screenreader knop */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '1.2rem 0 0 0', width: '100%' }}>
                <button
                    onClick={speakWerkingsprincipesText}
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
                    aria-label="Lees de Werkingsprincipes pagina voor"
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
            <div style={mainWrapperResponsive}>
                {/* SVG-krul bovenaan */}
                <svg style={mainStyles.svgKrul} viewBox="0 0 1600 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10,110 Q400,10 800,60 T1590,30" stroke="#e2725b" strokeWidth="7" fill="none" />
                </svg>
                <div style={mainStyles.logoOverlay}>
                    <img src={logo} alt="Buren voor Buren logo" style={mainStyles.logo} />
                </div>
                <div style={subtitleResponsive}>
                    Buren voor Buren Tienen wil vooral de spontane solidariteit organiseren met het oog op het herstel van een natuurlijk, inclusief sociaal netwerk waarin het lidmaatschap van elk individu gezien wordt als evident en waardevol. Vandaar dat we de volgende klemtonen willen leggen,
                </div>
                <div style={{ color: '#26913a', fontWeight: 700, margin: '1.5rem 0 2.5rem 0', fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase', letterSpacing: 1, fontSize: (1.08 * fontSizeFactor) + 'rem' }}>
                    Emancipatorisch &nbsp; Proactief &nbsp; Flexibel &nbsp; Gericht op samenwerking
                </div>
                <Accordion title="1. Emancipatorisch">
                    <div style={paragraphResponsive}>
                        Iedereen is intrinsiek gelijkwaardig en iedereen zou zichzelf en de ander ook zo moeten zien. Voor veel mensen is dat niet het geval: ze voelen zich niet aanvaard, uitgesloten. Streven naar herstel van een inclusief sociaal netwerk is dan ook een emancipatiestrijd, ervan uitgaande dat emancipatie inhoudt dat men zichzelf waardeert (gelijkwaardig voelt) en dat men zich gewaardeerd voelt. Vandaar:
                        <ul style={listResponsive}>
                            <li>We benaderen de doelgroep met het grootste respect.</li>
                            <li>We hoeden ons voor een neerbuigende, paternaliserende houding, die schaamtegevoelens kunnen aanwakkeren.</li>
                            <li>We beschouwen ons &apos;dienstbetoon&apos; als een evidentie, niet als een bijzondere prestatie. In onze &apos;ideale wereld&apos; zorgen buren nu eenmaal voor elkaar.</li>
                            <li>We proberen de doelgroepen zoveel mogelijk te (re-)integreren in de maatschappij, bijvoorbeeld door ze sociaal gewaardeerde rollen te geven, te empoweren. We kunnen cliënten inzetten in het eigen netwerk, als buddy, of in andere (samenwerkende organisaties). Empowering in het eigen netwerk gebeurt vaak spontaan: mensen stellen voor mee te helpen. Zo zijn ze tegelijk buddy en cliënt, zo zijn we allemaal buren die voor andere buren iets proberen te betekenen. Idealiter wordt een dergelijke burenwerking een systeem van &apos;georganiseerde vriendschap&apos; (Dierinck 2020, p. 77).</li>
                            <li>We richten ons niet in het bijzonder tot dé kansarmen, dé anderstalige nieuwkomers, dé senioren, dé psychisch kwetsbaren, enz., maar tot iedereen die ondersteuning kan gebruiken. We zijn niet doelgroep- maar cliëntgericht.</li>
                        </ul>
                    </div>
                </Accordion>
                <Accordion title="2. Proactief">
                    <div style={paragraphResponsive}>
                        We gaan in de mate van het mogelijke op twee manieren proactief te werk.
                        <ul style={listResponsive}>
                            <li>Mensen vinden het altijd niet makkelijk om hulp te vragen (vraagverlegenheid). Hoe kwetsbaarder, hoe zwakker het netwerk, hoe groter de terughoudendheid. Om de noden te leren kennen, voor de detectie, moeten we daarom zoveel mogelijk outreachend te werk gaan: we gaan zoveel mogelijk zelf op zoek naar mensen die gebruik zouden kunnen maken van ons aanbod of van dat van het reguliere zorgaanbod.</li>
                            <li>Mensen vinden het niet altijd makkelijk om hulp of informatie erover te zoeken en laten het daarom soms ook na, met &apos;onderbescherming&apos; tot gevolg. In de mate van het mogelijke gaan we zelf op zoek naar informatie waarvan we denken dat die nuttig kan zijn voor de cliënten.</li>
                        </ul>
                    </div>
                </Accordion>
                <Accordion title="3. Flexibel">
                    <div style={paragraphResponsive}>
                        We passen ons aan aan de noden van de cliënten, de vrijwilligers en de buurt.
                        <ul style={listResponsive}>
                            <li><b>Cliënten:</b> Sommige burenhulpwerkingen zijn organisatorisch heel overzichtelijk. Er wordt gewacht op een hulpvraag en dan wordt een buddy uitgezonden. Als we uitgaan van de belangen van de gebruiker, dan is een grote organisatorische flexibiliteit nodig. Wij beperken ons daarom zeker niet tot één-op-één-relaties cliënt-buddy. We passen ons aan aan wat op een bepaald moment voor een bepaalde persoon of doelgroep nodig is. We kunnen bijvoorbeeld verschillende buddy&apos;s inzetten voor één cliënt.</li>
                            <li><b>Vrijwilligers:</b> Iedereen is anders, iedereen doet wat hij kan en wil. Niet alle vrijwilligers zien het zitten om mensen gezelschap te houden, anderen zijn niet geschikt voor huiswerkbegeleiding of conversatiesessies met anderstaligen. Bij de intake worden de wensen genoteerd. Vrijwilligers kunnen eventueel hulpvragen waaraan ze liever niet tegemoetkomen doorspelen naar collega&apos;s. Ze moeten zich vrij voelen in de organisatie en pauzes kunnen inlassen.</li>
                            <li><b>Buurten:</b> Elke buurt is anders. Daarom moeten de buurten in onderling overleg kunnen beslissen hun werking aan te passen aan de specifieke noden en wensen. Hier kunnen buurtanalyses aan bijdragen.</li>
                        </ul>
                    </div>
                </Accordion>
                <Accordion title="4. Gericht op samenwerking">
                    <div style={paragraphResponsive}>
                        Onze doelstellingen vallen in grote mate samen met een aantal &apos;Duurzame Ontwikkelingsdoelstellingen&apos; van de Verenigde Naties: nr. 1 geen armoede, nr. 3 goede gezondheid en welzijn voor iedereen, nr. 10 ongelijkheid verminderen. Ze zouden daarom op alle nationale en regionale beleidsniveaus een prioriteit moeten zijn. Er bestaan dan ook al veel organisaties en initiatieven, die er echter niet altijd in slagen samen te werken. Solidariteit, verbinding moet er niet alleen zijn tussen mensen, maar ook tussen organisaties, zeker organisaties die zich inzetten voor meer solidariteit. Dat is trouwens  de duurzame VN-doelstelling nr. 17: Partnerschap om doelstellingen te bereiken. We zoeken daarom zoveel mogelijk aansluiting bij bestaande organisaties en diensten om elkaar te ondersteunen, met ook hier zoveel mogelijk wederkerigheid.
                        <br /><br />
                        <span style={{ color: '#e2725b', fontWeight: 600 }}>
                            &quot;Zorgnetwerken (…) functioneren als een soort draaischijf voor hulp- en dienstverlening. Een goede doorverwijzing en opvolging vraagt een goed contact met andere diensten. Het gaat tegelijk om tweerichtingsverkeer: de netwerkcoördinator beschikt door die samenwerking niet alleen over een ruim netwerk voor informatieverstrekking en bekendmaking maar ziet tegelijkertijd mogelijkheden om noden te signaleren vanuit diverse hoeken.&quot; (Pareit 2015, p. 19)
                        </span>
                        <br /><br />
                        Buren voor Buren zal op den duur een uitgebreid en goed over het grondgebied verdeeld netwerk van vrijwilligers hebben. Misschien zijn die ook wel eens bereid om in te vallen bij andere sociale organisaties. Kumtichse Buren voor Buren bijvoorbeeld zijn in 2020 enkele keren gaan invallen bij Bezorgd om Mensen, tot wederzijds genoegen.
                        <br /><br />
                        Een ander voordeel van uitgebreide samenwerking is dat we zo nog meer mogelijkheden hebben om gebruikers te empoweren, ze een rol te geven in andere organisaties.
                    </div>
                </Accordion>
                {/* SVG-krul onderaan */}
                <svg style={mainStyles.svgKrulBottom} viewBox="0 0 1600 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10,110 Q400,10 800,60 T1590,30" stroke="#e2725b" strokeWidth="7" fill="none" />
                </svg>
            </div>
            <Footer />
        </div>
    );
}

Werkingsprincipes.propTypes = {
    fontSizeFactor: PropTypes.number.isRequired,
};

export default Werkingsprincipes; 