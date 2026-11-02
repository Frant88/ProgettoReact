const RegisterForm = ({ formData, handleChange, onSubmit, loading }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:scale-[1.01]">
        
        {/* Intestazione */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800">Crea Account</h2>
          <p className="text-gray-500 mt-2">Unisciti alla community di Duellanti</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          
          {/* Campo Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input 
              type="text"
              value={formData.username}
              name="username"
              onChange={handleChange}
              placeholder="Il tuo nome da duellante"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
              required
            />
          </div>

          {/* Campo Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email"
              value={formData.email}
              name="email"
              onChange={handleChange}
              placeholder="esempio@mail.it"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
              required
            />
          </div>

          {/* Campo Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          {/* Bottone di Invio */}
          <button 
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
                Elaborazione...
              </span>
            ) : (
              "Registrati ora"
            )}
          </button>
        </form>

        {/* Footer del Form */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Hai già un account? <a href="/login" className="text-blue-600 font-semibold hover:underline">Accedi</a>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;