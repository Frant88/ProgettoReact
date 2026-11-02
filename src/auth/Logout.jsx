import { supabase } from "../supabaseClient";
import { useDispatch } from "react-redux";
import { clearAuth } from "./slice/authSlice"; // Il tuo action per resettare
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 1. Chiamata a Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;

      // 2. Pulizia Redux (passiamo null o uno stato vuoto)
      dispatch(clearAuth());

      // 3. Reindirizzamento
      navigate("/login");
      
      console.log("Sessione chiusa correttamente");
    } catch (error) {
      console.error("Errore durante il logout:", error.message);
    }
  };

  return handleLogout;
};