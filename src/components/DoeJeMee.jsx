import React, { useState } from 'react';
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

function Slider() {
    return (
        <div style={{ width: '100%', maxWidth: 1100, margin: '2.5rem auto 0 auto', background: 'rgba(234,255,234,0.15)', borderRadius: 18, boxShadow: '0 4px 18px 0 rgba(44,62,80,0.10)', padding: '2.5rem 1.5rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 32, minHeight: 340 }}>
            {sliderPoints.map((point) => (
                <div key={point.title} style={{ width: 320, minWidth: 0, background: 'none', borderRadius: 14, boxShadow: 'none', padding: '1.2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: 260, justifyContent: 'flex-start' }}>
                    <div style={{ marginBottom: 12 }}>{point.icon}</div>
                    <div style={{ color: '#e2725b', fontWeight: 700, fontSize: '1.1rem', marginBottom: 8, fontFamily: 'CocogooseProTrial', textAlign: 'center' }}>{point.title}</div>
                    <div style={{ color: '#222', fontSize: '0.98rem', whiteSpace: 'pre-line', textAlign: 'center', maxWidth: 260, lineHeight: 1.35, height: 140, overflow: 'auto', margin: '0 auto', fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>{point.text}</div>
                </div>
            ))}
        </div>
    );
}

function VrijwilligersForm() {
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
        <section style={{ background: '#fff7f4', padding: '3rem 0 2rem 0', margin: '3rem 0 0 0', borderRadius: 18, maxWidth: 1100, marginLeft: 'auto', marginRight: 'auto', boxShadow: '0 4px 18px 0 rgba(44,62,80,0.10)' }}>
            <h2 style={{ color: '#e2725b', fontWeight: 800, fontSize: '2.2rem', textAlign: 'center', fontFamily: 'CocogooseProTrial', marginBottom: '0.5rem', letterSpacing: 1 }}>WORD VRIJWILLIGER</h2>
            <div style={{ color: '#e2725b', textAlign: 'center', marginBottom: '2.5rem', fontSize: '1.1rem' }}>Geïnteresseerd? Laat het ons vlug weten:</div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', maxWidth: 700, margin: '0 auto' }}>
                <div style={{ display: 'flex', gap: '1.2rem' }}>
                    <input name="naam" type="text" placeholder="Naam" value={form.naam} onChange={handleChange} style={{ flex: 1, padding: '0.9rem', border: '1.5px solid #e2725b', borderRadius: 6, fontSize: '1.1rem', fontFamily: 'Montserrat, sans-serif', background: '#fff', color: '#137c3a' }} />
                    <input name="voornaam" type="text" placeholder="Voornaam" value={form.voornaam} onChange={handleChange} style={{ flex: 1, padding: '0.9rem', border: '1.5px solid #e2725b', borderRadius: 6, fontSize: '1.1rem', fontFamily: 'Montserrat, sans-serif', background: '#fff', color: '#137c3a' }} />
                </div>
                <div style={{ display: 'flex', gap: '1.2rem' }}>
                    <input name="adres" type="text" placeholder="Adres" value={form.adres} onChange={handleChange} style={{ flex: 2, padding: '0.9rem', border: '1.5px solid #e2725b', borderRadius: 6, fontSize: '1.1rem', fontFamily: 'Montserrat, sans-serif', background: '#fff', color: '#137c3a' }} />
                    <input name="tel" type="text" placeholder="Tel" value={form.tel} onChange={handleChange} style={{ flex: 1, padding: '0.9rem', border: '1.5px solid #e2725b', borderRadius: 6, fontSize: '1.1rem', fontFamily: 'Montserrat, sans-serif', background: '#fff', color: '#137c3a' }} />
                </div>
                <input name="mail" type="email" placeholder="Mail" value={form.mail} onChange={handleChange} style={{ padding: '0.9rem', border: '1.5px solid #e2725b', borderRadius: 6, fontSize: '1.1rem', fontFamily: 'Montserrat, sans-serif', background: '#fff', color: '#137c3a' }} />
                <textarea name="motivatie" placeholder="Motivatie..." value={form.motivatie} onChange={handleChange} rows={4} style={{ padding: '0.9rem', border: '1.5px solid #e2725b', borderRadius: 6, fontSize: '1.1rem', fontFamily: 'Montserrat, sans-serif', resize: 'vertical', background: '#fff', color: '#137c3a' }} />
                <button type="submit" disabled={loading} style={{ background: '#4b8e5b', color: '#fff', fontWeight: 700, fontSize: '1.15rem', border: 'none', borderRadius: 6, padding: '1rem 0', marginTop: '0.5rem', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'CocogooseProTrial', letterSpacing: 1 }}>{loading ? 'Verzenden...' : 'VERZEND'}</button>
                {status === 'success' && <div style={{ color: '#26913a', textAlign: 'center', marginTop: 12 }}>Bedankt voor je aanmelding!</div>}
                {status === 'error' && <div style={{ color: '#e2725b', textAlign: 'center', marginTop: 12 }}>Er is iets misgegaan. Probeer opnieuw.</div>}
            </form>
        </section>
    );
}

export default function DoeJeMee() {
    return (
        <div style={{ width: '100%', minHeight: '100vh', background: '#fff' }}>
            <div style={heroStyles.hero}>
                <div style={heroStyles.overlay} />
                <div style={heroStyles.content}>
                    <h1 style={heroStyles.title}>DOE JE MEE?</h1>
                    <p style={heroStyles.subtitle}>Samen maken we het verschil in jouw buurt – word vrijwilliger!</p>
                </div>
            </div>
            <Slider />
            <VrijwilligersForm />
            <Footer />
            <style>{`
                input::placeholder, textarea::placeholder {
                    color: #000;
                    opacity: 1;
                }
            `}</style>
        </div>
    );
} 