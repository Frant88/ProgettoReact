import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const PublicRoute = ({ children }) => {
    const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);
  
      useEffect(() => {
      // Controlla la sessione all'avvio
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });
  
      // Ascolta cambiamenti (login/logout) in tempo reale
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });
  
      return () => subscription.unsubscribe();
    }, []);

  if (user) {
    // Se l'utente è loggato, non deve stare qui! Lo mandiamo in Home
    return <Navigate to="/" replace />;
  }

  // Se non c'è l'utente, può vedere tranquillamente il Login/Register
  return children;
};

export default PublicRoute;