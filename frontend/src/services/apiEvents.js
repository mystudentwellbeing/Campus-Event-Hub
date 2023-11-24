import supabase from './supabase';

const getEvents = async () => {
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

export default getEvents;
