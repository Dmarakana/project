import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Sign from "./Components/Sign";
import Favorites from "./Components/Favorites";
import Recipe from "./Components/Recipe";
import Categories from "./Components/Categories";
import Profile from "./Components/Profile";
import Sendotp from "./Components/Sendotp";
import Otp from "./Components/Otp";
import CategoriesRecipe from "./Components/CategoriesRecipe";
import Forgetotpsend from "./Components/Forgetotpsend";
import Forgetotp from "./Components/Forgetotp";
import Newpassword from "./Components/Newpassword";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Sign />} />
          <Route path="/Forgetpassword" element={<Forgetotpsend />} />
          <Route path="/Forgetotp" element={<Forgetotp />} />
          <Route path="/Newpassword" element={<Newpassword />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Recipe" element={<Recipe />} />
          <Route path="/Recipe/:id" element={<Recipe />} />
          <Route path="/Recipes/:catagory" element={<CategoriesRecipe />} />
          <Route path="/Categories" element={<Categories />} />
          <Route path="/Favorites" element={<Favorites />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Sendotp" element={<Sendotp />} />
          <Route path="/Enterotp" element={<Otp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
