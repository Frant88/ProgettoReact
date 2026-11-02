import { createClient } from '@supabase/supabase-js'

// Vite usa import.meta.env per leggere il file .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Creiamo l'istanza del client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)