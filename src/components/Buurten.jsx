import React from 'react';
import PropTypes from 'prop-types';
import BuurtenHero from './BuurtenHero';
import BuurtenGroups from './BuurtenGroups';
import ContreienList from './ContreienList';
import Footer from './Footer';

function Buurten({ fontSizeFactor }) {
    return (
        <div id="buurten-main-content" style={{ width: '100%', background: '#f8f8f8', minHeight: '100vh' }}>
            <BuurtenHero fontSizeFactor={fontSizeFactor} />
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