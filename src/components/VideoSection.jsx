import React from 'react';
import videoFile from '../assets/video/SAMANA_S02_E07_VERHAAL MET EEN LIED (1).mp4';

function VideoSection() {
    const styles = {
        section: {
            width: '100%',
            maxWidth: '1200px',
            margin: '4rem auto',
            padding: '0 1.5rem',
            position: 'relative'
        },
        title: {
            color: '#e2725b',
            fontWeight: 700,
            fontSize: '1.8rem',
            marginBottom: '2rem',
            fontFamily: 'CocogooseProTrial',
            textAlign: 'center',
            padding: '0 1rem',
            maxWidth: '100%'
        },
        videoContainer: {
            width: '100%',
            maxWidth: '900px',
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