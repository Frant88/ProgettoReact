import { useParams } from "react-router-dom";
import { useCardById } from "../hooks/useCardById";
import Navbar from "../Navbar";
import { useInsertCard } from "../hooks/useInsertCard";
import { useSelector } from "react-redux";

export function CardComplete() {
  const { cardId } = useParams();
  const { card, loading: cardLoading, error } = useCardById(cardId);
  
  const { saveCard: executeSave, totalCards, cardCopies, loading: insertLoading } = useInsertCard(cardId);

  if (cardLoading) return <div className="text-white text-center mt-20 font-black animate-pulse">CARICAMENTO CARTA...</div>;
  if (error) return <div className="text-red-500 text-center mt-20 uppercase font-black">{error}</div>;
  if (!card || card.length === 0) return null;

  const cardData = card[0];

  const handleSaveCard = async (e) => {
    e.preventDefault();
    await executeSave(cardData);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 bg-slate-900/50 p-6 rounded-3xl border border-slate-800 backdrop-blur-sm shadow-2xl">
            
            {/* COLONNA SINISTRA: Immagine */}
            <div className="w-full md:w-1/3 flex-shrink-0">
              <div className="sticky top-8">
                <img
                  src={cardData.card_images[0].image_url}
                  alt={cardData.name}
                  className="w-full h-auto rounded-xl shadow-[0_0_50px_rgba(6,182,212,0.2)] border-4 border-slate-800"
                />
              </div>
            </div>

            {/* COLONNA DESTRA: Dettagli */}
            <div className="flex-1 space-y-6">
              {/* Header Info */}
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-cyan-400 italic uppercase tracking-tighter">
                  {cardData.name}
                </h1>
                <div className="flex items-center gap-4 mt-2">
                  <span className="bg-slate-800 px-3 py-1 rounded-full text-xs font-bold border border-slate-700 text-slate-300">
                    {cardData.type}
                  </span>
                  <span className="text-cyan-500/50 font-mono text-xs uppercase tracking-widest">
                    Deck: {totalCards} / 60
                  </span>
                </div>
              </div>

              {/* Statistiche & Descrizione (Tuo codice originale qui...) */}
              <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800">
                 <p className="text-slate-300 leading-relaxed italic text-sm">{cardData.desc}</p>
              </div>

              {/* SEZIONE BOTTONE E CARTE DINAMICHE */}
              <div className="flex flex-col gap-4 pt-4">
                <div className="flex items-center gap-6">
                  
                  {/* Il nuovo Bottone */}
                  <button
                    onClick={handleSaveCard}
                    disabled={cardCopies >= 3 || totalCards >= 60}
                    className={`group relative flex items-center gap-3 px-8 py-4 font-black uppercase tracking-widest text-sm rounded-xl transition-all duration-300 border-2 
                      ${(cardCopies >= 3 || totalCards >= 60) 
                        ? "bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed" 
                        : "bg-cyan-600 border-cyan-400 text-white hover:bg-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-95"}`}
                  >
                    {/* Icona Mazzo di Carte */}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    
                    <span>
                      {cardCopies >= 3 ? "Limite Copie" : totalCards >= 60 ? "Deck Pieno" : "Aggiungi al Deck"}
                    </span>
                  </button>

                  {/* VISUALIZZAZIONE COPIE (Le cartine affianco) */}
                  <div className="flex gap-2">
                    {[...Array(3)].map((_, i) => (
                      <div 
                        key={i}
                        className={`w-8 h-12 rounded-md border-2 transition-all duration-500 transform 
                          ${i < cardCopies 
                            ? "bg-cyan-500 border-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.6)] scale-110 translate-y-[-4px]" 
                            : "bg-slate-800 border-slate-700 opacity-30 scale-90"}`}
                      >
                        {i < cardCopies && (
                          <div className="flex items-center justify-center h-full">
                            <span className="text-cyan-100 text-[10px] font-bold">✓</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                </div>
                
                {/* Feedback testuale */}
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">
                  Possiedi {cardCopies} di 3 copie consentite
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}