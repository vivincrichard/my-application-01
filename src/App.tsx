import Home from "./Components/Pages/Home";
import Products from "./Components/Pages/Products";
import Navbar from "./Components/Nav/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ProfileDetails from "./Components/PDetails/ProfileDetails";
import HospitalIndex from "./Components/Hospitals/Index";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userDetails" element={<ProfileDetails />} />
        <Route path="/hospitals" element={<HospitalIndex />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
