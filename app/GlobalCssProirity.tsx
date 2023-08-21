"use client"
import * as React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import { PropsWithChildren } from 'react';

export default function GlobalCssPriority({ children }: PropsWithChildren) {
  return (
    <StyledEngineProvider injectFirst>
      {children}
    </StyledEngineProvider>
  );
}
