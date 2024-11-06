import Home from "./pages/Home/Home";
import Ajout from "./pages/Ajout/Ajout";
import Item from "./pages/Item/Item";
import Login from "./pages/Login/Login";
import Edit from "./pages/Edit/Edit";
import Profil from "./pages/Profil/Profil";
import Recipe from "./pages/Recipe/Recipe";
import SignUp from "./pages/SignUp/SignUp";
import Footer from "./components/Footer/Footer";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
function App() {
  return (
    <>
      
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Ajout" element={<Ajout />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/item" element={<Item/>} />
          <Route path="/Edit" element={<Edit/>} />
          <Route path="/Profil" element={<Profil/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/SignUP" element={<SignUp/>} />
          <Route path="/Recipe" element={<Recipe/>} />
          <Route path="*" element={<div>404 not found</div>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}



export default App;
