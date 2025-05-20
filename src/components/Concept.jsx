import React from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import heroImg from '../assets/images/3mensen.jpg';
import diagramImg from '../assets/images/watdoenwe.jpg';
import logo from '../assets/images/BVB-Transparant.png';
import zorgImg from '../assets/images/buurtgerichtezorg.jpg';
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
    section: {
        margin: '2.5rem 0',
        textAlign: 'left',
    },
    heading: {
        color: '#26913a',
        fontWeight: 700,
        fontSize: '1.4rem',
        margin: '2.2rem 0 1rem 0',
        fontFamily: 'Montserrat, sans-serif',
        letterSpacing: 1,
    },
    subheading: {
        color: '#e2725b',
        fontWeight: 600,
        fontSize: '1.1rem',
        margin: '1.5rem 0 0.7rem 0',
        fontFamily: 'Montserrat, sans-serif',
    },
    paragraph: {
        margin: '0.7rem 0',
        lineHeight: 1.7,
        fontSize: '1.05rem',
    },
    highlight: {
        color: '#26913a',
        fontWeight: 600,
    },
    image: {
        display: 'block',
        margin: '2.5rem auto',
        maxWidth: 420,
        width: '100%',
        borderRadius: 18,
        boxShadow: '0 2px 12px 0 rgba(44,62,80,0.10)',
    },
    diagram: {
        display: 'block',
        margin: '2.5rem auto',
        maxWidth: 540,
        width: '100%',
        borderRadius: 18,
        boxShadow: '0 2px 12px 0 rgba(44,62,80,0.10)',
    },
    list: {
        margin: '0.7rem 0 0.7rem 1.5rem',
        padding: 0,
        color: '#26913a',
        fontWeight: 500,
    },
    svgKrul: {
        position: 'absolute',
        top: -60,
        left: -120,
        zIndex: 0,
        width: 320,
        height: 120,
        pointerEvents: 'none',
        opacity: 0.7,
    },
    svgKrulWide: {
        position: 'absolute',
        left: '-400px',
        width: '1600px',
        height: '120px',
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.32,
    },
    svgKrulWideBottom: {
        position: 'absolute',
        left: '-400px',
        bottom: '-40px',
        width: '1600px',
        height: '120px',
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.32,
        transform: 'rotate(180deg)',
    },
    svgKrulWideMiddle: {
        position: 'absolute',
        left: '-400px',
        top: '50%',
        width: '1600px',
        height: '120px',
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.38,
        transform: 'rotate(-8deg)',
    },
};

const getDevice = () => {
    if (typeof window !== 'undefined') {
        if (window.innerWidth <= 600) return 'mobile';
        if (window.innerWidth > 600 && window.innerWidth <= 1024) return 'tablet';
    }
    return 'desktop';
};

