import { AuthContextProvider } from 'Context/AuthContext';
import { CartContextProvider } from 'Context/CartContext';
import { CurrentPageContextWrapper } from 'Context/CurrentPageContext';
import { StoreContextProvider } from 'Context/StoreContext';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import 'swiper/swiper-bundle.css';
import App from './App';
import './index.css';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const client = new QueryClient()

root.render(
  <QueryClientProvider client={client}>
    <CartContextProvider>
      <StoreContextProvider>
        <CurrentPageContextWrapper>
          <AuthContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </AuthContextProvider>
        </CurrentPageContextWrapper>
      </StoreContextProvider>
    </CartContextProvider>
  </QueryClientProvider>
);


