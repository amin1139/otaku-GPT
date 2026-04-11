import { useState } from "react";
import { USER_AVTARS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";

const ManageAccount = ({ onClose }) => {
  const [userName, setUserName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(USER_AVTARS[0]);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    if (!userName.trim()) return;
    setLoading(true);
    updateProfile(auth.currentUser, {
      displayName: userName,
      photoURL: selectedAvatar,
    })
      .then(() => {
        dispatch(
          addUser({
            uid: auth.currentUser.uid,
            email: auth.currentUser.email,
            displayName: userName,
            photoURL: selectedAvatar,
          }),
        );
        setLoading(false);
        setSaved(true);
        setTimeout(() => {
          setSaved(false);
          onClose();
        }, 1500);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <>
      <style>{`
        @keyframes modal-in {
            from { opacity: 0; transform: translateY(24px) scale(0.97); }
            to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        .animate-modal-in {
            animation: modal-in 0.22s cubic-bezier(0.32, 0.72, 0, 1);
        }
        .modal-body::-webkit-scrollbar {
            display: none;
        }
        `}</style>
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 ">
        <div className="w-full max-w-md">
          {/* ── Card ── */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* header band */}
            <div className="h-1.5 w-full bg-linear-to-r from-indigo-500 via-violet-500 to-fuchsia-500" />

            <div className="px-6 py-7 flex flex-col gap-8">
              {/* ── Current avatar preview ── */}
              <div className="flex flex-col items-center gap-2">
                <div className="relative">
                  <img
                    src={selectedAvatar}
                    alt="Current avatar"
                    className="w-20 h-20 rounded-full ring-2 ring-indigo-500 ring-offset-2 ring-offset-zinc-900 bg-zinc-800 object-cover"
                  />
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center">
                    {/* pencil micro-icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-2.5 h-2.5"
                    >
                      <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    </svg>
                  </span>
                </div>
                <p className="text-xs text-zinc-500 tracking-wide uppercase">
                  Your profile
                </p>
              </div>

              {/* ── Change Username ── */}
              <section className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-4 rounded-full bg-indigo-500" />
                  <h2 className="text-sm font-semibold text-zinc-300 tracking-wide uppercase">
                    Display Name
                  </h2>
                </div>
                <div className="relative">
                  <input
                    id="userName"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter new display name"
                    required
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600
                             focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50
                             transition-all duration-200"
                  />
                  {userName.trim() && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                  )}
                </div>
              </section>

              {/* ── Choose Avatar ── */}
              <section className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-4 rounded-full bg-violet-500" />
                  <h2 className="text-sm font-semibold text-zinc-300 tracking-wide uppercase">
                    Choose Avatar
                  </h2>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {USER_AVTARS.map((avatar) => (
                    <button
                      key={avatar}
                      onClick={() => setSelectedAvatar(avatar)}
                      aria-label="Select avatar"
                      className={[
                        "rounded-full p-0.5 transition-all duration-200 focus:outline-none",
                        selectedAvatar === avatar
                          ? "ring-2 ring-indigo-500 ring-offset-2 ring-offset-zinc-900 scale-110"
                          : "ring-1 ring-zinc-700 hover:ring-zinc-500 hover:scale-105",
                      ].join(" ")}
                    >
                      <img
                        src={avatar}
                        alt="Avatar option"
                        className="w-full aspect-square rounded-full bg-zinc-800 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </section>

              {/* ── Submit ── */}
              <button
                onClick={handleUpdate}
                disabled={!userName.trim() || loading}
                className={[
                  "w-full py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200",
                  "flex items-center justify-center gap-2",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                  userName.trim() && !loading
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30 active:scale-[0.98]"
                    : "bg-zinc-800 text-zinc-600 cursor-not-allowed",
                ].join(" ")}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-zinc-400 shrink-0"
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
                    <span className="text-zinc-400">Updating...</span>
                  </>
                ) : saved ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 shrink-0 text-emerald-400"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-emerald-400">Profile updated!</span>
                  </>
                ) : (
                  "Update Profile"
                )}
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-zinc-700 mt-4">
            Changes are saved to your Otaku-GPT account
          </p>
        </div>
      </div>
    </>
  );
};

export default ManageAccount;
