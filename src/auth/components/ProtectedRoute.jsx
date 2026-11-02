import { createContext, useEffect, useState } from "react"
import { supabase } from "../../supabaseClient";
import { Navigate } from "react-router-dom";

const AuthContext = createContext({})

const ProtectedRoute = ({children})=>{
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

 if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <p>Caricamento duellante...</p> 
      </div>
    );
  }

  if (!user) {
    // Se non c'è un utente, lo spediamo alla pagina di login
    return <Navigate to="/login" replace />;
  }

  // Se l'utente esiste, mostriamo i "children" (la pagina protetta)
  return children;
};

export default ProtectedRoute;