import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import heroImg from '../assets/images/3mensen.jpg';
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
        color: '#FFF',
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
        fontSize: '1.1rem',
        color: '#222',
        fontFamily: 'Montserrat, sans-serif',
        maxWidth: 1100,
        margin: '0 auto',
        borderBottom: '1px solid #e0e0e0',
    },
    flex: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 32,
        marginTop: 32,
        marginBottom: 32,
    },
    left: {
        flex: '1 1 340px',
        minWidth: 320,
        maxWidth: 420,
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 2px 8px 0 rgba(44,62,80,0.08)',
        padding: 32,
        textAlign: 'center',
    },
    right: {
        flex: '1 1 320px',
        minWidth: 280,
        maxWidth: 400,
        background: '#f8f8f8',
        borderRadius: 18,
        boxShadow: '0 2px 8px 0 rgba(44,62,80,0.08)',
        padding: 32,
        textAlign: 'left',
        color: '#26913a',
        fontWeight: 500,
        fontSize: '1.05rem',
    },
    logo: {
        width: 120,
        marginBottom: 16,
    },
    title: {
        color: '#26913a',
        fontWeight: 700,
        fontSize: '2rem',
        marginBottom: 16,
        fontFamily: 'CocogooseProTrial',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        marginTop: 16,
    },
    input: {
        padding: '12px 16px',
        border: '1.5px solid #e2725b',
        borderRadius: 8,
        fontSize: '1rem',
        fontFamily: 'Montserrat, sans-serif',
        background: '#fff',
        color: '#26913a',
    },
    textarea: {
        minHeight: 80,
        resize: 'vertical',
    },
    button: {
        background: '#26913a',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        padding: '12px 0',
        fontWeight: 700,
        fontSize: '1.1rem',
        cursor: 'pointer',
        marginTop: 8,
        letterSpacing: 1,
    },
};

const contactpersonen = [
    { regio: 'Centrum', naam: 'Zuid (Drakenhof): Femke Butteel', tel: '0496 376374' },
    { regio: 'Stadsrand', naam: 'Dok van Tienen: John Van Keijenberg', tel: '0488 933269' },
    { regio: '', naam: 'Grimde: Liesbeth Heyns', tel: '0475 611283' },
    { regio: '', naam: 'Potterij: Philippe Boucek', tel: '0498 159418' },
    { regio: '', naam: 'Watertoren, DON en Galgeveld (Tienen-Noord): Michèle Boesmans', tel: '0472 382598' },
    { regio: 'Deelgemeenten', naam: 'Bost: Philippe Boucek', tel: '0498 159418' },
    { regio: '', naam: 'Kumtich: Johan De Schryver', tel: '0468 110648' },
    { regio: '', naam: 'Oplinter: Ilonka Vaes', tel: '0489 901751' },
];

const getDevice = () => {
    if (typeof window !== 'undefined') {
        if (window.innerWidth <= 600) return 'mobile';
        if (window.innerWidth > 600 && window.innerWidth <= 1024) return 'tablet';
    }
    return 'desktop';
};

