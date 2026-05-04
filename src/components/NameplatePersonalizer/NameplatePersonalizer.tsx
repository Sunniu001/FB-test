import React, { useState } from 'react';
import styles from './NameplatePersonalizer.module.css';

export interface NameplateData {
  name: string;
  font: string;
}

interface NameplatePersonalizerProps {
  productImage: string;
  nameplateMeta?: {
    box: { x: number; y: number; w: number; h: number };
    bg: string;
    textColor: 'dark' | 'light';
  };
  data: NameplateData;
  onChange: (data: NameplateData) => void;
}

const FONTS = [
  { label: 'Apricot', value: "'Dancing Script', cursive" },
  { label: 'Dreambig', value: "'Pacifico', cursive" },
  { label: 'Vintage Lander', value: "'Playball', cursive" },
  { label: 'Ballerina', value: "'Alex Brush', cursive" },
  { label: 'Sweet Chocolate', value: "'Caveat', cursive" },
  { label: 'Hello', value: "'Satisfy', cursive" },
  { label: 'Riviera', value: "'Sacramento', cursive" },
  { label: 'Signatra', value: "'Yellowtail', cursive" },
];

export const NameplatePersonalizer: React.FC<NameplatePersonalizerProps> = ({
  productImage,
  nameplateMeta,
  data,
  onChange,
}) => {
  const [naturalDims, setNaturalDims] = useState<{ w: number; h: number } | null>(null);

  const [isZoomed, setIsZoomed] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value.slice(0, 20); // enforce max 20 chars
    onChange({ ...data, name: newName });
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...data, font: e.target.value });
  };

  const displayName = data.name.trim() || 'Your Name';

  const renderMockup = (isLarge = false) => {
    const baseFontSize = isLarge ? 6.5 : 3.5;
    const sizeMultiplier = isLarge ? 0.25 : 0.16;

    return (
      <div className={`${styles.mockupContainer} ${isLarge ? styles.zoomedContainer : ''}`}>
        <img 
          src={productImage} 
          alt="Nameplate Preview" 
          className={styles.mockupImage} 
          onLoad={(e) => {
            if (!isLarge) {
              setNaturalDims({ 
                w: e.currentTarget.naturalWidth, 
                h: e.currentTarget.naturalHeight 
              });
            }
          }}
        />
        <div 
          className={styles.mockupTextOverlay} 
          style={{ 
            fontFamily: data.font,
            // Dynamic font size: slightly bigger now
            fontSize: `${Math.max(1.2, baseFontSize - (data.name.length > 10 ? (data.name.length - 10) * sizeMultiplier : 0))}rem`,
            // If we have meta coordinates and the image has loaded, position absolutely based on percentages.
            ...(nameplateMeta && naturalDims ? {
              top: `${(nameplateMeta.box.y / naturalDims.h) * 100}%`,
              left: `${(nameplateMeta.box.x / naturalDims.w) * 100}%`,
              width: `${(nameplateMeta.box.w / naturalDims.w) * 100}%`,
              height: `${(nameplateMeta.box.h / naturalDims.h) * 100}%`,
              color: nameplateMeta.textColor === 'light' ? '#ffffff' : '#1a1a1a',
              textShadow: nameplateMeta.textColor === 'light' 
                ? '1px 1px 0 #ccc, 2px 2px 0 #bbb, 3px 3px 4px rgba(0,0,0,0.3)'
                : '1px 1px 0 #555, 2px 2px 0 #444, 3px 3px 4px rgba(0,0,0,0.4)',
              transform: 'none', // Reset default perspective if we have real coordinates
            } : {})
          }}
        >
          {displayName}
        </div>
        {!isLarge && (
          <button className={styles.zoomButton} onClick={() => setIsZoomed(true)} title="Zoom Preview">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
          </button>
        )}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Personalize Your Nameplate</h2>
      
      <div className={styles.controlsRow}>
        <div className={styles.controlGroup}>
          <div className={styles.labelRow}>
            <span className={styles.label}>Enter Name</span>
            <span className={styles.charCount}>({data.name.length}/20)</span>
          </div>
          <input 
            type="text" 
            className={styles.input} 
            placeholder="Type name here..." 
            value={data.name} 
            onChange={handleNameChange}
            maxLength={20}
          />
        </div>

        <div className={styles.controlGroup}>
          <div className={styles.labelRow}>
            <span className={styles.label}>Choose Font</span>
          </div>
          <select 
            className={styles.select} 
            value={data.font} 
            onChange={handleFontChange}
          >
            {FONTS.map(font => (
              <option key={font.label} value={font.value}>{font.label}</option>
            ))}
          </select>
        </div>
      </div>

      {renderMockup()}

      {isZoomed && (
        <div className={styles.modalOverlay} onClick={() => setIsZoomed(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeModal} onClick={() => setIsZoomed(false)}>&times;</button>
            {renderMockup(true)}
          </div>
        </div>
      )}

      <p className={styles.disclaimer}>Preview is approximate. Final result may vary.</p>
    </div>
  );
};
