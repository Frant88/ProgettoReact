import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"
import { useSelector } from "react-redux";

export const useInsertCard = (cardId = null) => {
  const userId = useSelector((state) => state.auth.user?.id);
  const [totalCards, setTotalCards] = useState(0);
  const [cardCopies, setCardCopies] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCount = async () => {
    if (!userId) {
      return
    }
    const { count: total } = await supabase
      .from('favorites')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)

    setTotalCards(total || 0);

    if (cardId) {
      const { count: copies } = await supabase
        .from('favorites')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('card_id', cardId);

      setCardCopies(copies || 0);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCount();

    const channel = supabase
      .channel(`deck-sync-${userId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'favorites', filter: `user_id=eq.${userId}` },
        () => fetchCount()
      )
      .subscribe()
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, cardId])
  const saveCard = async (cardData) => {

    if (!userId) {
      console.error("Devi essere loggato per salvare i preferiti!");
      return;
    }

    if (totalCards < 60) {
      if (cardCopies < 3) {
        const { data, error } = await supabase
          .from('favorites')
          .insert([
            { user_id: userId, card_id: cardData.id, card_name: cardData.name, img_url: cardData.card_images[0].image_url, type_card: cardData.type }
          ])
          .select()
        if (error) {
          console.error("Errore durante il salvataggio:", error.message);
        } else {
          console.log("Carta salvata nei preferiti!", data);
        }
      } else {
        alert("Presenti già 3 copie nel tuo deck");
      }
    } else {
      alert("Deck al completo sono presenti 60 carte");
    }

  }
  return { saveCard, totalCards, cardCopies, loading };
}
