import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/nav-bar/Navbar";
import Problems from "./pages/Problems";
import Contests from "./pages/Contests";
import UserProfile from "./pages/UserProfile";
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contests" element={<Contests />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/profiles" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
