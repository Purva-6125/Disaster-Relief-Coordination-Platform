import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
// import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      
      <Routes>

        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
        

      </Routes>
    </Router>
  );
}

export default App;
