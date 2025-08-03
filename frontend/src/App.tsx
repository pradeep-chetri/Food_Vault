import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword";
import OTPAuth from "./pages/forgotpassword/OTPAuth";
import ResetPassword from "./pages/forgotpassword/ResetPassword";
import ResetSuccess from "./pages/forgotpassword/Success";
import Bookmarks from "./pages/Bookmarks";
import UserRecipes from "./pages/UserRecipes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bookmarks" element={<Bookmarks />} />
      <Route path="/me/recipes" element={<UserRecipes />} />

      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/forgotpassword">
        <Route index element={<ForgotPassword />} />
        <Route path="otpauth" element={<OTPAuth />} />
        <Route path="resetpassword" element={<ResetPassword />} />
        <Route path="success" element={<ResetSuccess />} />
      </Route>
    </Routes>
  );
}

export default App;
