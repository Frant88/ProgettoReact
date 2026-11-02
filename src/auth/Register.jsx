import { useDispatch } from "react-redux";
import { supabase } from "../supabaseClient";
import { useState } from "react";
import { setAuth } from "./slice/authSlice";
import  RegisterForm from "./components/RegisterForm";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

export default function Register(){
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [formData,setFormData] = useState({
        email: '',
        password: '',
        username: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]: e.target.value});
    };

    const handleSingnUp = async (e)=> {
        e.preventDefault();
        setLoading(true);

        const {data, error} = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options:{data:{display_name: formData.username}}
        });

        if(error){
            alert (error.message);
            setLoading(false);
        } else {
            dispatch(setAuth ({user: data.user, session : data.session}));
            console.log("Registrazione Effettuata con successo")
            setLoading(false);
            setFormData({email: '', password: '',username: ''});
            navigate("/");
        }
    };
    return (
        <>
        <Navbar></Navbar>
        <RegisterForm
        formData = {formData}
        handleChange = {handleChange}
        onSubmit = {handleSingnUp}
        loading= {loading}/>
        </>
    )

}