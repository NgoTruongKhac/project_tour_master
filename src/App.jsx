import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CommentAndReview from "./components/CommentAndReview.jsx";
import Carousel  from "./components/Carousel.jsx";
import BookTour from "./pages/BookTour.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/comment" element={<CommentAndReview />} />
          <Route path="/carousel" element={<Carousel />} />
          <Route path="/bookingPage/:id" element={<BookingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
          <Route path={"/bookTour"} element={<BookTour/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
