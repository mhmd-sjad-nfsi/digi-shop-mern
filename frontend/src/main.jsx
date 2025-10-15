import '@fontsource/vazirmatn';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CssBaseline } from '@mui/material';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.js';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
    <CssBaseline/>
    <App />
      </ThemeProvider>
    </CacheProvider>
  </StrictMode>,
)
