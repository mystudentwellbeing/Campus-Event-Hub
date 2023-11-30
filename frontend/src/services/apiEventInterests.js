import supabase from './supabase';

export const likeEvent = async (newLike) => {
  const { data, error } = await supabase
    .from('event_interests')
    .insert(newLike);

  if (error) {
    console.error(error);
    throw new Error('Error liking event');
  }

  return data;
};

export const unlikeEvent = async (id) => {
  try {
    const { data, error } = await supabase
      .from('event_interests')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error unliking event: ', error);
      throw new Error('Error unliking event');
    }
    return data;
  } catch (error) {
    console.error('Error in unlikeEvent function: ', error);
    throw error;
  }
};

export const getEventsLikedByUser = async (userId) => {
  const { data, error } = await supabase
    .from('event_interests')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    throw new Error('Error getting event interests');
  }

  return data;
};

export const getAllEventInterests = async () => {
  const { data, error } = await supabase
    .from('event_interests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    throw new Error('Error getting event interests');
  }

  return data;
};