function Contact({ fontSizeFactor }) {
    const [form, setForm] = useState({ email: '', subject: '', message: '' });
    const [status, setStatus] = useState(null);
    const [device, setDevice] = useState(getDevice());

    React.useEffect(() => {
        const handleResize = () => setDevice(getDevice());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = device === 'mobile';
    const isTablet = device === 'tablet';

    const flexResponsive = {
        ...mainStyles.flex,
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 16 : isTablet ? 24 : 32,
        marginTop: isMobile ? 18 : isTablet ? 24 : 32,
        marginBottom: isMobile ? 18 : isTablet ? 24 : 32,
        alignItems: isMobile ? 'stretch' : 'center',
    };
    const leftResponsive = {
        ...mainStyles.left,
        minWidth: isMobile ? 'unset' : isTablet ? 260 : 320,
        maxWidth: isMobile ? '100%' : isTablet ? 340 : 420,
        padding: isMobile ? 16 : isTablet ? 24 : 32,
        margin: isMobile ? '0 auto' : undefined,
    };
    const rightResponsive = {
        ...mainStyles.right,
        minWidth: isMobile ? 'unset' : isTablet ? 200 : 280,
        maxWidth: isMobile ? '100%' : isTablet ? 300 : 400,
        padding: isMobile ? 16 : isTablet ? 24 : 32,
        margin: isMobile ? '0 auto' : undefined,
        fontSize: ((isMobile ? 0.98 : isTablet ? 1.01 : 1.05) * fontSizeFactor) + 'rem',
    };
    const inputResponsive = {
        ...mainStyles.input,
        fontSize: (isMobile ? 0.98 : 1) * fontSizeFactor + 'rem',
        padding: isMobile ? '10px 12px' : '12px 16px',
    };
    const buttonResponsive = {
        ...mainStyles.button,
        fontSize: (isMobile ? 1 : 1.1) * fontSizeFactor + 'rem',
        padding: isMobile ? '10px 0' : '12px 0',
    };
    const heroResponsive = {
        ...heroStyles.hero,
        height: isMobile ? 180 : isTablet ? 260 : 'min(50vh, 400px)',
        minHeight: isMobile ? 120 : isTablet ? 180 : 320,
        marginTop: isMobile ? 64 : isTablet ? 56 : 0,
    };
    const heroTitleResponsive = {
        ...heroStyles.title,
        fontSize: (isMobile ? 2 : isTablet ? 2.5 : 3.5) * fontSizeFactor + 'rem',
    };
    const heroSubtitleResponsive = {
        ...heroStyles.subtitle,
        fontSize: (isMobile ? 1 : isTablet ? 1.1 : 1.3) * fontSizeFactor + 'rem',
        marginTop: isMobile ? '0.5rem' : '1rem',
        padding: isMobile ? '0 0.2rem' : 0,
    };
    const mainWrapperResponsive = {
        ...mainStyles.wrapper,
        fontSize: (1.1 * fontSizeFactor) + 'rem',
    };
    const leftTitleResponsive = {
        ...mainStyles.title,
        fontSize: (2 * fontSizeFactor) + 'rem',
    };

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setStatus(null);
        try {
            const res = await fetch('http://localhost:3001/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok) {
                setStatus('success');
                setForm({ email: '', subject: '', message: '' });
            } else {
                setStatus('error');
                console.error('Server error:', data.error);
            }
        } catch (error) {
            setStatus('error');
            console.error('Network error:', error);
        }
    };

    return (
        <div style={{ width: '100%', minHeight: '100vh', background: '#fff' }}>
            <div style={heroResponsive}>
                <div style={heroStyles.overlay} />
                <div style={heroStyles.content}>
                    <h1 style={heroTitleResponsive}>CONTACT</h1>
                    <p style={heroSubtitleResponsive}>Heb je een vraag of wil je meer weten over Buren voor Buren? Neem gerust contact met ons op!</p>
                </div>
            </div>
            <div style={mainWrapperResponsive}>
                <div style={flexResponsive}>
                    <div style={leftResponsive}>
                        <img src={logo} alt="Buren voor Buren logo" style={mainStyles.logo} />
                        <div style={leftTitleResponsive}>PRAAT MET ONS!</div>
                        <form style={mainStyles.form} onSubmit={handleSubmit}>
                            <input type="email" name="email" placeholder="Email" style={inputResponsive} required value={form.email} onChange={handleChange} />
                            <input type="text" name="subject" placeholder="Subject" style={inputResponsive} required value={form.subject} onChange={handleChange} />
                            <textarea name="message" placeholder="Bericht" style={{ ...inputResponsive, ...mainStyles.textarea }} required value={form.message} onChange={handleChange} />
                            <button type="submit" style={buttonResponsive}>Verstuur</button>
                        </form>
                        {status === 'success' && <div style={{ color: '#26913a', marginTop: 12, fontSize: (1 * fontSizeFactor) + 'rem' }}>Bedankt voor je bericht!</div>}
                        {status === 'error' && <div style={{ color: '#e2725b', marginTop: 12, fontSize: (1 * fontSizeFactor) + 'rem' }}>Er ging iets mis. Probeer opnieuw.</div>}
                    </div>
                    <div style={rightResponsive}>
                        <div style={{ fontWeight: 700, color: '#e2725b', marginBottom: 8, fontSize: (1.1 * fontSizeFactor) + 'rem' }}>Contactpersonen</div>
                        {contactpersonen.map((p, i) => (
                            <div key={i} style={{ marginBottom: 10 }}>
                                {p.regio && <span style={{ color: '#26913a', fontWeight: 600 }}>{p.regio}: </span>}
                                <span>{p.naam}</span><br />
                                <span style={{ color: '#222', fontWeight: 400 }}>{p.tel}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ marginTop: 32, color: '#444', fontSize: (1 * fontSizeFactor) + 'rem', maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
                    Is er in jouw buurt nu nog geen afdeling van Buren voor Buren en heb je interesse om er een op te starten? Contacteer Samana (02 246 64 64 of info@samana.be). We bekijken graag samen de mogelijkheden.
                </div>
            </div>
            <Footer />
        </div>
    );
}

Contact.propTypes = {
    fontSizeFactor: PropTypes.number.isRequired,
};

export default Contact; 