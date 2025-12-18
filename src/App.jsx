import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CommentAndReview from "./components/CommentAndReview.jsx";
import BookTour from "./pages/BookTour.jsx";
import  LoveTour from "./pages/LoveTour.jsx";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
