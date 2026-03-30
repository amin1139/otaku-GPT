import { Activity, useRef, useState } from "react";
import bgImg from "../assets/bgImg.png";
import { isFormValid } from "../utils/formValidation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
    const [login, setLogin] = useState(true)
    const [formValidMsg, setFormValidMsg] = useState(null)
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const email = useRef(null)
    const password = useRef(null)
    const name = useRef(null)

    const togglePassword = () => {
      setShowPassword((prev) => !prev);
    };

    const toggleForm = () => {
      setLogin(!login)
    }

    const handleFormBtn = ()=>{
      const isValid = isFormValid(email.current.value, password.current.value)
      setFormValidMsg(isValid)
      if (isValid !== null) return

      if (login === false) {
        setLoading(true);
        console.log(password.current.value);
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
            const user = userCredential.user;

            return updateProfile(user, {
              displayName: name.current.value,
              photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb6vvTd36B7naiDcbKX0TcTqwu8ViekFPkjA&s"
            })
          })
          .then(() => {
            const user = auth.currentUser
            dispatch(addUser({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL
            }))
            console.log(user);
            
            setLoading(false);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            setFormValidMsg(errorMessage)
            setLoading(false);
          });
      }

      if (login) {
        setLoading(true);
        console.log("logIn");
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
            const user = userCredential.user;
             console.log(user);
             setLoading(false);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            setFormValidMsg(errorMessage)
            setLoading(false);
          });
      }
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
            <h1 className="text-2xl font-bold mb-4">
              {login ? "Login" : "Sign up"}
            </h1>

            <form onSubmit={(e) => e.preventDefault()}>
              <Activity mode={login ? "hidden" : "visible"}>
                <div className="mb-3">
                  <label htmlFor="name" className="block text-sm mb-1">
                    Full Name
                  </label>
                  <input
                    ref={name}
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full p-3 rounded bg-white/20 outline-none focus:border-2"
                  />
                </div>
              </Activity>

              <div className="mb-3">
                <label htmlFor="email" className="block text-sm mb-1">
                  Email
                </label>
                <input
                  ref={email}
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 rounded bg-white/20  outline-none focus:border-2"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm mb-1">
                  Password
                </label>
                <div className="relative w-full">
                  <input
                    ref={password}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full p-3 pr-11 rounded bg-white/20 outline-none focus:border-2"
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <p className="text-red-600 font-semibold mb-2">{formValidMsg}</p>

              <button
                onClick={handleFormBtn}
                disabled={loading}
                className="w-full bg-red-400 hover:bg-white/30 p-3 rounded font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              >
                {loading && (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                )}
                {login ? "Login" : "Sign up"}
              </button>
            </form>

            <div className="mt-4">
              <span>
                {login
                  ? `If you don't have account ?`
                  : `Already have an account ?`}
              </span>
              <button
                className="text-red-400 cursor-pointer border-transparent border-b-2 hover:border-b-2 hover:border-b-red-400   ml-1"
                onClick={toggleForm}
              >
                {login ? "sign up" : "login"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
