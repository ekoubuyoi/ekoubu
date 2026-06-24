'use server';

import { supabase } from './lib/supabase';
import { revalidatePath } from 'next/cache';

export async function getDoodles() {
  const { data, error } = await supabase
    .from('guestbook_doodles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching doodles:', error);
    return [];
  }
  return data || [];
}

export async function saveDoodle(payload: { name: string; comment: string; doodle_data: string }) {
  if (!payload.comment || !payload.doodle_data) {
    throw new Error('Comment and Doodle are required fields.');
  }

  if (payload.comment.length > 500) {
    throw new Error('Comment is too long (max 500 characters).');
  }

  if (payload.doodle_data.length > 500000) {
    throw new Error('Doodle data is too large (max ~500KB).');
  }

  const { error } = await supabase
    .from('guestbook_doodles')
    .insert([
      {
        name: payload.name || 'Anonymous',
        comment: payload.comment,
        doodle_data: payload.doodle_data,
      },
    ]);

  if (error) {
    console.error('Error inserting doodle:', error);
    return { success: false, error: error.message };
  }

  // Tells Next.js to refresh the UI and fetch the newest database state immediately
  revalidatePath('/connect');
  return { success: true };
}