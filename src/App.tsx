import { lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Router from '@/routes';
import ContextWrapper from '@/components/contextWrapper';
import ThemeProvider from './theme';
import GetUserData from './components/getUserData/getUserData';
const BaseUrl = lazy(() => import('@/components/baseUrl/BaseUrl'));
const ScrollToTop = lazy(() => import('@/components/scroll-to-top'));
const TokenSetter = lazy(() => import('@/components/tokenSetter/TokenSetter'));
const ReactQueryConfig = lazy(() => import('./ReactQueryConfig'));

export default function App() {
  return (
    <HelmetProvider>
      <ContextWrapper>
        <BrowserRouter>
          <ReactQueryConfig>
            <ThemeProvider>
              <GetUserData />
              <TokenSetter />
              <BaseUrl />
              <ScrollToTop />
              <Router />
            </ThemeProvider>
          </ReactQueryConfig>
        </BrowserRouter>
      </ContextWrapper>
    </HelmetProvider>
  );
}