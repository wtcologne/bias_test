import { createClient } from "@supabase/supabase-js";

/**
 * Supabase Client für die Bias-App
 *
 * Die Environment-Variablen findest du in Supabase unter:
 * Project Settings → API → Project URL (NEXT_PUBLIC_SUPABASE_URL)
 * Project Settings → API → anon public key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
 *
 * Bei Vercel: Settings → Environment Variables
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

