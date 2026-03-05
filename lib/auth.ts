// /lib/auth.ts
import { supabase } from "./supabaseClient";

export async function getCurrentSession() {
  // This gets the current session/user from Supabase
  const { data } = await supabase.auth.getSession();
  return data.session?.user ?? null;
}