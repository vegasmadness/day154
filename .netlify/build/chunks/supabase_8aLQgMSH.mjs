import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://kxguirtmfwlanlzcfavk.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4Z3VpcnRtZndsYW5semNmYXZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzNzM5NzksImV4cCI6MjA2ODk0OTk3OX0.H_-1gBTgIGmme0Es2QEM17QiUUyucz4yNo6Fp8_DBxA";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase as s };
