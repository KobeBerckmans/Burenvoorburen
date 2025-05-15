import React from 'react';

const houseIcon = (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M3 11.5L12 4l9 7.5" stroke="#26913a" strokeWidth="2.5" fill="none" /><rect x="7" y="14" width="10" height="6" rx="2" fill="#eaffea" stroke="#26913a" strokeWidth="2" /></svg>
);

const groups = [
    {
        title: 'Tienen-centrum binnen de vesten:',
        items: [
            { name: 'Centrum-Oost', bold: true },
            { name: 'VeDoVe', bold: false },
            { name: 'Centrum-Zuid', bold: true },
            { name: 'Drakendorp', bold: false },
        ]
    },
    {
        title: 'Tienen-centrum buiten de vesten:',
        items: [
            { name: 'Tienen-Noord' }, { name: 'Grimde' }, { name: 'Potterij' }
        ]
    },
    {
        title: 'Deelgemeenten: Bost en Kumtich',
        items: [
            { name: 'Bost' }, { name: 'Kumtich' }
        ]
    }
];

const styles = {
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '3vw',
        margin: '2.5rem 0 2.5rem 0',
        flexWrap: 'wrap',
    },
    col: {
        minWidth: 220,
        maxWidth: 320,
        background: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '0.7rem',
    },
    title: {
        color: '#26913a',
        fontWeight: 700,
        fontSize: '1.1rem',
        margin: '0.7rem 0 0.5rem 0',
        fontFamily: 'CocogooseProTrial',
    },
    item: {
        color: '#222',
        fontSize: '1rem',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 400,
        margin: 0,
    },
    itemBold: {
        fontWeight: 700,
        color: '#26913a',
    }
};

export default function BuurtenGroups() {
    return (
        <div style={styles.wrapper}>
            {groups.map((group, idx) => (
                <div key={group.title} style={styles.col}>
                    {houseIcon}
                    <div style={styles.title}>{group.title}</div>
                    <div>
                        {group.items.map((item, i) => (
                            <div key={i} style={item.bold ? { ...styles.item, ...styles.itemBold } : styles.item}>{item.name}</div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
} 