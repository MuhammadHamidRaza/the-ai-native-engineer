import React, { useEffect, useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle({ className = '' }: { className?: string }): React.ReactElement {
  const { colorMode, setColorMode } = useColorMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Synchronize Tailwind .dark class on <html> with Docusaurus data-theme
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const isDark = colorMode === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
  }, [colorMode]);

  const isDark = mounted ? colorMode === 'dark' : true;

  const handleToggle = () => {
    setColorMode(isDark ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:border-[var(--border-strong)] transition-colors duration-150 cursor-pointer shrink-0 ${className}`}
    >
      {isDark ? <Sun className="w-4 h-4" aria-hidden="true" /> : <Moon className="w-4 h-4" aria-hidden="true" />}
    </button>
  );
}
