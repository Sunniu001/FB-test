'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';

interface AuthGuardProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  fallbackHref?: string;
  fallbackLabel?: string;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  title = 'Login required',
  description = 'Please log in to continue.',
  fallbackHref = '/cart',
  fallbackLabel = 'Return to Cart',
}) => {
  const { user, setUser } = useAuthStore();
  const { openLoginModal } = useUIStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const syncSession = async () => {
      if (user) {
        setIsChecking(false);
        return;
      }

      try {
        const sessionRes = await fetch('/api/auth/session');
        const session = await sessionRes.json().catch(() => null);

        if (sessionRes.ok && session?.user && session?.wpToken) {
          setUser({
            id: session.wpId,
            email: session.user.email,
            firstName: session.wpFirstName,
            lastName: session.wpLastName,
            displayName: session.user.name,
            token: session.wpToken,
          });
        }
      } finally {
        setIsChecking(false);
      }
    };

    syncSession();
  }, [user, setUser]);

  if (isChecking) {
    return (
      <div style={{ minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Checking session...
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ maxWidth: '540px', width: '100%', border: '1px solid #e8e8e8', borderRadius: '8px', padding: '1.5rem' }}>
          <h2 style={{ marginTop: 0 }}>{title}</h2>
          <p style={{ color: '#555', marginBottom: '1rem' }}>{description}</p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={openLoginModal}
              style={{ background: '#111', color: '#fff', border: 'none', padding: '0.7rem 1rem', cursor: 'pointer' }}
            >
              Log In / Sign Up
            </button>
            <Link
              href={fallbackHref}
              style={{ border: '1px solid #ccc', padding: '0.65rem 1rem', color: '#111', textDecoration: 'none' }}
            >
              {fallbackLabel}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
