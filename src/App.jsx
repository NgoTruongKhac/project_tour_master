import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import FilterTourPage from "./pages/FilterTourPage";
import LoveTour from "./pages/LoveTour.jsx";
import Header from "./components/Header.jsx";
import TourBookingPage from "./pages/TourBookingPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import BookingHistoryPage from "./pages/BookingHistoryPage.jsx";
import TourDetail from "./pages/TourDetail.jsx";
import InboxPage from "./pages/InboxPage";
import HelpPage from "./pages/HelpPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ContactPage from "./pages/ContactPage";
import ScrollToTop from "./components/ScrollToTop.jsx";
import PromotionPage from "./pages/PromotionPage";
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/filter" element={<FilterTourPage />} />
            <Route path="/tour/:tourId" element={<TourDetail />} />
            <Route path="/love" element={<LoveTour />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/booking/:id" element={<TourBookingPage />} />
            <Route path="/my-booking" element={<BookingHistoryPage />} />
            <Route path="/inbox" element={<InboxPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/promotion" element={<PromotionPage />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
