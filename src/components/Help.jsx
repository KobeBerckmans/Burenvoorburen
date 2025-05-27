import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import heroImg from '../assets/images/3mensen.jpg';

const heroStyles = {
    hero: {
        width: '100%',
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
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#fff',
        fontWeight: 700,
        fontFamily: 'CocogooseProTrial',
        letterSpacing: 2,
        textShadow: '0 4px 24px rgba(0,0,0,0.3)',
        margin: 0,
        lineHeight: 1.2,
        textAlign: 'center',
    }
};

const getDevice = () => {
    if (typeof window !== 'undefined') {
        if (window.innerWidth <= 600) return 'mobile';
        if (window.innerWidth > 600 && window.innerWidth <= 1024) return 'tablet';
    }
    return 'desktop';
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

// Web Speech API helper voor Help
function speakHelpText() {
    if ('speechSynthesis' in window) {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            return;
        }
    }
    const mainContent = document.getElementById('help-main-content');
    let text = '';
    if (mainContent) {
        text = mainContent.innerText;
        // Filter 'Lees meer' knoppen en 🔊 emoji uit de tekst
        text = text.replace(/Lees meer/g, '').replace(/🔊/g, '').replace(/\s{2,}/g, ' ').trim();
    } else {
        text = `Vraag hulp aan Buren voor Buren.`;
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

function Help({ fontSizeFactor }) {
    const [form, setForm] = useState({
        naam: '',
        soort: '',
        bericht: '',
        datum: '',
        straat: '',
        nummer: '',
        gemeente: '',
        contrei: '',
        uur: ''
    });
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [device, setDevice] = React.useState(getDevice());
    // Straatzoeker state
    const [searchTerm, setSearchTerm] = useState('');
    const [streetResults, setStreetResults] = useState([]);
    const [streetLoading, setStreetLoading] = useState(false);
    const [streetError, setStreetError] = useState(null);

    React.useEffect(() => {
        const handleResize = () => setDevice(getDevice());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    React.useEffect(() => {
        if (!searchTerm) {
            setStreetResults([]);
            setStreetLoading(false);
            setStreetError(null);
            return;
        }
        setStreetLoading(true);
        setStreetError(null);
        fetch(`/api/streets/search?q=${encodeURIComponent(searchTerm)}`)
            .then(res => res.json())
            .then(data => {
                setStreetResults(data.map(item => ({
                    straat: item.street,
                    contrei: item.contrei,
                    id: item._id,
                    gemeente: item.gemeente || ''
                })));
                setStreetLoading(false);
            })
            .catch(err => {
                setStreetError(err.message || 'Er is een fout opgetreden');
                setStreetLoading(false);
            });
    }, [searchTerm]);

    const isMobile = device === 'mobile';
    const isTablet = device === 'tablet';
    const heroResponsive = {
        ...heroStyles.hero,
        height: isMobile ? 180 : isTablet ? 260 : 'min(50vh, 400px)',
        minHeight: isMobile ? 120 : isTablet ? 180 : 320,
        marginTop: isMobile ? 64 : isTablet ? 56 : 0,
    };
    const titleFontSize = ((isMobile ? 2.5 : 3.5) * fontSizeFactor) + 'rem';
    const formWrapperResponsive = {
        ...formStyles.wrapper,
        padding: isMobile ? '1.2rem 0.7rem' : isTablet ? '2rem 1.2rem' : '2.5rem 2rem',
        marginTop: isMobile ? '1.2rem' : isTablet ? '2rem' : '2.5rem',
        marginBottom: isMobile ? '1.2rem' : isTablet ? '2rem' : '2.5rem',
        maxWidth: isMobile ? 380 : isTablet ? 500 : 600,
    };
    const formTitleResponsive = {
        ...formStyles.title,
        fontSize: ((isMobile ? 1.3 : isTablet ? 1.7 : 2) * fontSizeFactor) + 'rem',
    };
    const formSubtitleResponsive = {
        ...formStyles.subtitle,
        fontSize: ((isMobile ? 1.05 : isTablet ? 1.15 : 1.3) * fontSizeFactor) + 'rem',
        marginBottom: isMobile ? '1.2rem' : isTablet ? '1.7rem' : '2.2rem',
    };
    const inputResponsive = {
        ...formStyles.input,
        fontSize: ((isMobile ? 1 : isTablet ? 1.05 : 1.1) * fontSizeFactor) + 'rem',
        padding: isMobile ? '0.7rem' : '0.9rem',
    };
    const textareaResponsive = {
        ...formStyles.textarea,
        fontSize: ((isMobile ? 1 : isTablet ? 1.05 : 1.1) * fontSizeFactor) + 'rem',
        padding: isMobile ? '0.7rem' : '0.9rem',
        minHeight: isMobile ? 70 : isTablet ? 90 : 100,
    };
    const selectResponsive = {
        ...formStyles.select,
        fontSize: ((isMobile ? 1 : isTablet ? 1.05 : 1.1) * fontSizeFactor) + 'rem',
        padding: isMobile ? '0.7rem' : '0.9rem',
    };
    const buttonResponsive = {
        ...formStyles.button,
        fontSize: ((isMobile ? 1 : isTablet ? 1.08 : 1.15) * fontSizeFactor) + 'rem',
        padding: isMobile ? '0.8rem 0' : '1rem 0',
    };
    const rowResponsive = {
        ...formStyles.row,
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '0.7rem' : '1.2rem',
    };
    // Responsive row style voor adresvelden
    const addressRowResponsive = {
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '0.7rem' : '1.2rem',
        flexWrap: isMobile ? 'nowrap' : 'wrap',
        alignItems: 'stretch',
        width: '100%',
    };
    const streetInputWrapper = {
        flex: 2,
        position: 'relative',
        minWidth: isMobile ? 0 : 180,
        width: '100%',
        maxWidth: isMobile ? '100%' : 300,
        display: 'flex',
        flexDirection: 'column',
    };
    const nummerInputStyle = {
        ...inputResponsive,
        maxWidth: isMobile ? '100%' : 80,
        minWidth: 0,
        flex: isMobile ? 'unset' : '0 1 80px',
        width: '100%',
        padding: inputResponsive.padding,
        fontSize: inputResponsive.fontSize,
        height: 'auto',
        boxSizing: 'border-box',
    };
    const gemeenteInputStyle = {
        ...inputResponsive,
        maxWidth: isMobile ? '100%' : 160,
        minWidth: 0,
        flex: isMobile ? 'unset' : '1 1 120px',
        width: '100%',
        padding: inputResponsive.padding,
        fontSize: inputResponsive.fontSize,
        height: 'auto',
        boxSizing: 'border-box',
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Straat selecteren uit suggesties
    const handleStreetSelect = (item) => {
        setForm({
            ...form,
            straat: item.straat,
            contrei: item.contrei || '',
            gemeente: item.gemeente || form.gemeente
        });
        setSearchTerm(item.straat);
        setStreetResults([]);
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
                setForm({ naam: '', soort: '', bericht: '', datum: '', straat: '', nummer: '', gemeente: '', contrei: '', uur: '' });
                setSearchTerm('');
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
        <div id="help-main-content" style={{ width: '100%', minHeight: '100vh', background: '#fff' }}>
            <div style={heroResponsive}>
                <div style={heroStyles.overlay} />
                <div style={heroStyles.content}>
                    <h1 style={{ ...heroStyles.title, fontSize: titleFontSize }}>HULP?</h1>
                </div>
            </div>
            {/* Screenreader knop */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '1.2rem 0 0 0', width: '100%' }}>
                <button
                    onClick={speakHelpText}
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
                    aria-label="Lees de Hulp pagina voor"
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
            <div style={formWrapperResponsive}>
                <div style={formTitleResponsive}>BUREN VOOR BUREN</div>
                <div style={formSubtitleResponsive}>Plaats je aanvraag</div>
                <form onSubmit={handleSubmit} style={formStyles.form} autoComplete="off">
                    <div style={rowResponsive}>
                        <input name="naam" type="text" placeholder="Naam" value={form.naam} onChange={handleChange} style={inputResponsive} required />
                        <select name="soort" value={form.soort} onChange={handleChange} style={selectResponsive} required>
                            <option value="">Soort Hulp</option>
                            <option value="boodschappen">Boodschappen</option>
                            <option value="vervoer">Vervoer</option>
                            <option value="gezelschap">Gezelschap</option>
                            <option value="klusjes">Klusjes</option>
                            <option value="anders">Anders</option>
                        </select>
                    </div>
                    <textarea name="bericht" placeholder="Write Your Message Here..." value={form.bericht} onChange={handleChange} style={textareaResponsive} required />
                    <div style={rowResponsive}>
                        <input name="datum" type="date" placeholder="Datum" value={form.datum} onChange={handleChange} style={inputResponsive} required />
                    </div>
                    {/* Straatzoeker + huisnummer + gemeente + buurt */}
                    <div style={addressRowResponsive}>
                        <div style={streetInputWrapper}>
                            <input
                                name="straat"
                                type="text"
                                placeholder="Straat"
                                value={searchTerm || form.straat}
                                onChange={e => {
                                    setSearchTerm(e.target.value);
                                    setForm({ ...form, straat: e.target.value, contrei: '', gemeente: form.gemeente });
                                }}
                                style={inputResponsive}
                                autoComplete="off"
                                required
                            />
                            {/* Suggesties */}
                            {streetLoading && <div style={{ position: 'absolute', left: 0, top: '100%', background: '#fff', zIndex: 10, padding: 8, color: '#26913a', width: '100%', maxWidth: 300, borderRadius: 6 }}>Laden...</div>}
                            {streetError && <div style={{ position: 'absolute', left: 0, top: '100%', background: '#fff', zIndex: 10, padding: 8, color: '#e2725b', width: '100%', maxWidth: 300, borderRadius: 6 }}>Fout bij zoeken</div>}
                            {!streetLoading && !streetError && streetResults.length > 0 && (
                                <div style={{ position: 'absolute', left: 0, top: '100%', background: '#fff', zIndex: 10, width: '100%', maxWidth: 300, boxShadow: '0 2px 8px #0001', borderRadius: 6 }}>
                                    {streetResults.map((item, idx) => (
                                        <div
                                            key={item.id || idx}
                                            style={{ padding: '0.6rem 1rem', cursor: 'pointer', borderBottom: idx !== streetResults.length - 1 ? '1px solid #eee' : 'none', color: '#137c3a', background: '#fff' }}
                                            onClick={() => handleStreetSelect(item)}
                                        >
                                            <span style={{ fontWeight: 600 }}>{item.straat}</span>
                                            {item.contrei && <span style={{ color: '#888', marginLeft: 8 }}>({item.contrei})</span>}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <input
                            name="nummer"
                            type="text"
                            placeholder="Nr."
                            value={form.nummer}
                            onChange={handleChange}
                            style={nummerInputStyle}
                            required
                        />
                        <input
                            name="gemeente"
                            type="text"
                            placeholder="Gemeente"
                            value={form.gemeente}
                            onChange={handleChange}
                            style={gemeenteInputStyle}
                            required
                        />
                    </div>
                    <div style={rowResponsive}>
                        <input
                            name="contrei"
                            type="text"
                            placeholder="Buurt/Contrei"
                            value={form.contrei}
                            readOnly
                            style={{ ...inputResponsive, background: '#f5f5f5', color: '#888', fontStyle: 'italic' }}
                        />
                    </div>
                    <div style={rowResponsive}>
                        <input name="uur" type="time" placeholder="Uur" value={form.uur} onChange={handleChange} style={inputResponsive} required />
                    </div>
                    <button type="submit" disabled={loading} style={buttonResponsive}>{loading ? 'Verzenden...' : 'SUBMIT'}</button>
                    {status === 'success' && <div style={{ color: '#26913a', textAlign: 'center', marginTop: 12, fontSize: (1 * fontSizeFactor) + 'rem' }}>Je aanvraag is verstuurd!</div>}
                    {status === 'error' && <div style={{ color: '#e2725b', textAlign: 'center', marginTop: 12, fontSize: (1 * fontSizeFactor) + 'rem' }}>Er is iets misgegaan. Probeer opnieuw.</div>}
                </form>
            </div>
            <Footer />
        </div>
    );
}

Help.propTypes = {
    fontSizeFactor: PropTypes.number.isRequired,
};

export default Help; 