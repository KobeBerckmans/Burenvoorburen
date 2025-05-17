import React, { useState } from 'react';
import Footer from './Footer';
import heroImg from '../assets/images/3mensen.jpg';

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
    }
};

const formStyles = {
    wrapper: {
        maxWidth: 600,
        margin: '0 auto',
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 4px 18px 0 rgba(44,62,80,0.10)',
        padding: '2.5rem 2rem',
        marginTop: '2.5rem',
        marginBottom: '2.5rem',
    },
    title: {
        color: '#26913a',
        fontWeight: 800,
        fontSize: '2rem',
        textAlign: 'center',
        fontFamily: 'CocogooseProTrial',
        marginBottom: '0.5rem',
        letterSpacing: 1,
    },
    subtitle: {
        color: '#26913a',
        fontWeight: 700,
        fontSize: '1.3rem',
        textAlign: 'center',
        marginBottom: '2.2rem',
        fontFamily: 'Montserrat, sans-serif',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
    },
    row: {
        display: 'flex',
        gap: '1.2rem',
    },
    input: {
        flex: 1,
        padding: '0.9rem',
        border: '1.5px solid #26913a',
        borderRadius: 6,
        fontSize: '1.1rem',
        fontFamily: 'Montserrat, sans-serif',
        background: '#fff',
        color: '#137c3a',
    },
    textarea: {
        padding: '0.9rem',
        border: '1.5px solid #26913a',
        borderRadius: 6,
        fontSize: '1.1rem',
        fontFamily: 'Montserrat, sans-serif',
        background: '#fff',
        color: '#137c3a',
        minHeight: 100,
        resize: 'vertical',
    },
    select: {
        flex: 1,
        padding: '0.9rem',
        border: '1.5px solid #26913a',
        borderRadius: 6,
        fontSize: '1.1rem',
        fontFamily: 'Montserrat, sans-serif',
        background: '#fff',
        color: '#137c3a',
    },
    button: {
        background: '#26913a',
        color: '#fff',
        fontWeight: 700,
        fontSize: '1.15rem',
        border: 'none',
        borderRadius: 6,
        padding: '1rem 0',
        marginTop: '0.5rem',
        cursor: 'pointer',
        fontFamily: 'CocogooseProTrial',
        letterSpacing: 1,
    }
};

export default function Help() {
    const [form, setForm] = useState({ naam: '', soort: '', bericht: '', datum: '', adres: '', uur: '' });
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
            const res = await fetch('http://localhost:3001/api/help-requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            if (res.ok) {
                setStatus('success');
                setForm({ naam: '', soort: '', bericht: '', datum: '', adres: '', uur: '' });
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
        <div style={{ width: '100%', minHeight: '100vh', background: '#fff' }}>
            <div style={heroStyles.hero}>
                <div style={heroStyles.overlay} />
                <div style={heroStyles.content}>
                    <h1 style={heroStyles.title}>HULP NODIG?</h1>
                </div>
            </div>
            <div style={formStyles.wrapper}>
                <div style={formStyles.title}>BUREN VOOR BUREN</div>
                <div style={formStyles.subtitle}>Plaats je aanvraag</div>
                <form onSubmit={handleSubmit} style={formStyles.form}>
                    <div style={formStyles.row}>
                        <input name="naam" type="text" placeholder="Naam" value={form.naam} onChange={handleChange} style={formStyles.input} required />
                        <select name="soort" value={form.soort} onChange={handleChange} style={formStyles.select} required>
                            <option value="">Soort Hulp</option>
                            <option value="boodschappen">Boodschappen</option>
                            <option value="vervoer">Vervoer</option>
                            <option value="gezelschap">Gezelschap</option>
                            <option value="klusjes">Klusjes</option>
                            <option value="anders">Anders</option>
                        </select>
                    </div>
                    <textarea name="bericht" placeholder="Write Your Message Here..." value={form.bericht} onChange={handleChange} style={formStyles.textarea} required />
                    <div style={formStyles.row}>
                        <input name="datum" type="date" placeholder="Datum" value={form.datum} onChange={handleChange} style={formStyles.input} required />
                        <input name="adres" type="text" placeholder="Adres" value={form.adres} onChange={handleChange} style={formStyles.input} required />
                    </div>
                    <div style={formStyles.row}>
                        <input name="uur" type="time" placeholder="Uur" value={form.uur} onChange={handleChange} style={formStyles.input} required />
                    </div>
                    <button type="submit" disabled={loading} style={formStyles.button}>{loading ? 'Verzenden...' : 'SUBMIT'}</button>
                    {status === 'success' && <div style={{ color: '#26913a', textAlign: 'center', marginTop: 12 }}>Je aanvraag is verstuurd!</div>}
                    {status === 'error' && <div style={{ color: '#e2725b', textAlign: 'center', marginTop: 12 }}>Er is iets misgegaan. Probeer opnieuw.</div>}
                </form>
            </div>
            <Footer />
        </div>
    );
} 