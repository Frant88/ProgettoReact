import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "./slice/authSlice";
import LoginForm from "./components/LoginForm";
import { supabase } from "../supabaseClient";
import Navbar from "../Navbar";

export default function Login(){
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const [formData,setFormData] = useState(
        {
            email: '',
            password: ''
        }
    )

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]: e.target.value});
    }
    const handleLogin = async (e)=>{
        e.preventDefault();
        setLoading(true);

        const {data,error} = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password
        });
        if(error){
            setLoading(false);
            alert("Errore: " + error);
        } else {
            setLoading(false);
            dispatch(setAuth({user: data.user, session: data.session}));
            console.log("Login effettuato con successo") 
        }
    }
    return (
        <>
        <Navbar></Navbar>
        <LoginForm
        formData={formData} 
        handleChange={handleChange} 
        onSubmit={handleLogin} 
        loading={loading} 
        />
        </>
    )
}