import Home from "./pages/Home/Home";
import Ajout from "./pages/Ajout/Ajout";
import Item from "./pages/Item/Item";
import Login from "./pages/Login/Login";
import Edit from "./pages/Edit/Edit";
import Profil from "./pages/Profil/Profil";
import Recipe from "./pages/Recipe/Recipes";
import SignUp from "./pages/SignUp/SignUp";
import Footer from "./components/Footer/Footer";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { RecipeProvider } from "./hooks/RecipeContext";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <RecipeProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Ajout" element={<Ajout />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/item" element={<Item />} />
            <Route path="/Edit" element={<Edit />} />
            <Route path="/Profil" element={<Profil />} />
            <Route path="/home" element={<Home />} />
            <Route path="/SignUP" element={<SignUp />} />
            <Route path="/recipe/:page" element={<Recipe />} />
            <Route path="*" element={<div>404 not found</div>} />
          </Routes>
          <Footer />
        </RecipeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
