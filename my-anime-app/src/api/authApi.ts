import { supabase } from './supabase'

export const authApi = {
 async signUp(email: string, password: string, username: string) {
  const { data, error } = await supabase.auth.signUp({ 
    email, 
    password,
    options: {
      data: {
        username: username  // зберігається в auth.users metadata
      }
    }
  })
  if (error) throw new Error(error.message)
  return data
},

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error(error.message)
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error(error.message)
  },

  async getUser() {
    const { data } = await supabase.auth.getUser()
    return data.user
  },
}