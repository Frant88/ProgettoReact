const LoginForm = ({ formData, handleChange, onSubmit, loading }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:scale-[1.01]">
        
        {/* Intestazione */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800">Bentornato!</h2>
          <p className="text-gray-500 mt-2">Inserisci le tue credenziali per duellare</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          
          {/* Campo Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="latua@email.com"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Campo Password */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <a href="#" className="text-xs text-blue-600 hover:underline">Password dimenticata?</a>
            </div>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Bottone di Invio */}
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all duration-300 
              ${loading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:scale-95"
              }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                Accesso in corso...
              </span>
            ) : (
              "Accedi"
            )}
          </button>
        </form>

        {/* Footer del Form */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            Non hai ancora un account?{" "}
            <a href="/register" className="text-blue-600 font-semibold hover:underline">
              Registrati ora
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;