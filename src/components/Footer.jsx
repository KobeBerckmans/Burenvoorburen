import React from 'react';

function Footer() {
    const styles = {
        footer: {
            background: '#000',
            color: '#c6f7c6',
            padding: '3rem 0 2rem 0',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '8vw',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 400,
            fontSize: '0.95rem',
            flexWrap: 'wrap'
        },
        col: {
            minWidth: 220,
            maxWidth: 340,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '1.1rem',
        },
        title: {
            color: '#c6f7c6',
            fontWeight: 700,
            fontSize: '1.3rem',
            marginBottom: '0.7rem',
            fontFamily: 'CocogooseProTrial',
        },
        subtitle: {
            color: '#c6f7c6',
            fontWeight: 700,
            fontSize: '1.1rem',
            marginBottom: '0.7rem',
            fontFamily: 'CocogooseProTrial',
            textAlign: 'center',
            width: '100%'
        },
        icons: {
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center',
            marginTop: '0.5rem',
        },
        icon: {
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s',
        },
        iconSvg: {
            width: 40,
            height: 40,
            fill: '#fff',
            display: 'block',
            transition: 'fill 0.2s',
        },
        contactRow: {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '1.3rem',
        },
        contactIcon: {
            width: 28,
            height: 28,
            fill: '#c6f7c6',
        },
        small: {
            fontSize: '1.1rem',
            color: '#c6f7c6',
            marginTop: '1.5rem',
            opacity: 0.7
        }
    };
    return (
        <footer style={styles.footer}>
            {/* Kolom 1 */}
            <div style={styles.col}>
                <div style={styles.title}>Buren voor Buren Tienen</div>
                <div>
                    Buren voor Buren Tienen is een warm netwerk van vrijwilligers die elkaar helpen in de buurt. Samen zorgen we voor meer verbondenheid, solidariteit en een helpende hand waar nodig.
                </div>
            </div>
            {/* Kolom 2 */}
            <div style={{ ...styles.col, alignItems: 'center' }}>
                <div style={styles.subtitle}>Volg ons op<br />sociale media!</div>
                <div style={styles.icons}>
                    {/* Facebook */}
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.icon} aria-label="Facebook">
                        <svg style={styles.iconSvg} viewBox="0 0 32 32"><path d="M29 16C29 8.82 23.18 3 16 3S3 8.82 3 16c0 6.29 4.61 11.48 10.63 12.77v-9.04h-3.2v-3.73h3.2v-2.85c0-3.16 1.87-4.9 4.74-4.9 1.37 0 2.8.24 2.8.24v3.08h-1.58c-1.56 0-2.05.97-2.05 1.96v2.47h3.49l-.56 3.73h-2.93v9.04C24.39 27.48 29 22.29 29 16Z" /></svg>
                    </a>
                    {/* LinkedIn */}
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={styles.icon} aria-label="LinkedIn">
                        <svg style={styles.iconSvg} viewBox="0 0 32 32"><path d="M27 4H5C4.45 4 4 4.45 4 5v22c0 .55.45 1 1 1h22c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1ZM12.34 24.13H8.67V13.33h3.67v10.8ZM10.5 11.92c-1.18 0-2.13-.96-2.13-2.13 0-1.18.96-2.13 2.13-2.13 1.18 0 2.13.96 2.13 2.13 0 1.18-.95 2.13-2.13 2.13Zm13.5 12.21h-3.67v-5.24c0-1.25-.02-2.86-1.75-2.86-1.75 0-2.02 1.36-2.02 2.76v5.34h-3.67V13.33h3.52v1.47h.05c.49-.93 1.68-1.91 3.46-1.91 3.7 0 4.38 2.44 4.38 5.62v5.62Z" /></svg>
                    </a>
                </div>
            </div>
            {/* Kolom 3 */}
            <div style={styles.col}>
                <div style={styles.title}>Contact</div>
                <div style={styles.contactRow}>
                    <svg style={styles.contactIcon} viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z" /></svg>
                    0468 110648
                </div>


            </div>
        </footer >
    );
}

export default Footer; 