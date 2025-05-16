import React from 'react';
import { HomeIcon } from '@heroicons/react/24/outline';
import StreetSearch from './StreetSearch';

const houseIcon = (
    <HomeIcon
        style={{
            width: 36,
            height: 36,
            color: '#26913a',
            strokeWidth: 2
        }}
    />
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
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        padding: '0 1rem',
    },
    groupsWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '3vw',
        margin: '2.5rem 0 4rem 0',
        flexWrap: 'wrap',
    },
    searchWrapper: {
        width: '100%',
        maxWidth: 800,
        margin: '0 auto',
        padding: '2rem 0',
        borderTop: '1px solid #e0e0e0',
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
            <div style={styles.groupsWrapper}>
                {groups.map((group) => (
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
            <div style={styles.searchWrapper}>
                <StreetSearch />
            </div>
        </div>
    );
} 