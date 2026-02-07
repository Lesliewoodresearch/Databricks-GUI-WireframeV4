import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://hdyqejrcpmqnhfebivpq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkeXFlanJjcG1xbmhmZWJpdnBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0NDk5NDIsImV4cCI6MjA4NTAyNTk0Mn0.1Af91NoSe8aq533BEG2sbF1Aev-b0MwygbX4dUP1dnw';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});