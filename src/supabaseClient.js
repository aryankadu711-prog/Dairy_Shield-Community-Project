import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Initialize Supabase Client. If variables are missing,
// export null to trigger graceful fallback to LocalStorage.
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (!supabase) {
  console.warn("Supabase credentials (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY) are missing in the environment. Running in Local Storage Fallback mode.");
}
