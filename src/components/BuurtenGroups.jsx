import React, { useEffect, useState } from 'react';
import { HomeIcon } from '@heroicons/react/24/outline';
import StreetSearch from './StreetSearch';
import PropTypes from 'prop-types';

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
        transition: 'all 0.6s ease',
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
        transition: 'all 0.6s ease',
    },
    iconContainer: {
        width: 36,
        height: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.5s ease',
    },
    icon: {
        width: '100%',
        height: '100%',
        color: '#26913a',
        strokeWidth: 2,
    },
    title: {
        color: '#26913a',
        fontWeight: 700,
        fontSize: '1.1rem',
        margin: '0.7rem 0 0.5rem 0',
        fontFamily: 'CocogooseProTrial',
        transition: 'all 0.5s ease',
    },
    itemsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        width: '100%',
    },
    item: {
        color: '#222',
        fontSize: '1rem',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 400,
        margin: 0,
        transition: 'all 0.4s ease',
    },
    itemBold: {
        fontWeight: 700,
        color: '#26913a',
    },
    visible: {
        opacity: 1,
        transform: 'translateY(0)',
    },
    hidden: {
        opacity: 0,
        transform: 'translateY(20px)',
    }
};

const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;
const isTablet = typeof window !== 'undefined' && window.innerWidth > 600 && window.innerWidth <= 1024;

const searchWrapperResponsive = {
    ...styles.searchWrapper,
    ...(isMobile ? {
        maxWidth: 200,
        margin: '0',
        marginLeft: 0,
        padding: '1.2rem 0',
        display: 'block',
    } : isTablet ? {
        maxWidth: 'none',
        width: '100%',
        margin: 0,
        padding: '1.5rem 0',
        display: 'flex',
        justifyContent: 'flex-start',
        textAlign: 'left',
        marginLeft: 250,
    } : {})
};

const wrapperResponsive = {
    ...styles.wrapper,
    ...(isTablet ? { maxWidth: 768, margin: '0 auto' } : {})
};

export default function BuurtenGroups({ fontSizeFactor }) {
    const [visibleElements, setVisibleElements] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const id = entry.target.getAttribute('data-id');
                    if (entry.isIntersecting) {
                        setVisibleElements(prev => ({
                            ...prev,
                            [id]: true
                        }));
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        document.querySelectorAll('[data-id]').forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!searchTerm) {
            setResults([]);
            setLoading(false);
            setError(null);
            return;
        }
        setLoading(true);
        setError(null);
        fetch(`/api/streets/search?q=${encodeURIComponent(searchTerm)}`)
            .then(res => res.json())
            .then(data => {
                setResults(data.map(item => ({
                    straat: item.street,
                    contrei: item.contrei,
                    id: item._id
                })));
                setLoading(false);
            })
            .catch(err => {
                setError(err.message || 'Er is een fout opgetreden');
                setLoading(false);
            });
    }, [searchTerm]);

    const getAnimationStyle = (id, baseStyle) => ({
        ...baseStyle,
        ...(visibleElements[id] ? styles.visible : styles.hidden)
    });

    return (
        <div style={wrapperResponsive}>
            <div className="groups-wrapper" style={styles.groupsWrapper}>
                {groups.map((group, groupIndex) => (
                    <div
                        key={group.title}
                        style={getAnimationStyle(`col-${groupIndex}`, styles.col)}
                        data-id={`col-${groupIndex}`}
                    >
                        <div
                            style={getAnimationStyle(`icon-${groupIndex}`, styles.iconContainer)}
                            data-id={`icon-${groupIndex}`}
                        >
                            <HomeIcon style={styles.icon} />
                        </div>
                        <div
                            style={{ ...getAnimationStyle(`title-${groupIndex}`, styles.title), fontSize: `calc(1.1rem * ${fontSizeFactor})` }}
                            data-id={`title-${groupIndex}`}
                        >
                            {group.title}
                        </div>
                        <div style={styles.itemsContainer}>
                            {group.items.map((item, i) => (
                                <div
                                    key={i}
                                    style={{
                                        ...getAnimationStyle(`item-${groupIndex}-${i}`, item.bold ? { ...styles.item, ...styles.itemBold } : styles.item),
                                        fontSize: `calc(1rem * ${fontSizeFactor})`,
                                        transitionDelay: `${0.1 * (i + 1)}s`
                                    }}
                                    data-id={`item-${groupIndex}-${i}`}
                                >
                                    {item.name}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div
                className="groups-search-wrapper"
                style={getAnimationStyle('search', searchWrapperResponsive)}
                data-id="search"
            >
                <StreetSearch
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    results={results}
                    loading={loading}
                    error={error}
                />
            </div>
        </div>
    );
}

BuurtenGroups.propTypes = {
    fontSizeFactor: PropTypes.number.isRequired,
}; 