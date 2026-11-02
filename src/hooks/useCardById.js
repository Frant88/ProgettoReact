import { useEffect, useState } from "react";

export const useCardById = (id)=>{
    const [card, setCard]= useState([]);
    const [loading, setLoading]= useState(false);
    const [error, setError]= useState(null);

    useEffect(()=>{
        if(!id){
            setCard([]);
            setLoading(false);
            return;
        }
       const fetchId = async () =>{
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`)
            if(!response.ok){
                throw new Error ("Errore nella chiamata")
            }
            const json = await response.json()
            setCard(json.data)
            
        } catch (error) {
             setError(error.message);
            setCard([])
        }finally {
            setLoading(false);
            }
       };

       fetchId();
       return
    },[id]);

    return { card,loading, error}
}