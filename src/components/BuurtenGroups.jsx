import React, { useEffect, useState } from 'react';
import { HomeIcon } from '@heroicons/react/24/outline';
import StreetSearch from './StreetSearch';

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
        maxWidth: 'none',
        width: '100%',
        margin: 0,
        padding: '1.2rem 0',
        display: 'flex',
        justifyContent: 'flex-start',
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

export default function BuurtenGroups() {
    const [visibleElements, setVisibleElements] = useState({});

    // Zoeklogica naar deze component
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const searchStreets = async () => {
            if (!searchTerm.trim()) {
                setResults([]);
                return;
            }
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:3001/api/streets/search?q=${encodeURIComponent(searchTerm.trim())}`);
                if (!response.ok) throw new Error('Zoeken mislukt');
                const data = await response.json();
                setResults(data);
                setError(null);
            } catch {
                setError('Er is een fout opgetreden bij het zoeken');
                setResults([]);
            } finally {
                setLoading(false);
            }
        };
        const debounceTimer = setTimeout(searchStreets, 150);
        return () => clearTimeout(debounceTimer);
    }, [searchTerm]);

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

    const getAnimationStyle = (id, baseStyle) => ({
        ...baseStyle,
        ...(visibleElements[id] ? styles.visible : styles.hidden)
    });

    // Helper voor zoekresultaten
    const highlightMatch = (text, query) => {
        if (!query) return text;
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return parts.map((part, i) =>
            part.toLowerCase() === query.toLowerCase()
                ? <span key={i} style={{ backgroundColor: '#eaffea', padding: '0 2px', borderRadius: '2px', color: '#26913a' }}>{part}</span>
                : part
        );
    };

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
                            style={getAnimationStyle(`title-${groupIndex}`, styles.title)}
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
            {/* Zoekresultaten boven contreienlijst op mobiel/tablet */}
            {(isMobile || isTablet) && (searchTerm.trim() || loading) && (
                <div style={{ width: '100%', maxWidth: isMobile ? 425 : 400, margin: isMobile ? '0 auto 1.2rem auto' : '0 auto 2rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', padding: isMobile ? '0.5rem 0.5rem' : '1rem 1.2rem', zIndex: 10 }}>
                    {loading ? (
                        <div style={{ padding: '1rem 1.5rem', color: '#666', textAlign: 'center', fontStyle: 'italic' }}>Zoeken...</div>
                    ) : error ? (
                        <div style={{ padding: '1rem 1.5rem', color: '#666', textAlign: 'center', fontStyle: 'italic' }}>{error}</div>
                    ) : results.length === 0 ? (
                        <div style={{ padding: '1rem 1.5rem', color: '#666', textAlign: 'center', fontStyle: 'italic' }}>
                            {searchTerm.trim().length > 0 ? 'Geen straten gevonden' : 'Begin met typen...'}
                        </div>
                    ) : (
                        results.map((result) => (
                            <div key={result._id} style={{ padding: '0.8rem 1.2rem', cursor: 'pointer', borderBottom: '1px solid #f0f0f0' }}>
                                <div style={{ color: '#222', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.2rem', fontFamily: 'Montserrat, sans-serif' }}>
                                    {highlightMatch(result.street, searchTerm)}
                                </div>
                                <div style={{ color: '#666', fontSize: '0.85rem', fontFamily: 'Montserrat, sans-serif' }}>
                                    {result.contrei} ({result.type})
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
} 