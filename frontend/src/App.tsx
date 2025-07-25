
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/forgotpassword/ForgotPassword';
import OTPAuth from './pages/forgotpassword/OTPAuth';
import ResetPassword from './pages/forgotpassword/ResetPassword';
import ResetSuccess from './pages/forgotpassword/Success';
import Dashboard from './pages/Dashboard';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/forgotpassword/otpauth" element={<OTPAuth />} />
        <Route path="/forgotpassword/resetpassword" element={<ResetPassword/>}/>
        <Route path="/forgotpassword/success" element={<ResetSuccess/>}/>
      </Routes>
    </>
  )
}

export default App
