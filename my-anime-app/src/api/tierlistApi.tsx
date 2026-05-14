import { supabase } from './supabase';

export const tierlistApi = {
  async getAll() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data } = await supabase
      .from('tierlist')
      .select('*')
      .eq('user_id', user?.id);
    return data || [];
  },

  async updateTier(mal_id: number, tier: string) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: existing } = await supabase
      .from('tierlist')
      .select('id')
      .eq('mal_id', mal_id)
      .eq('user_id', user?.id)
      .maybeSingle();

    if (existing) {
     
      await supabase.from('tierlist').update({ tier }).eq('id', existing.id);
    } else {
     
      await supabase
        .from('tierlist')
        .insert([{ mal_id, tier, user_id: user?.id }]);
    }
  },

  async removeTier(mal_id: number) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    await supabase
      .from('tierlist')
      .delete()
      .eq('mal_id', mal_id)
      .eq('user_id', user?.id);
  },
};
