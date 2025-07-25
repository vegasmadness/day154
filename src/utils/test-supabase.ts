import { supabase } from './supabase'

// Test Supabase connection
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('_test').select('*').limit(1)
    
    if (error && error.code === 'PGRST116') {
      // Table doesn't exist - this is expected and means connection works
      console.log('✅ Supabase connection successful!')
      return { success: true, message: 'Connection established' }
    }
    
    if (error) {
      console.error('❌ Supabase connection error:', error)
      return { success: false, error }
    }
    
    console.log('✅ Supabase connection successful!')
    return { success: true, message: 'Connection established' }
  } catch (err) {
    console.error('❌ Supabase connection failed:', err)
    return { success: false, error: err }
  }
}