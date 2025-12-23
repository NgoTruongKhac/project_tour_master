import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import CommentAndReview from "./components/CommentAndReview.jsx";
import Footer from "./components/Footer";
import FilterTourPage from "./pages/FilterTourPage";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/filter" element={<FilterTourPage />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
