'use client';

import { useEffect } from 'react';

export function HeaderScrollHelper() {
  let handleScroll = (e: Event) => {
    if (window.scrollY > 20) {
      document.querySelector('#main-header')?.classList.add('bg-night');
    } else {
      document.querySelector('#main-header')?.classList.remove('bg-night');
    }
  };

  useEffect(() => {
    window.document.addEventListener('scroll', handleScroll);
    return () => {
      window.document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
}
