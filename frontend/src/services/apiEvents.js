import supabase, { supabaseUrl } from './supabase';

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

export const getEventsCreatedByUser = async (userId) => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: true });

  if (error) {
    console.error(error);
    throw new Error('Events could not be loaded');
  }

  return data;
};

export const createEvent = async (newEvent) => {
  const hasImagePath = newEvent.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newEvent.image.name}`.replaceAll(
    '/',
    ''
  );
  const imagePath = hasImagePath
    ? newEvent.image
    : `${supabaseUrl}/storage/v1/object/public/event_image/${imageName}`;

  // let query = supabase.from('events');

  // if (!id) query = query.insert([{ ...newEvent, image: imagePath }]);

  const { data, error } = await supabase
    .from('events')
    .insert([{ ...newEvent, image: imagePath }]);

  if (error) {
    console.error(error);
    throw new Error('Event could not be created');
  }
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from('event_image')
    .upload(imageName, newEvent.image);

  if (storageError) {
    await supabase.from('events').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error(
      'Event image could not be uploaded and the event was not created'
    );
  }
  return data;
};
