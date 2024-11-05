import Home from "./Components/Pages/Home";
import Reports from "./Components/Pages/Reports";
import Products from "./Components/Pages/Products";
import Navbar from "./Components/Nav/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfileDetails from "./Components/PDetails/ProfileDetails";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profileDetails" element={<ProfileDetails />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
