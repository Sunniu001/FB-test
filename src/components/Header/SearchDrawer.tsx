'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './SearchDrawer.module.css';
import { Product } from '@/types/product';
import { fetchStoreApi } from '@/lib/api/client';
import Link from 'next/link';

interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchDrawer: React.FC<SearchDrawerProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'articles'>('products');
  const [articles, setArticles] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const performSearch = async () => {
      const trimmedQuery = query.trim();
      if (trimmedQuery.length < 2) {
        setResults([]);
        setArticles([]);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(trimmedQuery)}&type=${activeTab}`);
        if (res.ok) {
          const data = await res.json();
          if (activeTab === 'products') {
            setResults(data);
          } else {
            setArticles(data);
          }
        }
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(performSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [query, activeTab]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.searchBox}>
            <input
              ref={inputRef}
              type="text"
              placeholder="SEARCH"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={styles.input}
            />
            <button className={styles.closeBtn} onClick={onClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.content}>
          {!query && (
            <div className={styles.suggestionsSection}>
              <h4 className={styles.sectionTitle}>Suggestions</h4>
              <div className={styles.suggestionChips}>
                {['WALLPAPER', 'ARTISTIC', 'BOTANICAL', 'KIDS'].map((tag) => (
                  <button 
                    key={tag} 
                    className={styles.chip}
                    onClick={() => setQuery(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${activeTab === 'products' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('products')}
            >
              Products
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'articles' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('articles')}
            >
              Articles
            </button>
          </div>

          <div className={styles.resultsList}>
            {isLoading && <div className={styles.loading}>Searching...</div>}
            
            {!isLoading && activeTab === 'products' && results.length > 0 && results.map((product: any) => {
              const imageUrl = product.images?.[0]?.src || 
                              product.images?.[0]?.thumbnail || 
                              product.images?.[0]?.url ||
                              product.image?.src;

              return (
                <Link 
                  key={product.id} 
                  href={`/products/${product.slug}`} 
                  className={styles.resultItem}
                  onClick={onClose}
                >
                  <div className={styles.thumbWrapper}>
                    {imageUrl && (
                      <img src={imageUrl} alt={product.name} className={styles.thumb} />
                    )}
                  </div>
                  <div className={styles.resultInfo}>
                    <h5 className={styles.resultName}>{product.name}</h5>
                    <p className={styles.resultPrice}>
                      {product.price_html ? (
                        <span dangerouslySetInnerHTML={{ __html: product.price_html }} />
                      ) : (
                        `Rs.${product.price}`
                      )}
                    </p>
                  </div>
                </Link>
              );
            })}

            {!isLoading && activeTab === 'articles' && articles.length > 0 && articles.map((post: any) => (
              <Link 
                key={post.id} 
                href={`/blog/${post.slug}`} 
                className={styles.resultItem}
                onClick={onClose}
              >
                <div className={styles.thumbWrapper}>
                  {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                    <img 
                      src={post._embedded['wp:featuredmedia'][0].source_url} 
                      alt={post.title.rendered} 
                      className={styles.thumb} 
                    />
                  )}
                </div>
                <div className={styles.resultInfo}>
                  <h5 className={styles.resultName} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                  <p className={styles.resultMeta}>Blog Post</p>
                </div>
              </Link>
            ))}

            {!isLoading && query.trim().length >= 2 && 
             ((activeTab === 'products' && results.length === 0) || 
              (activeTab === 'articles' && articles.length === 0)) && (
              <p className={styles.noResults}>No {activeTab} found.</p>
            )}
          </div>
        </div>

        <div className={styles.footer}>
          <Link 
            href={activeTab === 'products' ? `/search?q=${query}` : `/blog?search=${query}`} 
            className={styles.viewAllBtn}
            onClick={onClose}
          >
            VIEW ALL RESULTS
          </Link>
        </div>
      </div>
    </div>
  );
};
