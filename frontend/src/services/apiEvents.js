import supabase from './supabase';

export const getEvents = async () => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('is_approved', true)
    .gte('date', new Date().toISOString())
    .order('date', { ascending: true });

  if (error) {
    console.error(error);
    throw new Error('Events could not be loaded');
  }

  return data;
};

export const getEvent = async (id) => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Event not found');
  }

  return data;
};
