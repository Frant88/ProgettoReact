import React, { useState, useMemo } from 'react';
import Navbar from './Navbar';
import { useCardsName } from './hooks/useCardsName';
import Filtro from './pages/components/Filtro';
import { useFilter } from './hooks/useFilter';

const MOCK_CARDS = [
  { id: 1, name: "Mago Nero", type: "Mostro", image: "https://images.ygoprodeck.com/images/cards/back_high.jpg" },
  { id: 2, name: "Drago Bianco", type: "Mostro", image: "https://images.ygoprodeck.com/images/cards/back_high.jpg" },
];

const App = () => {
  const {filtroAttivo, selezionaFiltro} = useFilter(null);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [query, setQuery] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8; // Numero di carte per pagina

  const { cards, loading, error } = useCardsName(query, filtroAttivo);

  // Decidiamo cosa mostrare: i risultati della ricerca o i Mock iniziali
  const allResults = cards.length > 0 ? cards : (query ? [] : MOCK_CARDS);

  // Calcolo della paginazione
  const totalPages = Math.ceil(allResults.length / cardsPerPage);
  
  const currentCards = useMemo(() => {
    const lastIndex = currentPage * cardsPerPage;
    const firstIndex = lastIndex - cardsPerPage;
    return allResults.slice(firstIndex, lastIndex);
  }, [allResults, currentPage]);

  const handleCercaNome = () => {
    if (searchTerm.trim().length >= 3) {
      setQuery(searchTerm);
      setCurrentPage(1); // Torna alla prima pagina su ogni nuova ricerca
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500">
      <Navbar />

      <header className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent italic uppercase">
            It's time to duel
          </h1>
          
          <div className="relative max-w-2xl mx-auto mt-10">
            <input 
              type="text" 
              placeholder="Cerca una carta in italiano (es. Mago Nero)..." 
              className="w-full bg-slate-900 border border-slate-700 rounded-full py-4 px-8 focus:outline-none focus:border-cyan-500 transition-all"
              value={searchTerm}
              onChange={(e) =>{ 
                const valore = e.target.value;
                setSearchTerm(valore);
                if(valore.trim() === ""){
                  setQuery("");
                  setCurrentPage(1);
                }}}
              onKeyDown={(e) => e.key === 'Enter' && handleCercaNome()}
            />
            <button 
              className="absolute right-3 top-2 bottom-2 bg-cyan-600 hover:bg-cyan-500 px-6 rounded-full font-bold transition active:scale-95 disabled:opacity-50"
              onClick={handleCercaNome}
              disabled={loading}
            >
              {loading ? "..." : "Cerca"}
            </button>
          </div>
          {error && <p className="text-red-500 mt-4 text-sm font-semibold">{error}</p>}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        {/* Sidebar Filtri */}
       <Filtro
       filtroAttivo={filtroAttivo}
       selezionaFiltro={selezionaFiltro}
       />

        {/* Sezione Risultati */}
        <section className="flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentCards.map(card => (
              <div key={card.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg bg-slate-800 aspect-[2.5/3.6] shadow-lg transition-transform duration-300 group-hover:-translate-y-2">
                  <img 
                    src={card.card_images ? card.card_images[0].image_url : card.image} 
                    alt={card.name} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="mt-3">
                  <h4 className="font-bold text-sm truncate group-hover:text-cyan-400 transition-colors">{card.name}</h4>
                  <p className="text-[10px] text-slate-500 uppercase tracking-tighter">{card.type}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigazione Pagine */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-6 mt-16 py-4 border-t border-slate-900">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="p-2 px-6 bg-slate-900 border border-slate-800 rounded-full hover:border-cyan-500 disabled:opacity-20 transition"
              >
                ← Precedente
              </button>
              
              <span className="text-sm font-medium">
                Pagina <span className="text-cyan-400">{currentPage}</span> di {totalPages}
              </span>

              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className="p-2 px-6 bg-slate-900 border border-slate-800 rounded-full hover:border-cyan-500 disabled:opacity-20 transition"
              >
                Successiva →
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default App;