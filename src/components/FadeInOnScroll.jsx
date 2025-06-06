import React, { useRef, useEffect, useState } from 'react';

// FadeInOnScroll.jsx - Animation utility for fade-in effects on scroll
// Wraps children and animates them into view when scrolled into viewport.
//
// Author: KobeBerckmans

const FadeInOnScroll = ({ children, delay = 0, direction = 'right' }) => {
    const ref = useRef();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new window.IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.7 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    let initialTransform = '';
    if (direction === 'right') initialTransform = 'translateX(80px)';
    else if (direction === 'left') initialTransform = 'translateX(-80px)';
    else if (direction === 'up') initialTransform = 'translateY(80px)';
    else if (direction === 'down') initialTransform = 'translateY(-80px)';
    else initialTransform = 'translateX(0)';

    return (
        <div
            ref={ref}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0) translateY(0)' : initialTransform,
                transition: `opacity 0.7s cubic-bezier(.4,1.7,.7,1.01) ${delay}ms, transform 0.7s cubic-bezier(.4,1.7,.7,1.01) ${delay}ms`,
                willChange: 'opacity, transform',
            }}
        >
            {children}
        </div>
    );
};

/**
 * FadeInOnScroll component
 * Animates children into view on scroll
 */

export default FadeInOnScroll; 