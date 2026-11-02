import React, { useEffect, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCards } from "../card/slice/cardSlice";
import Card from "../card/components/Card";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

function Cards() {
  const dispatch = useDispatch();

  // 1. STATI (Nota l'ordine: prima dichiariamo currentPage)
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState(1);
  const limit = 30; 

  const { list, totalCards = 12000 } = useSelector((state) => state.cards);

  // 2. EFFETTI
  useEffect(() => {
    const newOffset = (currentPage - 1) * limit;
    dispatch(fetchAllCards({ limit, offset: newOffset }));
    window.scrollTo(0, 0);
    // Sincronizziamo l'input se la pagina cambia dai bottoni
    setInputPage(currentPage);
  }, [currentPage, dispatch]);

  const totalPages = Math.ceil(totalCards / limit);

  // 3. LOGICA INPUT
  const handlePageSubmit = (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      let value = parseInt(inputPage);
      
      if (isNaN(value) || value < 1) value = 1;
      if (value > totalPages) value = totalPages;
      
      setCurrentPage(value);
      setInputPage(value);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen p-6 bg-zinc-900">
        <h1 className="text-white text-2xl font-bold mb-6 text-center italic">
          COLLEZIONE CARTE
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-7xl mx-auto p-4">
          {list.map((card) => (
            <Link
              to={`/allCards/${card.id}`}
              key={card.id}
              className="block transition-transform duration-200 hover:scale-105"
            >
              <Card imgUrl={card.card_images[0].image_url} />
            </Link>
          ))}
        </div>

        {/* CONTROLLI PAGINAZIONE */}
        <div className="flex justify-center items-center gap-6 mt-16 py-8 border-t border-zinc-800">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="p-2 px-6 bg-zinc-800 text-white rounded-full hover:bg-cyan-600 disabled:opacity-20 transition shadow-lg"
          >
            ←
          </button>

          <div className="text-white font-medium flex items-center gap-2">
            <span>Pagina</span>
            <input 
              type="number" 
              value={inputPage} 
              onChange={(e) => setInputPage(e.target.value)}
              onKeyDown={handlePageSubmit}
              onBlur={handlePageSubmit}
              onFocus={(e) => e.target.select()}
              className="w-14 bg-slate-800 border border-slate-700 rounded-lg text-center font-bold text-cyan-400 focus:outline-none focus:border-cyan-500 transition-colors py-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="text-slate-500">di {totalPages}</span>
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="p-2 px-6 bg-zinc-800 text-white rounded-full hover:bg-cyan-600 disabled:opacity-20 transition shadow-lg"
          >
            →
          </button>
        </div>
      </div>
    </>
  );
}

export default Cards;