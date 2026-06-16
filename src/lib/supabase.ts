import { createClient } from "@supabase/supabase-js";

export type Database = {
  public: {
    Tables: {
      wishlist: {
        Row: { id: string; email: string; created_at: string };
        Insert: { email: string };
        Update: { email?: string };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};

let client: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  if (!client) {
    client = createClient<Database>(url, anonKey, {
      auth: { persistSession: false },
    });
  }

  return client;
}
