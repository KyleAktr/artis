import Home from "./pages/Home";
import About from "./pages/About";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Annoncements from "./pages/Annoncements";
import UserAnnoncements from "./pages/UserAnnoncements";
import CreateAnnoncement from "./pages/CreateAnnoncement";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Private from "./pages/private/Private";
import PrivateHome from "./pages/private/privateHome/PrivateHome";
import UserProfil from "./pages/private/privateHome/UserProfil";
import UserForm from "./pages/private/privateHome/UserForm";

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
        <Route path="/private" element={<Private />}>
          <Route path="/private/private-home" element={<PrivateHome />} />
          <Route path="/private/private-user-profil" element={<UserProfil />} />
          <Route
            path="/private/private-user-profil-form"
            element={<UserForm />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
