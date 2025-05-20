import React from 'react';
import PropTypes from 'prop-types';
import BuurtenHero from './BuurtenHero';
import BuurtenGroups from './BuurtenGroups';
import ContreienList from './ContreienList';
import Footer from './Footer';

// Screenreader instructie en voorleesfunctie
function speakBuurtenPageText() {
    if ('speechSynthesis' in window) {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            return;
        }
    }
    const mainContent = document.getElementById('buurten-main-content');
    let text = '';
    if (mainContent) {
        text = mainContent.innerText;
        // Filter 'Lees meer' knoppen en 🔊 emoji uit de tekst
        text = text.replace(/Lees meer/g, '').replace(/🔊/g, '').replace(/\s{2,}/g, ' ').trim();
    } else {
        text = `Ontdek de buurten en contreien van Tienen.`;
    }
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new window.SpeechSynthesisUtterance(text);
        utterance.lang = 'nl-BE';
        utterance.rate = 0.85;
        window.speechSynthesis.speak(utterance);
    } else {
        alert('Deze browser ondersteunt geen voorleesfunctie.');
    }
}

function Buurten({ fontSizeFactor }) {
    return (
        <div id="buurten-main-content" style={{ width: '100%', background: '#f8f8f8', minHeight: '100vh' }}>
            {/* Screenreader only instructie */}
            <div style={{ position: 'absolute', left: -9999, width: 1, height: 1, overflow: 'hidden' }} aria-live="polite">
                Gebruik de tab-toets om door de buurten en contreien te navigeren. Druk op de &apos;Lees voor&apos; knop om de pagina te laten voorlezen.
            </div>
            <BuurtenHero fontSizeFactor={fontSizeFactor} />
            {/* Lees voor button */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '1.2rem 0 0 0', width: '100%' }}>
                <button
                    onClick={speakBuurtenPageText}
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
                    aria-label="Lees de buurtenpagina voor"
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
            <div className="buurten-container" style={{ margin: '0 auto', maxWidth: 1100, padding: '2.5rem 1.5rem 0 1.5rem' }}>
                <div className="buurten-card" style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 18px 0 rgba(44,62,80,0.10)', padding: '2.5rem 1.5rem', marginBottom: '2.5rem' }}>
                    <BuurtenGroups fontSizeFactor={fontSizeFactor} />
                </div>
                <div className="buurten-card" style={{ background: '#fbeeea', borderRadius: 18, boxShadow: '0 4px 18px 0 rgba(44,62,80,0.10)', padding: '2.5rem 1.5rem', marginBottom: '2.5rem' }}>
                    <ContreienList fontSizeFactor={fontSizeFactor} />
                </div>
            </div>
            <div style={{ width: '100%' }}>
                <Footer />
            </div>
        </div>
    );
}

Buurten.propTypes = {
    fontSizeFactor: PropTypes.number.isRequired,
};

export default Buurten; 