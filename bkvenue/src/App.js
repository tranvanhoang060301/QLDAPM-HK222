import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/footer";

import Home from "./pages/home";
import Search from "./pages/search";
import FavoritePlaces from "./pages/favoritePlaces";
import Whatever from "./pages/whatever";
import Login from "./pages/login";
import Signup from "./pages/signup";
import "./App.css";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>} />
          {/* <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search/:slug" element={<Search />} />
          <Route path="/favoritePlaces" element={<FavoritePlaces />} />
          <Route path="/whatever" element={<Whatever />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
