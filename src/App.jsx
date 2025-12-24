import {BrowserRouter, Routes, Route} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import CommentAndReview from "./components/CommentAndReview.jsx";
import Footer from "./components/Footer";
import PaymentPage from "./pages/PaymentPage.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import BookingHistoryPage from "./pages/BookingHistoryPage.jsx";
import LoveTour from "./pages/LoveTour.jsx";
function App() {
    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen">
                <div className="flex-grow">
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/signup" element={<SignupPage/>}/>
                        <Route path="/payment" element={<PaymentPage/>}/>
                        <Route path="/loveTour" element={<LoveTour/>}/>
                        <Route path="/booking/:id" element={<BookingPage/>}/>
                        <Route path="/history" element={<BookingHistoryPage/>}/>
                    </Routes>
                </div>

                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;
