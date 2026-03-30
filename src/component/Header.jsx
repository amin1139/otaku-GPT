import { useState, useRef, useEffect } from "react";
import { Home, Tv, Bookmark, Settings, LogOut, Menu, X, ChevronDown } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import ManageAccount from "./ManageAccount";

const NAV_LINKS = [
  { label: "Home", icon: Home, href: "#" },
  { label: "TV Shows", icon: Tv, href: "#" },
  { label: "My List", icon: Bookmark, href: "#" },
];

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [manageUserIsOpen, setManageUserIsOpen] = useState(false)
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const user = useSelector(store => store.user)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSingOut = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
      navigate('/error')
    });
  }

  const handleManageUser = () => {
    setManageUserIsOpen(true)
  }

  return (
    <>
      {/* Keyframe animations that need to be in CSS */}
      <style>{`
        @keyframes dropIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-8px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-dropIn {
          animation: dropIn 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slideDown {
          animation: slideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Header Root */}
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ease-out ${scrolled ? 'bg-[rgba(8,9,14,0.96)]! border-b! border-indigo-500/20!' : ''}`}>
        {/* Header Background */}
        <div className="bg-[rgba(10,11,18,0.92)] backdrop-blur-xl backdrop-saturate-180 border-b border-white/6 shadow-[0_4px_40px_rgba(0,0,0,0.5)]">
          {/* Inner Container */}
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-17 md:h-15">
            {/* LOGO */}
            <a href="#" className="flex items-center gap-2 no-underline shrink-0">
              {/* Logo Icon with overlay */}
              <div className="relative w-9 h-9 bg-linear-to-br from-indigo-500 to-purple-500 rounded-[10px] flex items-center justify-center shadow-[0_0_18px_rgba(99,102,241,0.5)] overflow-hidden">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-white/15 to-transparent" />
                <Tv className="w-4.5 h-4.5 text-white relative z-10" />
              </div>
              <span className="font-['Bebas_Neue',sans-serif] text-[1.55rem] md:text-[1.35rem] tracking-[0.06em] bg-linear-to-r from-slate-200 to-violet-300 bg-clip-text text-transparent leading-none">
                Otaku-GPT
              </span>
            </a>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  className={`flex items-center gap-1 px-3.5 py-1.75 rounded-lg font-['DM_Sans',sans-serif] text-[0.875rem] font-medium text-slate-400 no-underline tracking-wide transition-all duration-200 cursor-pointer border-none bg-transparent whitespace-nowrap hover:text-slate-200 hover:bg-indigo-500/10 ${activeLink === label ? 'text-violet-400! bg-indigo-500/12! font-semibold!' : ''}`}
                  onClick={(e) => { e.preventDefault(); setActiveLink(label); }}
                >
                  <Icon className={`w-3.75 h-3.75 ${activeLink === label ? 'text-violet-400! opacity-100!' : 'opacity-80'}`} />
                  {label}
                </a>
              ))}
            </nav>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-3">
              {/* DESKTOP USER DROPDOWN */}
              <div className="relative hidden md:block" ref={dropdownRef}>
                <button
                  className={`flex items-center gap-2 py-1.5 pr-3 pl-1.5 rounded-full border transition-all duration-200 cursor-pointer text-slate-400 hover:bg-indigo-500/14! hover:border-indigo-500/35! hover:text-slate-200! ${dropdownOpen ? 'bg-indigo-500/14! border-indigo-500/35! text-slate-200!' : 'border-white/10 bg-white/5'}`}
                  data-open={dropdownOpen}
                  onMouseEnter={() => setDropdownOpen(true)}
                  onClick={() => setDropdownOpen((v) => !v)}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  {/* User Avatar */}
                  <div className="w-8 h-8 bg-linear-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shrink-0">
                    <img src={user?.photoURL} className="rounded-full w-8 h-8 text-white" />
                  </div>
                  <span className="font-['DM_Sans',sans-serif] text-[0.8rem] font-medium tracking-wide hidden lg:inline">{user?.displayName}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 hidden lg:block ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Panel */}
                {dropdownOpen && (
                  <div
                    className="absolute top-full right-0 mt-2.5 min-w-50 bg-[rgba(15,16,25,0.97)] border border-indigo-500/20 rounded-[14px] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.03)] origin-top-right animate-dropIn overflow-hidden"
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    {/* Dropdown Header */}
                    <div className="px-3 py-3 border-b border-white/6 mb-1">
                      <p className="font-['DM_Sans',sans-serif] text-[0.75rem] text-slate-500 mb-0.5">Signed in as</p>
                      <strong className="font-['DM_Sans',sans-serif] text-[0.875rem] font-semibold text-slate-200">{user?.displayName}</strong>
                    </div>
                    
                    {/* Dropdown Items */}
                    <button onClick={handleManageUser} className="flex items-center gap-2.5 w-full px-3 py-2.25 rounded-lg font-['DM_Sans',sans-serif] text-[0.875rem] font-medium text-slate-400 bg-transparent border-none cursor-pointer text-left transition-all duration-200 hover:bg-indigo-500/12 hover:text-slate-200">
                      <Settings className="w-3.75 h-3.75 shrink-0" />
                      Manage Account
                    </button>
                    
                    {/* Divider */}
                    <div className="h-px bg-white/6 my-2" />
                    
                    {/* Logout Button */}
                    <button onClick={handleSingOut} className="flex items-center gap-2.5 w-full px-3 py-2.25 rounded-lg font-['DM_Sans',sans-serif] text-[0.875rem] font-medium text-slate-400 bg-transparent border-none cursor-pointer text-left transition-all duration-200 hover:bg-red-500/10! hover:text-red-400!">
                      <LogOut className="w-3.75 h-3.75 shrink-0" />
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* MOBILE HAMBURGER */}
              <button
                className="md:hidden flex bg-white/5 border border-white/8 rounded-lg p-1 text-slate-400 cursor-pointer transition-all duration-200 hover:text-slate-200 hover:bg-indigo-500/15"
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden flex flex-col gap-1 px-4 pt-3 pb-4 border-t border-white/5 bg-[rgba(8,9,14,0.98)] animate-slideDown">
            {NAV_LINKS.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                className={`flex items-center gap-1 px-4 py-2.5 rounded-[10px] font-['DM_Sans',sans-serif] text-[0.9rem] font-medium text-slate-400 no-underline tracking-wide transition-all duration-200 cursor-pointer border-none bg-transparent w-full justify-start hover:text-slate-200 hover:bg-indigo-500/10 ${activeLink === label ? 'text-violet-400! bg-indigo-500/12! font-semibold!' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveLink(label);
                  setMobileMenuOpen(false);
                }}
              >
                <Icon className="w-3.75 h-3.75" />
                {label}
              </a>
            ))}
            
            {/* Divider */}
            <div className="h-px bg-white/6 my-2" />
            
            {/* Mobile User Section */}
            <div className="flex flex-col gap-1">
              {/* User Info */}
              <div className="flex items-center gap-3 px-4 py-2.5 mb-1">
                <div className="w-11 h-11 bg-linear-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                  <img src={user?.photoURL} className="rounded-full w-11 h-11 text-white" />
                </div>
                <div>
                  <p className="font-['DM_Sans',sans-serif] text-[0.7rem] text-slate-500">Signed in as</p>
                  <strong className="font-['DM_Sans',sans-serif] text-[0.875rem] font-semibold text-slate-200">{user?.displayName}</strong>
                </div>
              </div>
              
              {/* Settings Button */}
              <button onClick={handleManageUser} className="flex items-center gap-1 px-4 py-2.5 rounded-[10px] font-['DM_Sans',sans-serif] text-[0.875rem] font-medium text-slate-400 bg-transparent border-none cursor-pointer transition-all duration-200 w-full justify-start hover:text-slate-200 hover:bg-indigo-500/10">
                <Settings size={15} />
                Manage Account
              </button>
              
              {/* Logout Button */}
              <button
                className="flex items-center gap-1 px-4 py-2.5 rounded-[10px] font-['DM_Sans',sans-serif] text-[0.875rem] font-medium text-slate-400 bg-transparent border-none cursor-pointer transition-all duration-200 w-full justify-start hover:bg-red-500/10! hover:text-red-400!"
                onClick={() => {
                  handleSingOut()
                  setMobileMenuOpen(false);
                }}
              >
                <LogOut size={15} />
                Logout
              </button>
            </div>
          </div>
        )}
      </header>
      <Modal
       isOpen={manageUserIsOpen}
        onClose={() => setManageUserIsOpen(false)}
        title="Manage User"
        size="md"
        closable={true}
        className="bg-zinc-950"
      >
        <ManageAccount onClose={() => setManageUserIsOpen(false)} />
      </Modal>
    </>
  );
}