function Concept({ fontSizeFactor }) {
    const [device, setDevice] = React.useState(getDevice());
    React.useEffect(() => {
        document.body.dataset.page = 'concept';
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
    const subtitleFontSize = ((isMobile ? 1.1 : 1.3) * fontSizeFactor) + 'rem';
    const mainWrapperResponsive = {
        ...mainStyles.wrapper,
        fontSize: (1.08 * fontSizeFactor) + 'rem',
    };
    const headingResponsive = {
        ...mainStyles.heading,
        fontSize: (1.4 * fontSizeFactor) + 'rem',
    };
    const subheadingResponsive = {
        ...mainStyles.subheading,
        fontSize: (1.1 * fontSizeFactor) + 'rem',
    };
    const paragraphResponsive = {
        ...mainStyles.paragraph,
        fontSize: (1.05 * fontSizeFactor) + 'rem',
    };
    const listResponsive = {
        ...mainStyles.list,
        fontSize: (1.05 * fontSizeFactor) + 'rem',
    };
    return (
        <div id="concept-main-content" style={{ width: '100%', minHeight: '100vh', background: '#fff' }}>
            <div style={heroResponsive}>
                <div style={heroStyles.overlay} />
                <div style={heroStyles.content}>
                    <h1 style={{ ...heroStyles.title, fontSize: titleFontSize }}>CONCEPT</h1>
                    <p style={{ ...heroStyles.subtitle, fontSize: subtitleFontSize }}>Het concept van Buren voor Buren</p>
                </div>
            </div>
            <div style={mainWrapperResponsive}>
                <svg style={mainStyles.svgKrulWide} viewBox="0 0 1600 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10,110 Q400,10 800,60 T1590,30" stroke="#e2725b" strokeWidth="7" fill="none" />
                </svg>
                <img src={logo} alt="Buren voor Buren logo" style={{ width: 120, margin: '2rem auto 1.5rem auto', display: 'block', position: 'relative', zIndex: 1 }} />
                <div style={{ color: '#26913a', fontWeight: 600, marginBottom: 8, position: 'relative', zIndex: 1 }}>Zorgnetwerk - Buurtgerichte zorg - Functies van buurtgerichte zorg</div>
                <Accordion title="1 Zorgnetwerk">
                    <div style={mainStyles.section}>
                        <div style={headingResponsive}>1 Zorgnetwerk</div>
                        <p style={paragraphResponsive}>We kiezen voor het bredere concept van een zorgnetwerk en sluiten ons aan bij de omschrijving van Samenlevingsopbouw West-Vlaanderen:</p>
                        <p style={paragraphResponsive}><span style={mainStyles.highlight}>&quot;Een zorgnetwerk versterkt mensen in een maatschappelijk kwetsbare positie, stimuleert nieuwe sociale contacten en verbindingen in de lokale gemeenschap en draagt bij tot de toegankelijkheid van dienst- en hulpverlening.&quot;</span></p>
                        <p style={paragraphResponsive}>Een zorgnetwerk is het netwerk dat tot stand komt tussen het lokaal bestuur, vrijwilligers uit de lokale gemeenschap, het dorp, de buurt en verschillende diensten, sleutelfiguren en verenigingen en mensen in een maatschappelijk kwetsbare positie. Met ondersteuning van een zorgnetwerkcoördinator, bij de meeste zorgnetwerken tewerkgesteld door het lokaal bestuur, werken de verschillende partners aan het actief opzoeken en bezoeken van maatschappelijk kwetsbare mensen, het brengen van informatie op maat, het stimuleren van nieuwe sociale contacten en het aanbieden van diverse vormen van burenhulp. De diensten en activiteiten van een zorgnetwerk zijn aanvullend op het bestaande aanbod.</p>
                        <p style={paragraphResponsive}>In de werking is er ook voortdurend aandacht voor het opnemen van een signaalfunctie. Is het aanbod voldoende toegankelijk? Is er effectief wel een aanbod beschikbaar? Zorgnetwerken kaarten signalen uit hun praktijk aan bij beleid en betrokken diensten. Zo werken zorgnetwerken mee aan de toegankelijkheid van dienst- en hulpverlening.” (www.ontknoop.be)</p>
                    </div>
                </Accordion>
                <Accordion title="2 Buurtgerichte zorg">
                    <div style={mainStyles.section}>
                        <div style={headingResponsive}>2 Buurtgerichte zorg</div>
                        <p style={paragraphResponsive}>Met buurtgerichte zorg wordt het geheel van inspanningen genoemd om zorgzame buurten te cre&euml;ren: buurten waar de inwoners elkaar ondersteunen en zorg dragen voor elkaar, bijgestaan door professionele zorgverstrekkers en dienstverleners.</p>
                        <p style={paragraphResponsive}>Uit de visietekst Buurtgerichte Zorg van de Vereniging van Vlaamse Dienstencentra en het Kenniscentrum Woonzorg Brussel:</p>
                        <p style={paragraphResponsive}><span style={mainStyles.highlight}>&quot;Het eerste wat telt, is dat mensen zich thuis voelen in de buurt waar ze wonen. In zo&apos;n buurt zijn er ontmoetingsplekken en activiteiten voor iedereen, genoeg hulp- en zorgvoorzieningen, winkels, groen, speelruimte, veilig verkeer ...  alles wat nodig is om er aangenaam te wonen. Het is ook een buurt waar mensen elkaar kennen, waar ze sociale contacten hebben, een beroep op elkaar kunnen doen en ergens terecht kunnen als het nodig is. (...)&quot;</span></p>
                        <div style={{ margin: '1.2rem 0', color: '#26913a', fontWeight: 500, fontFamily: 'Montserrat, sans-serif', fontSize: (1.05 * fontSizeFactor) + 'rem' }}>
                            Het is een organisatiemodel
                            <ul style={listResponsive}>
                                <li>dat gericht is op het welzijn van alle buurtbewoners,</li>
                                <li>dat de sociale cohesie versterkt en blijvend ondersteunt,</li>
                                <li>dat hulp en zorg beschikbaar stelt voor iedereen die het nodig heeft: ouderen, personen met een handicap, mensen met psychische problemen, kwetsbare groepen,</li>
                                <li>dat zowel focust op preventie als interventie,</li>
                                <li>dat op lokaal niveau voor een goede samenwerking zorgt tussen buren, vrijwilligers en mantelzorgers,</li>
                                <li>basisdiensten zoals thuiszorg, huishoudhulp, poetsen, klussen-diensten, warme maaltijden, handel en diensten ...</li>
                                <li>medische verzorging zoals thuisverpleging, huisartsen, apothekers, kinesisten ...</li>
                                <li>buurtoverschrijdende diensten zoals ziekenhuizen, verhuisdiensten, psychiatrische instellingen, palliatieve zorg, enz.</li>
                                <li>belendende sectoren zoals sport, cultuur, ruimtelijke ordening, lokaal sociaal beleid, enzovoort.</li>
                            </ul>
                            (Bekaert e.a. 2016,  p. 13)
                        </div>
                        <p style={mainStyles.paragraph}>Burenhulporganisaties vervullen een essentiële rol in dit model, onder meer door diensten aan te bieden als complement van het bestaande aanbod, door samenwerkingsverbanden te onderhouden met alle mogelijke betrokken organisaties en diensten, en door initiatieven te steunen en te ontplooien die de sociale cohesie versterken.</p>
                        <p style={mainStyles.paragraph}>Hierbij maken we meteen de kanttekening dat we dit concept als een ideaalmodel nastreven. Een goed georganiseerd zorgnetwerk vergt volgens Bekaert e.a. (2016, p. 32) ongeveer twee VTE&apos;s per 15 000 inwoners, naast de algemene netwerkcoördinator. Voor Tienen zouden er dus vijf VTE&apos;s nodig zijn. Ervan uitgaande dat dit verretoekomstmuziek is, kunnen we niet meer doen dan met de beschikbare vrijwilligersinzet zoveel mogelijk te werken in de richting van het model, en van de volgende werkingsprincipes.</p>
                        <img src={zorgImg} alt="Buurtgerichte zorg" style={mainStyles.image} />
                    </div>
                </Accordion>
                <Accordion title="3 Functies van buurtgerichte zorg">
                    <div style={mainStyles.section}>
                        <div style={headingResponsive}>3 Functies van buurtgerichte zorg</div>
                        <p style={paragraphResponsive}>In de professionele discussie over BZ wordt meer en meer verwezen naar &apos;de acht functies van buurtzorgregie&apos; die onderscheiden worden door de Vereniging van Vlaamse Steden en Gemeenten (Dewulf & Verlinden 2019). De tekst wordt meer en meer een gezamenlijk referentiekader voor buurtzorginitiatieven. Buren voor Buren Tienen sluit zich hier graag bij aan, in de mate van het mogelijke, want onze middelen zijn beperkt.</p>
                        <p style={paragraphResponsive}>We gaan ervan uit dat een gemeenschappelijk referentiekader ook de lokale samenwerking met vooral de professionele organisaties kan stimuleren, of in elk geval de eerste contacten kunnen versoepelen.</p>
                        <div style={subheadingResponsive}>3.1 Buurtanalyse</div>
                        <p style={paragraphResponsive}>Elke buurt is anders en de werking moet daaraan worden aangepast. Wij kennen onze buurten echter al vrij goed, daarom kunnen we aan de slag voor er een formele analyse gebeurt. Buurtanalyse is overigens een permanent proces.</p>
                        <div style={subheadingResponsive}>3.2 Partnerschappen en samenwerking tot stand brengen</div>
                        <p style={paragraphResponsive}>&quot;In het bijzonder voor mensen met een kwetsbaarheid of in een maatschappelijk kwetsbare positie is het belangrijk dat alle zorgactoren hun hulp- en dienstverlening op elkaar afstemmen en complementair aanbieden. Dit voorkomt verkokerde hulpverlening&quot; (Dewulf & Verlinden 2019, p. 31)</p>
                        <p style={paragraphResponsive}>Naast de zorgorganisaties (waarvan we er veel via ELZOH en/of het platform van Verbonden in ZOHrg kunnen bereiken) ook vertegenwoordigers van andere levensdomeinen in de buurt: verenigingen, scholen, wijkagenten, woonactoren.</p>
                        <div style={subheadingResponsive}>3.3 Sensibiliseren en informeren</div>
                        <p style={paragraphResponsive}>Mensen met een ondersteuningsvraag moeten weten waar ze terecht kunnen voor welk soort vraag en hoe ze dat moeten doen. Dat wordt &apos;zorggeletterdheid&apos; genoemd. Om de zorggeletterdheid van de hulpvragers te verhogen, moeten ook de vrijwilligers zo goed mogelijk op de hoogte zijn of gebracht worden van het aanbod, inz. op het gebied van zorg (de sociale kaart). Onze vrijwilligers kunnen altijd een beroep doen op de stadscoördinator (OCMW) wanneer ze bepaalde informatie niet kunnen geven, maar toch zullen we grote aandacht moeten besteden aan vorming.</p>
                        <div style={subheadingResponsive}>3.4 Sociale netwerken uitbouwen</div>
                        <p style={paragraphResponsive}>Mensen met weinig netwerken (vooral de meest kwetsbaren) hebben daar op vele manieren last van. Sociale netwerken dragen dan ook bij tot de levenskwaliteit van individuen. Netwerken met elkaar in verband brengen versterkt bovendien de sociale cohesie en de solidariteit, en op die manier ook weer de individuen.</p>
                        <div style={subheadingResponsive}>3.5 Sociaal gewaardeerde rollen tot stand brengen</div>
                        <p style={paragraphResponsive}>Mensen hebben het vaak moeilijk met hulp vragen en krijgen. Dat verandert wanneer ze ook in een geverspositie belanden, wanneer ze een functie krijgen in een netwerk en daar ook waardering voor krijgen. Het laat mensen weer &apos;in hun kracht komen&apos;  (empoweren), wat in het algemeen bijdraagt tot integratie en inclusie. Buren voor Buren kan mensen in het eigen netwerk een plaats geven of daarvoor bemiddelen bij samenwerkende netwerken. Op het empoweren willen we in elk geval sterk inzetten.</p>
                        <div style={subheadingResponsive}>3.6 Zorgnoden detecteren</div>
                        <p style={paragraphResponsive}>Doordat mensen niet makkelijk hulp vragen, blijven de problemen vaak onder de radar. Als we willen dat iedereen die ondersteuning nodig heeft, die ook krijgt, moeten we actief op zoek gaan naar zorgnoden, bv. door bij de mensen aan huis te gaan informeren (&apos;outreachen&apos;). Maar ook partners (2) of leden van de sociale netwerken (4) kunnen signalen detecteren.</p>
                        <div style={subheadingResponsive}>3.7 Toeleiding naar de juiste zorg en ondersteuning</div>
                        <p style={paragraphResponsive}>Mensen aanvaarden of geloven niet altijd gemakkelijk dat ze hulp nodig hebben, of als ze dat wel doen, zetten ze niet altijd de nodige stappen. Anderzijds moeten hulpverleners, vrijwilligers ook hun eigen verlegenheid overwinnen om aan te geven dat er een probleem is en om ervoor te zorgen dat er effectief hulp gevraagd wordt.</p>
                        <div style={subheadingResponsive}>3.8 Beleidsadvisering vanuit de buurt</div>
                        <p style={paragraphResponsive}>Buurtwerking levert heel wat informatie op over de noden en vragen van de buurtbewoners, en niet enkel over zorg en welzijn, maar ook over wonen, vrije tijd, mobiliteit enz. Om de toestand te verbeteren, moet het beleid ingelicht worden en uitgenodigd om er iets aan te doen. Door de verankering van Buren voor Buren in de stedelijke organisatie, via de stadscoördinator, zou de informatieoverdracht geen probleem mogen zijn. Of buurten ook voorstellen kunnen uitwerken ter verbetering, zal afhangen van hun mogelijkheden (bv. buurten met buurtcomités of belangengroeperingen zullen dat makkelijker kunnen).</p>
                        <img src={diagramImg} alt="Wat doen we?" style={mainStyles.diagram} />
                    </div>
                </Accordion>
            </div>
            <Footer />
        </div>
    );
}

Concept.propTypes = {
    fontSizeFactor: PropTypes.number.isRequired,
};

export default Concept; 