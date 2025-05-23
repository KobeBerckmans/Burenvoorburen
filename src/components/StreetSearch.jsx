import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

const styles = {
    wrapper: {
        width: '100%',
        maxWidth: 600,
        margin: '2rem auto',
        position: 'relative',
        padding: '0 1rem',
    },
    searchContainer: {
        position: 'relative',
        width: '100%',
        background: '#fff',
        borderRadius: '12px',
        padding: '0.5rem',
    },
    input: {
        width: '100%',
        padding: '0.8rem 3rem 0.8rem 1.5rem',
        fontSize: '1rem',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        outline: 'none',
        transition: 'all 0.2s ease',
        fontFamily: 'Montserrat, sans-serif',
        backgroundColor: 'white',
        color: '#222',
        '&::placeholder': {
            color: '#999',
        },
        '&:focus': {
            boxShadow: '0 0 0 2px rgba(38, 145, 58, 0.1)',
        },
    },
    searchIcon: {
        position: 'absolute',
        right: '1.2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 20,
        height: 20,
        color: '#26913a',
    },
    resultsContainer: {
        position: 'relative',
        marginTop: '0.5rem',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        zIndex: 1000,
        maxHeight: '300px',
        overflowY: 'auto',
    },
    resultItem: {
        padding: '0.8rem 1.2rem',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        borderBottom: '1px solid #f0f0f0',
        '&:hover': {
            background: '#f8f8f8',
        },
        '&:last-child': {
            borderBottom: 'none',
        },
    },
    streetName: {
        color: '#222',
        fontWeight: 600,
        fontSize: '0.95rem',
        marginBottom: '0.2rem',
        fontFamily: 'Montserrat, sans-serif',
    },
    contreiName: {
        color: '#666',
        fontSize: '0.85rem',
        fontFamily: 'Montserrat, sans-serif',
    },
    noResults: {
        padding: '1rem 1.5rem',
        color: '#666',
        textAlign: 'center',
        fontStyle: 'italic',
        fontFamily: 'Montserrat, sans-serif',
    },
    highlight: {
        backgroundColor: '#eaffea',
        padding: '0 2px',
        borderRadius: '2px',
        color: '#26913a',
    },
    searchTitle: {
        color: '#26913a',
        fontWeight: 700,
        fontSize: '1.1rem',
        marginBottom: '1rem',
        textAlign: 'center',
        fontFamily: 'CocogooseProTrial',
    }
};

const isTablet = typeof window !== 'undefined' && window.innerWidth > 600 && window.innerWidth <= 1024;
const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;

const wrapperResponsive = {
    ...styles.wrapper,
    ...(isTablet ? { maxWidth: 400, width: '100%', margin: 0 } : {})
};

const searchTitleResponsive = {
    ...styles.searchTitle,
    ...(isMobile ? { marginLeft: 15, textAlign: 'left' } : {})
};

const searchContainerResponsive = {
    ...styles.searchContainer,
    ...(isMobile ? { width: '100%', margin: 0, padding: 0, marginLeft: -20, display: 'flex', alignItems: 'center', position: 'relative' } : {})
};

const inputResponsive = {
    ...styles.input,
    ...(isTablet ? { maxWidth: 320 } : {}),
    ...(isMobile ? { width: '100%', maxWidth: 420, margin: 0, paddingRight: 40, } : {})
};

const searchIconResponsive = {
    ...styles.searchIcon,
    ...(isMobile ? { right: 10 } : {})
};

export default function StreetSearch({ searchTerm, setSearchTerm, results, loading, error }) {
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const highlightMatch = (text, query) => {
        if (!query) return text;
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return parts.map((part, i) =>
            part.toLowerCase() === query.toLowerCase()
                ? <span key={i} style={styles.highlight}>{part}</span>
                : part
        );
    };

    console.log('results:', results, 'loading:', loading, 'error:', error, 'searchTerm:', searchTerm);

    return (
        <div style={wrapperResponsive}>
            <div style={searchTitleResponsive}>Zoek je straat</div>
            <div style={searchContainerResponsive}>
                <input
                    type="text"
                    placeholder="Typ de naam van je straat..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    style={{
                        ...inputResponsive,
                        ...(isMobile ? { fontSize: '0.85rem' } : {})
                    }}
                />
                <MagnifyingGlassIcon style={searchIconResponsive} />
            </div>
            {/* Zoekresultaten */}
            {(loading || error || (results && results.length > 0) || (searchTerm && results && results.length === 0)) && (
                <div style={styles.resultsContainer}>
                    {loading && <div style={styles.noResults}>Laden...</div>}
                    {error && <div style={styles.noResults}>Er is een fout opgetreden.</div>}
                    {!loading && !error && results && results.length === 0 && searchTerm && (
                        <div style={styles.noResults}>Geen straten gevonden.</div>
                    )}
                    {!loading && !error && results && results.length > 0 && results.map((item, idx) => (
                        <div key={item.id || idx} style={styles.resultItem}>
                            <div style={styles.streetName}>{highlightMatch(item.straat, searchTerm)}</div>
                            {item.contrei && <div style={styles.contreiName}>{item.contrei}</div>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

StreetSearch.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    setSearchTerm: PropTypes.func.isRequired,
    results: PropTypes.arrayOf(PropTypes.shape({
        straat: PropTypes.string.isRequired,
        contrei: PropTypes.string,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })).isRequired,
    loading: PropTypes.bool,
    error: PropTypes.any,
}; 