import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

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
        position: 'absolute',
        top: '100%',
        left: '1rem',
        right: '1rem',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        marginTop: '0.5rem',
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

export default function StreetSearch() {
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
            } catch (err) {
                console.error('Search error:', err);
                setError('Er is een fout opgetreden bij het zoeken');
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        // Reduced debounce time for more immediate feedback
        const debounceTimer = setTimeout(searchStreets, 150);
        return () => clearTimeout(debounceTimer);
    }, [searchTerm]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        // Show loading state immediately
        if (value.trim()) {
            setLoading(true);
        }
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

    return (
        <div style={styles.wrapper}>
            <div style={styles.searchTitle}>Zoek je straat</div>
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Typ de naam van je straat..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    style={styles.input}
                />
                <MagnifyingGlassIcon style={styles.searchIcon} />
            </div>

            {(searchTerm.trim() || loading) && (
                <div style={styles.resultsContainer}>
                    {loading ? (
                        <div style={styles.noResults}>Zoeken...</div>
                    ) : error ? (
                        <div style={styles.noResults}>{error}</div>
                    ) : results.length === 0 ? (
                        <div style={styles.noResults}>
                            {searchTerm.trim().length > 0 ? 'Geen straten gevonden' : 'Begin met typen...'}
                        </div>
                    ) : (
                        results.map((result) => (
                            <div key={result._id} style={styles.resultItem}>
                                <div style={styles.streetName}>
                                    {highlightMatch(result.street, searchTerm)}
                                </div>
                                <div style={styles.contreiName}>
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