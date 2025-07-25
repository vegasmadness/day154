import { s as supabase } from './supabase_8aLQgMSH.mjs';

async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
}

export { getCurrentUser as g };
