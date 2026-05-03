'use client';

import React, { useState } from 'react';
import styles from './StoryAccordion.module.css';

interface AccordionItem {
  title: string;
  content: string;
}

const accordionData: AccordionItem[] = [
  {
    title: 'Customer Experience',
    content: 'Every design begins with listening. We approach each project with care and empathy, ensuring that every interaction—whether online or in conversation—feels personal, thoughtful, and reassuring.',
  },
  {
    title: 'Diverse Design',
    content: 'Our work draws from India’s rich artistic traditions—Pichwai, Mughal, Gond, temple architecture, and more—reimagined through a contemporary lens to create designs that feel layered, timeless, and culturally rooted.',
  },
  {
    title: 'Customisation',
    content: 'Every home carries its own story. Through close collaboration with our artists, your ideas and inspirations are transformed into bespoke designs that feel deeply personal and uniquely yours.',
  },
  {
    title: 'Comfort',
    content: 'True comfort lies in how a space makes you feel. Through gentle colours, thoughtful materials, and balanced compositions, we create pieces that bring warmth, calm, and a quiet sense of belonging.',
  },
  {
    title: 'Aesthetics with Soul',
    content: 'For us, beauty is more than appearance. Our designs are refined, intentional, and enduring—crafted to bring meaning, harmony, and timeless elegance into the spaces you call home.',
  },
];

export const StoryAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First one open by default

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.accordionContainer}>
      {accordionData.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className={styles.accordionItem}>
            <button
              className={`${styles.accordionHeader} ${isOpen ? styles.open : ''}`}
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
            >
              <span className={styles.title}>{item.title}</span>
              <span className={styles.icon}>{isOpen ? '−' : '+'}</span>
            </button>
            <div
              className={styles.accordionContentWrapper}
              style={{
                maxHeight: isOpen ? '500px' : '0',
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className={styles.accordionContent}>
                <p>{item.content}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
