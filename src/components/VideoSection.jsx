import React from 'react';
import videoFile from '../assets/video/SAMANA_S02_E07_VERHAAL MET EEN LIED (1).mp4';

function VideoSection() {
    const isMobile = window.innerWidth <= 600;
    const isTablet = window.innerWidth > 600 && window.innerWidth <= 1024;
    const styles = {
        section: {
            width: '100%',
            maxWidth: isMobile ? 340 : isTablet ? 540 : '1200px',
            margin: isMobile ? '2.5rem auto' : isTablet ? '2.5rem auto' : '4rem auto',
            padding: isMobile ? '0 0.5rem' : isTablet ? '0 0.5rem' : '0 1.5rem',
            position: 'relative'
        },
        title: {
            color: '#e2725b',
            fontWeight: 700,
            fontSize: isMobile ? '1.1rem' : isTablet ? '1rem' : '1.8rem',
            marginBottom: isMobile ? '0.7rem' : isTablet ? '1.1rem' : '2rem',
            fontFamily: 'CocogooseProTrial',
            textAlign: 'center',
            padding: isMobile ? '0 0.2rem' : isTablet ? '0 0.2rem' : '0 1rem',
            maxWidth: isMobile ? 320 : isTablet ? 1200 : '100%',
            marginLeft: isTablet ? 'auto' : undefined,
            marginRight: isTablet ? 'auto' : undefined,
        },
        videoContainer: {
            width: '100%',
            maxWidth: isMobile ? 320 : isTablet ? 480 : '900px',
            margin: '0 auto',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 4px 18px 0 rgba(44,62,80,0.10)'
        },
        video: {
            width: '100%',
            height: 'auto',
            display: 'block'
        }
    };

    return (
        <section style={styles.section}>
            <h2 style={styles.title}>Maak samen met Axl Peleman kennis met Buren voor Buren Tienen</h2>
            <div style={styles.videoContainer}>
                <video
                    style={styles.video}
                    controls
                    playsInline
                    poster="/assets/images/BVB-Transparant.png"
                >
                    <source src={videoFile} type="video/mp4" />
                    Je browser ondersteunt geen video afspelen.
                </video>
            </div>
        </section>
    );
}

export default VideoSection; 