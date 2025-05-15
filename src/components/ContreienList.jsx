import React from 'react';

const contreien = [
    'Centrum-Noord', 'Centrum-Oost (VeDoVe)', 'Centrum-Zuid (Drakendorp)', 'Galgeveld', 'Watertoren (Park Passionisten)',
    'DOK van Tienen', 'Viandra', 'Grimde', 'Potterij', 'Mulk', 'IJzerenweg', 'Kumtich', 'Vissenaken', 'Sint-Margriete-Houtem',
    'Oplinter', 'Hakendover/Meer', 'Goetsenhoven', 'Bost', 'Oorbeek'
];

const styles = {
    wrapper: {
        background: '#fbeeea',
        padding: '2.5rem 0',
        margin: '2.5rem 0',
        width: '100%',
    },
    title: {
        color: '#e2725b',
        fontWeight: 700,
        fontSize: '2rem',
        fontFamily: 'CocogooseProTrial',
        margin: '0 0 1.5rem 2.5vw',
    },
    list: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0.7rem 2.5vw',
        maxWidth: 900,
        margin: '0 auto',
    },
    item: {
        color: '#26913a',
        fontWeight: 700,
        fontSize: '1.1rem',
        fontFamily: 'Montserrat, sans-serif',
        marginBottom: '0.2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.7rem',
    },
    number: {
        color: '#e2725b',
        fontWeight: 700,
        fontSize: '1.1rem',
        minWidth: 24,
        textAlign: 'right',
    }
};

export default function ContreienList() {
    return (
        <div style={styles.wrapper}>
            <div style={styles.title}>CONTREIEN</div>
            <div style={styles.list}>
                {contreien.map((name, i) => (
                    <div key={i} style={styles.item}>
                        <span style={styles.number}>{i + 1}</span>
                        {name}
                    </div>
                ))}
            </div>
        </div>
    );
} 