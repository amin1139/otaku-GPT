import { useState } from "react";
import bgImg from "../assets/bgImg.png";

const Login = () => {
    const [login, setLogin] = useState(true)

    const toggleForm = () => {
        setLogin(!login)
    }
  return (
    <>
      <div className="relative min-h-screen w-full">
        {/* Background Image */}
        <img
          src={bgImg}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Main Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="backdrop-blur-md bg-black/10 border border-white/20 shadow-xl rounded-2xl p-10 text-white w-[90%] max-w-md">
            <h1 className="text-2xl font-bold mb-4">{login ? 'Login' : 'Sign up'}</h1>
            <form>

              {!login && <input
                type="text"
                required
                placeholder="Full Name"
                className="w-full mb-3 p-3 rounded bg-white/20 placeholder-white outline-none"
              />}

              <input
                type="email"
                required
                placeholder="Email"
                className="w-full mb-3 p-3 rounded bg-white/20 placeholder-white outline-none"
              />

              <input
                type="password"
                required
                placeholder="Password"
                className="w-full mb-4 p-3 rounded bg-white/20 placeholder-white outline-none"
              />

              <button className="w-full bg-white/20 hover:bg-white/30 p-3 rounded font-semibold">
                {login ? 'Login' : 'Sign up'}
              </button>
            </form>

            <div className="mt-4">
              <span>{login ? `If you don't have account ?` : `Already have an account ?`}</span>
              <button className="text-red-400 cursor-pointer hover:border-b-2 ml-1" onClick={toggleForm}>
                {login ? 'sign up' : 'login'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
