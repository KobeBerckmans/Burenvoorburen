import React, { useState, useEffect } from 'react';

function NewsFeed() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const isMobile = window.innerWidth <= 600;
    const isTablet = window.innerWidth > 600 && window.innerWidth <= 1024;
    const visible = isMobile ? 1 : isTablet ? 2 : 3;

    // Helper function to parse Dutch date string
    const parseDutchDate = (dateStr) => {
        const months = {
            'januari': 0, 'februari': 1, 'maart': 2, 'april': 3, 'mei': 4, 'juni': 5,
            'juli': 6, 'augustus': 7, 'september': 8, 'oktober': 9, 'november': 10, 'december': 11
        };

        const [day, month, year] = dateStr.split(' ');
        return new Date(year, months[month.toLowerCase()], parseInt(day));
    };

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/news');
                if (!response.ok) throw new Error('Failed to fetch news');
                const data = await response.json();
                // Sort news by date, most recent first
                const sortedNews = data.sort((a, b) => parseDutchDate(b.datum) - parseDutchDate(a.datum));
                setNews(sortedNews);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    const getImageUrl = (imgPath) => {
        if (!imgPath) return null;
        return imgPath.startsWith('http') ? imgPath : `http://localhost:3001${imgPath}`;
    };

    const nextSlide = () => {
        const maxSlides = Math.ceil(news.length / visible) - 1;
        setCurrentSlide(prev => (prev < maxSlides ? prev + 1 : 0));
    };

    const prevSlide = () => {
        const maxSlides = Math.ceil(news.length / visible) - 1;
        setCurrentSlide(prev => (prev > 0 ? prev - 1 : maxSlides));
    };

    // Get visible news items
    const getVisibleNews = () => {
        const start = currentSlide * visible;
        let items = news.slice(start, start + visible);
        // If we don't have enough items to fill the slide, wrap around
        while (items.length < visible) {
            items = [...items, ...news.slice(0, visible - items.length)];
        }
        return items;
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '200px',
                fontSize: '1.1rem',
                color: '#666'
            }}>
                Nieuws laden...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '200px',
                color: '#e2725b',
                fontSize: '1.1rem'
            }}>
                Er is een fout opgetreden bij het laden van het nieuws.
            </div>
        );
    }

    const styles = {
        section: {
            width: '100%',
            maxWidth: isMobile ? 340 : isTablet ? 700 : '1200px',
            margin: isMobile ? '2.5rem auto' : isTablet ? '3rem auto' : '4rem auto',
            padding: isMobile ? '0 0.5rem' : isTablet ? '0 1rem' : '0 1.5rem',
            position: 'relative'
        },
        title: {
            color: '#26913a',
            fontWeight: 700,
            fontSize: isMobile ? '1.3rem' : isTablet ? '1.7rem' : '2.2rem',
            marginBottom: isMobile ? '0.7rem' : isTablet ? '1rem' : '1.5rem',
            fontFamily: 'CocogooseProTrial',
            textAlign: 'center',
        },
        sliderContainer: {
            position: 'relative',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: isMobile ? 0 : isTablet ? '18px' : '32px',
        },
        newsGrid: {
            display: 'flex',
            gap: isMobile ? 0 : isTablet ? '18px' : '32px',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: isMobile ? '98vw' : isTablet ? '95vw' : '100%',
            maxWidth: isMobile ? 280 : isTablet ? 650 : '1100px',
        },
        article: {
            width: isMobile ? 260 : isTablet ? 300 : '320px',
            minWidth: 0,
            background: 'white',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 4px 18px 0 rgba(44,62,80,0.10)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            height: isMobile ? 260 : isTablet ? 320 : '400px',
        },
        imageContainer: {
            width: '100%',
            height: isMobile ? 100 : isTablet ? 140 : '200px',
            overflow: 'hidden',
            flexShrink: 0
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        },
        content: {
            padding: isMobile ? '0.7rem 0.5rem' : isTablet ? '1rem 0.7rem' : '1.2rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
            width: '100%',
            overflow: 'hidden'
        },
        date: {
            color: '#e2725b',
            fontSize: isMobile ? '0.8rem' : isTablet ? '0.85rem' : '0.9rem',
            marginBottom: isMobile ? '0.3rem' : isTablet ? '0.4rem' : '0.5rem',
            fontFamily: 'Montserrat, sans-serif',
            flexShrink: 0
        },
        heading: {
            color: '#222',
            fontSize: isMobile ? '0.98rem' : isTablet ? '1.05rem' : '1.1rem',
            fontWeight: 600,
            marginBottom: isMobile ? '0.4rem' : isTablet ? '0.6rem' : '0.75rem',
            fontFamily: 'CocogooseProTrial',
            textAlign: 'center',
            flexShrink: 0
        },
        description: {
            color: '#444',
            fontSize: isMobile ? '0.85rem' : isTablet ? '0.9rem' : '0.95rem',
            lineHeight: 1.5,
            fontFamily: 'Montserrat, sans-serif',
            textAlign: 'center',
            maxWidth: isMobile ? 220 : isTablet ? 240 : '260px',
            overflowY: 'auto',
            margin: '0 auto',
            flex: 1,
            paddingRight: isMobile ? 0 : isTablet ? '4px' : '8px',
            scrollbarWidth: 'thin',
            scrollbarColor: '#e2725b #f5f5f5',
            '&::-webkit-scrollbar': {
                width: '6px'
            },
            '&::-webkit-scrollbar-track': {
                background: '#f5f5f5',
                borderRadius: '3px'
            },
            '&::-webkit-scrollbar-thumb': {
                background: '#e2725b',
                borderRadius: '3px'
            }
        },
        navButton: {
            position: isMobile ? 'static' : 'absolute',
            top: isMobile ? undefined : '50%',
            transform: isMobile ? undefined : 'translateY(-50%)',
            background: 'none',
            border: 'none',
            width: '38px',
            height: '38px',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 2
        },
        prevButton: {
            left: isMobile ? undefined : isTablet ? '-36px' : '-56px',
            marginRight: isMobile ? 8 : isTablet ? 4 : 0,
        },
        nextButton: {
            right: isMobile ? undefined : isTablet ? '-36px' : '-56px',
            marginLeft: isMobile ? 8 : isTablet ? 4 : 0,
        }
    };

    return (
        <section style={styles.section}>
            <h2 style={styles.title}>Nieuws</h2>
            <div style={styles.sliderContainer}>
                <button
                    onClick={prevSlide}
                    style={{ ...styles.navButton, ...styles.prevButton }}
                    aria-label="Vorige nieuwsitems"
                >
                    <svg width="38" height="38" viewBox="0 0 24 24">
                        <path d="M15 18l-6-6 6-6" stroke="#e2725b" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                    </svg>
                </button>
                <div style={styles.newsGrid}>
                    {getVisibleNews().map((item) => (
                        <article key={item._id} style={styles.article}>
                            {item.img && (
                                <div style={styles.imageContainer}>
                                    <img
                                        src={getImageUrl(item.img)}
                                        alt={item.titel}
                                        style={styles.image}
                                        onError={(e) => e.target.style.display = 'none'}
                                    />
                                </div>
                            )}
                            <div style={styles.content}>
                                <div style={styles.date}>
                                    {parseDutchDate(item.datum).toLocaleDateString('nl-BE', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                                <h3 style={styles.heading}>{item.titel}</h3>
                                <p style={styles.description}>{item.beschrijving}</p>
                            </div>
                        </article>
                    ))}
                </div>
                <button
                    onClick={nextSlide}
                    style={{ ...styles.navButton, ...styles.nextButton }}
                    aria-label="Volgende nieuwsitems"
                >
                    <svg width="38" height="38" viewBox="0 0 24 24">
                        <path d="M9 6l6 6-6 6" stroke="#e2725b" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                    </svg>
                </button>
            </div>
        </section>
    );
}

export default NewsFeed; 