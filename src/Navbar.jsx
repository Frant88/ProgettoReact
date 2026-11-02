import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "./auth/slice/authSlice";
import { supabase } from "./supabaseClient";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Prendiamo l'utente dallo stato di Redux
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Errore logout:", error.message);
    } else {
      dispatch(setAuth({ user: null, session: null }));
      navigate("/");
    }
  };

  return (
    <nav className="border-b border-cyan-900/50 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <div className="text-2xl font-black tracking-tighter">
          <Link to="/" className="transition-all hover:opacity-80 flex items-center gap-2">
            <span className="text-cyan-400">YU-GI-OH</span>
            <span className="bg-cyan-500 text-slate-900 px-2 py-0.5 rounded text-sm">DB</span>
          </Link>
        </div>

        {/* NAVIGATION LINKS */}
        <ul className="flex items-center gap-6 md:gap-8 uppercase tracking-widest">
          <li>
            <Link to="/" className="text-xs font-bold text-slate-400 transition-colors hover:text-cyan-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/allCards" className="text-xs font-bold text-slate-400 transition-colors hover:text-cyan-400">
              Carte
            </Link>
          </li>

          {/* RENDERING CONDIZIONALE */}
          {user ? (
            <li className="flex items-center gap-4 border-l border-slate-700 pl-6">
              <div className="hidden lg:block text-right">
                <p className="text-[10px] text-slate-500 leading-none uppercase">Duellante</p>
                <p className="text-sm font-bold text-cyan-400">
                  {user.user_metadata?.display_name || "Guest"}
                </p>
              </div>
              
              <button
                onClick={handleLogout}
                className="px-5 py-1.5 bg-red-500/10 text-red-500 border border-red-500/50 text-xs font-black rounded-sm 
                           hover:bg-red-500 hover:text-white transition-all duration-300 uppercase tracking-tighter"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className="relative px-6 py-2 bg-cyan-600 text-white text-xs font-black uppercase tracking-tighter rounded-sm
                           hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all"
              >
                Accedi
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;