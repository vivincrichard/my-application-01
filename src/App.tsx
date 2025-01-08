import Home from "./Components/Pages/Home";
import Products from "./Components/Pages/Products";
import Navbar from "./Components/Nav/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ProfileDetails from "./Components/PDetails/ProfileDetails";
import HospitalIndex from "./Components/Hospitals/Index";
import Doctors from "./Components/Doctors/Index";
import DoctorDetails from "./Components/Doctors/DoctorDetails";
import Staff from "./Components/Staff/Index";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userDetails" element={<ProfileDetails />} />
        <Route path="/hospitals" element={<HospitalIndex />} />
        <Route path="/products" element={<Products />} />
        <Route path="/doctors" element={<Doctors/>} />
        <Route path="doctor/:id" element={<DoctorDetails/>}/>
        <Route path="/staff" element={<Staff/>}/>
      </Routes>
    </Router>
  );
}

export default App;
