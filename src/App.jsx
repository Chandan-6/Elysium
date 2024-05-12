import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Home/LandingPage";
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";
import Dashboard from "./pages/dashboard/Dashboard";


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path={"login"} element={<Login />} />
          <Route path={"signup"} element={<Signup />} />
          <Route path={"dashboard"} element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
