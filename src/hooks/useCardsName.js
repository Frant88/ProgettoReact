import { useEffect, useState } from "react";

export const useCardsName = (cardName = "", type) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cardName || cardName.trim().length < 3 && !type) {
      setCards([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchCardsName = async () => {
      setLoading(true);
      setError(null);

      try {
        
    const param = new URLSearchParams();
    if(cardName.trim().length >= 3){
      param.append("fname", cardName);
    }
    if(type){
      param.append("type", type);
    }
        
        // Aggiunto &language=it per cercare in italiano
        const response = await fetch(
          `https://db.ygoprodeck.com/api/v7/cardinfo.php?${param.toString()}&language=it`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          if (response.status === 400) throw new Error("Nessuna carta trovata.");
          throw new Error("Errore nel recupero delle carte");
        }

        const json = await response.json();
        setCards(json.data || []);
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message);
        setCards([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchCardsName();

    return () => controller.abort();
  }, [cardName, type]);

  return { cards, loading, error };
};