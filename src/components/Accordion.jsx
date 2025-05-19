import React, { useState } from 'react';

export default function Accordion({ title, children, defaultOpen = false }) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div style={{ margin: '2.2rem 0', borderRadius: 12, boxShadow: open ? '0 2px 12px 0 rgba(44,62,80,0.08)' : 'none', background: open ? '#f8f8f8' : 'none', transition: 'box-shadow 0.2s, background 0.2s' }}>
            <button
                onClick={() => setOpen(o => !o)}
                style={{
                    width: '100%',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    fontSize: '1.18rem',
                    fontWeight: 700,
                    color: '#26913a',
                    fontFamily: 'Montserrat, sans-serif',
                    padding: '1.1rem 1.2rem',
                    cursor: 'pointer',
                    borderBottom: open ? '1.5px solid #e2725b' : '1.5px solid #e0e0e0',
                    borderRadius: 12,
                    transition: 'border 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
                aria-expanded={open}
                aria-controls={`accordion-content-${title}`}
            >
                {title}
                <span style={{
                    marginLeft: 12,
                    fontSize: '1.5rem',
                    color: '#e2725b',
                    transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                }}>▶</span>
            </button>
            {open && (
                <div id={`accordion-content-${title}`} style={{ padding: '1.2rem 1.5rem 1.5rem 1.5rem', animation: 'fadeIn 0.3s' }}>
                    {children}
                </div>
            )}
        </div>
    );
} 