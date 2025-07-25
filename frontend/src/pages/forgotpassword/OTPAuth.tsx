import { Link, useNavigate } from 'react-router-dom';
import  EmailOTPInput  from '../../components/EmailOTPInput'


export default function OTPAuth() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-black bg-white">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-md rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center mb-6">
          Enter{" "}
          <span className="text-lime-600">
            <span className="bg-amber-500 text-white px-2 py-1 rounded">
              The
            </span>{" "}
            Code
          </span>
        </h2>

        <div className="flex gap-2 justify-center">
          <EmailOTPInput
            length={6}
            onComplete={(otpCode:string) => {
              console.log("Otp entered:", otpCode)
              navigate("/forgotpassword/resetpassword")
            }}
          />
        </div>

        <p className="mt-6 text-sm text-center text-gray-500">
          Remembered your password?{" "}
          <Link to="/login" className="text-lime-600 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
