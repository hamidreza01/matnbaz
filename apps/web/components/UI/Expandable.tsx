import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from './Button/Button';

export interface ExpandableProps {
  children: React.ReactNode;
  // In pixels
  maxHeight?: number;
}

export const Expandable = ({ children, maxHeight = 2400 }: ExpandableProps) => {
  const expandableRef = useRef(null);
  const [open, setOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (expandableRef?.current?.clientHeight > maxHeight) setOpen(false);
    // This needs to be re-run if the route changes too
    // To ensure that the expandable state is based on the current ref and not the old ref
  }, [expandableRef, router.asPath]);

  return (
    <div
      ref={expandableRef}
      className="relative overflow-hidden"
      style={{ maxHeight: !open && maxHeight }}
    >
      {children}
      {!open && (
        <>
          <div
            className="absolute w-full bottom-0 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900 pointer-events-none"
            style={{ height: `${Math.floor(maxHeight / 4)}px` }}
          />
          <Button.Ghost
            className="absolute bottom-5 left-1/2 -translate-x-1/2"
            onClick={() => {
              setOpen((previousOpen) => !previousOpen);
            }}
          >
            بیشتر نشان دادن
          </Button.Ghost>
        </>
      )}
    </div>
  );
};
