import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from 'Context/AuthContext';
import CurrentPageContext, { CurrentPageContextWrapper } from 'Context/CurrentPageContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StoreContextProvider } from 'Context/StoreContext';
import 'swiper/swiper-bundle.css';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const client = new QueryClient()

root.render(
  <QueryClientProvider client={client}>
    <StoreContextProvider>
    <CurrentPageContextWrapper>
      <AuthContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthContextProvider>
    </CurrentPageContextWrapper>
    </StoreContextProvider>
  </QueryClientProvider>
);


