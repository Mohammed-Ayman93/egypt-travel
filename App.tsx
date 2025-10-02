import React from 'react';
import { HashRouter, Routes, Route, useParams, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import HomePage from './pages/HomePage';
import TripsPage from './pages/TripsPage';
import TripDetailsPage from './pages/TripDetailsPage';
import VendorProfilePage from './pages/VendorProfilePage';
import DestinationPage from './pages/DestinationPage';
import StorePage from './pages/StorePage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import VendorsListPage from './pages/VendorsListPage';
import DestinationsListPage from './pages/DestinationsListPage';
import { CartProvider } from './contexts/CartContext';
import CartPage from './pages/CartPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const TripDetailsWrapper = () => {
    const { id } = useParams<{ id: string }>();
    return id ? <TripDetailsPage tripId={id} /> : <div>Trip not found</div>;
}

const VendorProfileWrapper = () => {
    const { id } = useParams<{ id: string }>();
    return id ? <VendorProfilePage vendorId={id} /> : <div>Vendor not found</div>;
}

const DestinationWrapper = () => {
    const { id } = useParams<{ id: string }>();
    return id ? <DestinationPage destinationId={id} /> : <div>Destination not found</div>;
}

const App: React.FC = () => {
  return (
    <CartProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/trips" element={<TripsPage />} />
              <Route path="/trips/:id" element={<TripDetailsWrapper />} />
              <Route path="/vendors" element={<VendorsListPage />} />
              <Route path="/vendors/:id" element={<VendorProfileWrapper />} />
              <Route path="/destinations" element={<DestinationsListPage />} />
              <Route path="/destinations/:id" element={<DestinationWrapper />} />
              <Route path="/store" element={<StorePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/confirmation" element={<BookingConfirmationPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </CartProvider>
  );
};

export default App;
