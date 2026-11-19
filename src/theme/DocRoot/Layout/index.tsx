import React from 'react';
import { ReadingLayout } from '@site/src/components/ReadingLayout';

export default function DocRootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return <ReadingLayout>{children}</ReadingLayout>;
}
