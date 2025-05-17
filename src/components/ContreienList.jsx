import React from 'react';

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
        gridTemplateColumns: 'repeat(3, minmax(280px, 1fr))',
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

export default function ContreienList() {
    return (
        <div style={styles.wrapper}>
            <h2 style={styles.title}>CONTREIEN</h2>
            <div style={styles.list}>
                {contreien.map((name, i) => (
                    <div key={i} style={styles.item}>
                        <div style={styles.number}>{i + 1}</div>
                        <div style={styles.name}>{name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
} 