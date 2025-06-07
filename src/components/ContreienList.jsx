import React from 'react';
import PropTypes from 'prop-types';

const contreien = [
    'Centrum-Noord', 'Centrum-Oost (VeDoVe)', 'Centrum-Zuid (Drakendorp)', 'Galgeveld', 'Watertoren (Park Passionisten)',
    'DOK van Tienen', 'Viandra', 'Grimde', 'Potterij', 'Mulk', 'IJzerenweg', 'Kumtich', 'Vissenaken', 'Sint-Margriete-Houtem',
    'Oplinter', 'Hakendover/Meer', 'Goetsenhoven', 'Bost', 'Oorbeek'
];

const styles = {
    wrapper: {
        padding: '3.5rem 1.5rem',
        margin: '2.5rem 0',
        width: '100%',
        borderRadius: 24,
    },
    title: {
        color: '#e2725b',
        fontWeight: 700,
        fontSize: 'clamp(1.8rem, 3vw, 2.2rem)',
        fontFamily: 'CocogooseProTrial',
        margin: '0 0 3rem 0',
        textAlign: 'center',
        position: 'relative',
        '::after': {
            content: '""',
            position: 'absolute',
            bottom: '-1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '3px',
            background: 'linear-gradient(90deg, rgba(226,114,91,0.2), rgba(38,145,58,0.2))',
            borderRadius: '2px'
        }
    },
    list: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(220px, 1fr))',
        gap: '1.2rem',
        maxWidth: 1000,
        margin: '0 auto',
        padding: '0 1rem',
        justifyContent: 'center',
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem 1.2rem',
        background: '#fbeeea',
        borderRadius: 12,
        cursor: 'pointer',
    },
    number: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        background: '#e2725b',
        color: 'white',
        fontWeight: 700,
        fontSize: '1rem',
        borderRadius: '50%',
        flexShrink: 0,
    },
    name: {
        color: '#26913a',
        fontWeight: 600,
        fontSize: '1.1rem',
        fontFamily: 'Montserrat, sans-serif',
        flex: 1,
    }
};

const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;
const isTablet = typeof window !== 'undefined' && window.innerWidth > 600 && window.innerWidth <= 1024;

const wrapperResponsive = {
    ...styles.wrapper,
    ...(isTablet ? { maxWidth: 768, margin: '2.5rem auto', padding: '2rem 0.5rem' } : {}),
    ...(isMobile ? { maxWidth: 425, margin: '2rem auto', padding: '1.2rem 0.2rem' } : {})
};

const listResponsive = {
    ...styles.list,
    ...(isTablet ? {
        maxWidth: 768,
        gridTemplateColumns: 'repeat(2, minmax(140px, 1fr))',
        gap: '0.7rem',
        padding: '0 0.5rem',
    } : {}),
    ...(isMobile ? {
        maxWidth: 425,
        gridTemplateColumns: 'repeat(2, minmax(90px, 1fr))',
        gap: '0.4rem',
        padding: '0 0.2rem',
    } : {})
};

const itemResponsive = {
    ...styles.item,
    ...(isTablet ? {
        padding: '0.7rem 0.7rem',
        fontSize: '0.95rem',
        gap: '0.6rem',
    } : {}),
    ...(isMobile ? {
        padding: '0.5rem 0.4rem',
        fontSize: '0.85rem',
        gap: '0.3rem',
    } : {})
};

const numberResponsive = {
    ...styles.number,
    ...(isTablet ? {
        width: 24,
        height: 24,
        fontSize: '0.85rem',
    } : {}),
    ...(isMobile ? {
        width: 18,
        height: 18,
        fontSize: '0.7rem',
    } : {})
};

const nameResponsive = {
    ...styles.name,
    ...(isTablet ? {
        fontSize: '0.95rem',
    } : {}),
    ...(isMobile ? {
        fontSize: '0.85rem',
    } : {})
};

/**
 * ContreienList component
 * Renders a responsive grid of all areas
 */
const ContreienList = ({ fontSizeFactor = 1 }) => {
    return (
        <div style={wrapperResponsive}>
            <div style={{ ...styles.title, fontSize: `calc(2.1rem * ${fontSizeFactor})` }}>BUURTEN</div>
            <div className="buurten-list" style={listResponsive}>
                {contreien.map((name, i) => (
                    <div key={i} style={{ ...itemResponsive, fontSize: `calc(1.08rem * ${fontSizeFactor})` }}>
                        <div style={{ ...numberResponsive, fontSize: `calc(1rem * ${fontSizeFactor})` }}>{i + 1}</div>
                        <div style={{ ...nameResponsive, fontSize: `calc(0.95rem * ${fontSizeFactor})` }}>{name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

ContreienList.propTypes = {
    fontSizeFactor: PropTypes.number,
};

export default ContreienList; 