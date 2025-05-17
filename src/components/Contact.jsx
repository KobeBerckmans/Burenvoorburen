import React, { useState } from 'react';
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

export default function Contact() {
    const [form, setForm] = useState({ email: '', subject: '', message: '' });
    const [status, setStatus] = useState(null);

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
            <div style={heroStyles.hero}>
                <div style={heroStyles.overlay} />
                <div style={heroStyles.content}>
                    <h1 style={heroStyles.title}>CONTACT</h1>
                    <p style={heroStyles.subtitle}>Heb je een vraag of wil je meer weten over Buren voor Buren? Neem gerust contact met ons op!</p>
                </div>
            </div>
            <div style={mainStyles.wrapper}>
                <div style={mainStyles.flex}>
                    <div style={mainStyles.left}>
                        <img src={logo} alt="Buren voor Buren logo" style={mainStyles.logo} />
                        <div style={mainStyles.title}>PRAAT MET ONS!</div>
                        <form style={mainStyles.form} onSubmit={handleSubmit}>
                            <input type="email" name="email" placeholder="Email" style={mainStyles.input} required value={form.email} onChange={handleChange} />
                            <input type="text" name="subject" placeholder="Subject" style={mainStyles.input} required value={form.subject} onChange={handleChange} />
                            <textarea name="message" placeholder="Write Your Message Here..." style={{ ...mainStyles.input, ...mainStyles.textarea }} required value={form.message} onChange={handleChange} />
                            <button type="submit" style={mainStyles.button}>SEND</button>
                            {status === 'success' && <div style={{ color: '#26913a', marginTop: 8 }}>Bedankt voor je bericht!</div>}
                            {status === 'error' && <div style={{ color: '#e2725b', marginTop: 8 }}>Er ging iets mis. Probeer opnieuw.</div>}
                        </form>
                    </div>
                    <div style={mainStyles.right}>
                        <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>OF BEL ONS OP!</div>
                        {contactpersonen.map((p, i) => (
                            <div key={i} style={{ marginBottom: 6 }}>
                                {p.regio && <span style={{ fontWeight: 700 }}>{p.regio}: </span>}
                                {p.naam} {p.tel && <span style={{ color: '#222', fontWeight: 400 }}> - {p.tel}</span>}
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ marginTop: 32, color: '#444', fontSize: '1rem', maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
                    Is er in jouw buurt nu nog geen afdeling van Buren voor Buren en heb je interesse om er een op te starten? Contacteer Samana (02 246 64 64 of info@samana.be). We bekijken graag samen de mogelijkheden.
                </div>
            </div>
            <Footer />
        </div>
    );
} 