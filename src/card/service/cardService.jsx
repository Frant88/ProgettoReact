
const API_URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php";

export const cardService = {
  getCardsByName: async (name)=>{
    try{
    const response = await fetch(`${API_URL}?fname=${encodeURIComponent(name)}`);
    if(!response.ok) return [];

    const data = await response.json();
    return data.data;
  } catch(error){
    console.error("Errore nella ricerca per nome:", error);
      return [];
    }
 },

 getAllCards: async (limit = 30,offset = 0) =>{
    try {
        const response = await fetch(`${API_URL}?num=${limit}&offset=${offset}`);

        if(!response.ok) throw new Error("Errore nel caricamento delle carte")
        
        const data= await response.json();
        return data.data

    } catch (error) {
         console.error("Errore nel caricare le carte:", error);
      return [];
    }
 },
 getCardById: async (id)=>{
    try {
        const response = await fetch(`${API_URL}?id=${id}`)

    if(!response.ok) return [];

    const data = await response.json();
    return data.data[0]
    } catch (error) {
        console.log("Errore : " + error)
    }
 }
};