import React from 'react';
import DocItemContent from '@theme/DocItem/Content';

export default function DocItemLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="w-full min-w-0">
      <DocItemContent>{children}</DocItemContent>
    </div>
  );
}
