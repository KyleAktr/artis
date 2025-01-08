import Home from "./pages/Home";
import About from "./pages/About";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Annoncements from "./pages/Annoncements";
import UserAnnoncements from "./pages/UserAnnoncements";
import CreateAnnoncement from "./pages/CreateAnnoncement";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/annoncements" element={<Annoncements />} />
        <Route path="/user/:userId" element={<UserAnnoncements />} />
        <Route path="/create" element={<CreateAnnoncement />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
