import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import FilterTourPage from "./pages/FilterTourPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/filter" element={<FilterTourPage />} />
      </Routes>
    </div>
  );
}

export default App;
