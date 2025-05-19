import React from 'react';

function Footer() {
    const isMobile = window.innerWidth <= 600;
    const styles = {
        footer: {
            background: '#181c24',
            color: '#000',
            padding: isMobile ? '1rem 0 0.5rem 0' : '2rem 0 1rem 0',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 400,
            fontSize: isMobile ? '0.85rem' : '1.08rem',
            position: 'relative',
        },
        content: {
            maxWidth: 540,
            textAlign: 'center',
            margin: '0 auto',
        },
        logo: {
            fontFamily: 'CocogooseProTrial',
            fontWeight: 800,
            fontSize: isMobile ? '1.1rem' : '1.7rem',
            color: '#b6eec0',
            marginBottom: '0.7rem',
            letterSpacing: 1,
        },
        desc: {
            color: '#f8f8f8',
            fontSize: isMobile ? '0.85rem' : '1.02rem',
            marginBottom: '1rem',
            lineHeight: 1.45,
        },
        contact: {
            color: '#b6eec0',
            fontWeight: 600,
            fontSize: isMobile ? '0.85rem' : '1.02rem',
            marginBottom: '0.1rem',
        },
        phone: {
            color: '#f8f8f8',
            fontWeight: 500,
            fontSize: isMobile ? '0.85rem' : '1.02rem',
            marginBottom: '1.1rem',
        },
        fbFloating: {
            position: 'absolute',
            right: 24,
            bottom: 18,
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: '#1877f3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 10px 0 rgba(24,119,243,0.13)',
            transition: 'background 0.2s, transform 0.2s',
            zIndex: 10,
        },
        fbIcon: {
            width: 24,
            height: 24,
            fill: '#fff',
            display: 'block',
        },
        copyright: {
            color: '#b6eec0',
            fontSize: isMobile ? '0.7rem' : '0.95rem',
            textAlign: 'center',
            marginTop: '1.1rem',
            opacity: 0.7,
        }
    };
    return (
        <footer style={styles.footer}>
            <div style={styles.content}>
                <div style={styles.logo}>Buren voor Buren Tienen</div>
                <div style={styles.desc}>
                    Buren voor Buren Tienen is een warm netwerk van vrijwilligers die elkaar helpen in de buurt. Samen zorgen we voor meer verbondenheid, solidariteit en een helpende hand waar nodig.
                </div>
                <div style={styles.contact}>Contact</div>
                <div style={styles.phone}>0468 110648</div>
            </div>
            <a href="https://www.facebook.com/burenvoorburentienen" target="_blank" rel="noopener noreferrer" style={styles.fbFloating} aria-label="Facebook">
                <svg style={styles.fbIcon} viewBox="0 0 32 32"><path d="M29 16C29 8.82 23.18 3 16 3S3 8.82 3 16c0 6.29 4.61 11.48 10.63 12.77v-9.04h-3.2v-3.73h3.2v-2.85c0-3.16 1.87-4.9 4.74-4.9 1.37 0 2.8.24 2.8.24v3.08h-1.58c-1.56 0-2.05.97-2.05 1.96v2.47h3.49l-.56 3.73h-2.93v9.04C24.39 27.48 29 22.29 29 16Z" /></svg>
            </a>
            <div style={styles.copyright}>
                &copy; {new Date().getFullYear()} Buren voor Buren Tienen
            </div>
        </footer>
    );
}

export default Footer; 