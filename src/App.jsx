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

function App() {
  return (
    <BrowserRouter>
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
            <Route path="/payment" element={<PaymentPage/>}></Route>
            <Route path="/booking/:id" element={<TourBookingPage/>}></Route>
            <Route path="/my-booking" element={<BookingHistoryPage/>}></Route>
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
