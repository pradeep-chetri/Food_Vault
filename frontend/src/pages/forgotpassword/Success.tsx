import { useNavigate } from "react-router-dom";


export default function ResetSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-black bg-white">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-md rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center mb-6">
          Successfully{" "}
          <span className="text-lime-600">
            <span className="bg-amber-500 text-white px-2 py-1 rounded">
              Reset
            </span>{" "}
          </span>
        </h2>
        <div className="text-gray-600 text-center pb-6">
          <p>We have sucessfully reset your password

          </p>
        </div>
        <button
          onClick={()=>{navigate("/auth/login")}}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 
            rounded-full transition duration-300"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
