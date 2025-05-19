import React from 'react';
import BuurtenHero from './BuurtenHero';
import BuurtenGroups from './BuurtenGroups';
import ContreienList from './ContreienList';
import Footer from './Footer';

export default function Buurten() {
    return (
        <div style={{ width: '100%', background: '#f8f8f8', minHeight: '100vh' }}>
            <BuurtenHero />
            <div className="buurten-container" style={{ margin: '0 auto', maxWidth: 1100, padding: '2.5rem 1.5rem 0 1.5rem' }}>
                <div className="buurten-card" style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 18px 0 rgba(44,62,80,0.10)', padding: '2.5rem 1.5rem', marginBottom: '2.5rem' }}>
                    <BuurtenGroups />
                </div>
                <div className="buurten-card" style={{ background: '#fbeeea', borderRadius: 18, boxShadow: '0 4px 18px 0 rgba(44,62,80,0.10)', padding: '2.5rem 1.5rem', marginBottom: '2.5rem' }}>
                    <ContreienList />
                </div>
            </div>
            <div style={{ width: '100%' }}>
                <Footer />
            </div>
        </div>
    );
} 