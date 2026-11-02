import { useFilter } from "../../hooks/useFilter"

const Filtro = ({filtroAttivo, selezionaFiltro})=>{

    const Tipo = ["Spell Card", "Trap Card", "Normal Monster", "Effect Monster","Ritual Monster", "Fusion Monster", "XYZ Monster", "Link Monster"];

    return(
         <aside className="w-full md:w-64">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 sticky top-4">
            <h3 className="text-cyan-400 font-bold mb-4 uppercase text-sm tracking-widest">Filtri</h3>
            {Tipo.map((opzione) =>{
                const isAttivo = filtroAttivo === opzione;
                return (
            <button
              key={opzione}
              onClick={() => selezionaFiltro(opzione)}
                      // className va QUI, come attributo indipendente, non dentro style!
                     className={`w-full text-left px-5 py-3 rounded-xl text-sm font-semibold border transition-all duration-300 active:scale-95 ${
                isAttivo
                  ? "bg-cyan-950/40 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.25)] font-bold" // Stile Acceso Neon
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200 hover:bg-slate-900" // Stile Spento Elegante
                      }`}
            >
              {opzione}
            </button>
          );

            })}
          </div>
        </aside>
        )
};
export default Filtro;