import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://otvpahsryicztbnkdfdf.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90dnBhaHNyeWljenRibmtkZmRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NzgzODEsImV4cCI6MjA4MDI1NDM4MX0.BDEtwo9YnysFFEch66hJKeySHqhGR_YoSxbvqxM79ZY";

export const supabase = createClient(supabaseUrl, supabaseKey);
