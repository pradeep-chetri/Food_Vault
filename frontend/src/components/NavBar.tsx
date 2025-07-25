import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white border-b border-gray-200 shadow-sm py-6 px-10 flex justify-center">
      <div className="w-1/3"></div>

      <div className="w-1/3 flex justify-center cursor-pointer">
        <h1 className="text-2xl font-bold text-gray-800">
          <Link to="/"><span className="bg-amber-500 text-white px-2 py-1 rounded-md mr-1">Food</span>
          <span className="text-lime-600">Vault</span></Link>
        </h1>
      </div>

      <div className="w-1/3 flex justify-end items-center gap-3">
        <Link to="/auth/login" className="text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition duration-200">
          Login
        </Link>
        <Link to="/auth/signup" className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200">
          Sign Up
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
