import { useState } from "react"

export const useFilter = (filtroIniziale = null)=>{
    const [filtroAttivo, setFiltro] = useState(filtroIniziale);

    const selezionaFiltro = (filtro)=> {
        setFiltro((precedente)=>{
           return precedente === filtro ? null: filtro
        })
    }
    return{
        filtroAttivo,selezionaFiltro,
    }
}