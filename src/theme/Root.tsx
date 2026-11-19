import React from 'react';
import { MotionConfig } from 'motion/react';
import { BookProvider } from '@site/src/context/BookContext';
import { SearchModal } from '@site/src/components/SearchModal';
import { MobileBookNavigation } from '@site/src/components/MobileBookNavigation';

export default function Root({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <MotionConfig reducedMotion="user">
      <BookProvider>
        {children}
        <SearchModal />
        <MobileBookNavigation />
      </BookProvider>
    </MotionConfig>
  );
}
