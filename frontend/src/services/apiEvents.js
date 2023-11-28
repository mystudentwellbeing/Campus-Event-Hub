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

export const getAllEvents = async () => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });

  if (error) {
    console.error(error);
    throw new Error('Events could not be loaded');
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

export const createEditEvent = async (newEvent, id) => {
  const hasImagePath = newEvent.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newEvent.image.name}`.replaceAll(
    '/',
    ''
  );
  const imagePath = hasImagePath
    ? newEvent.image
    : `${supabaseUrl}/storage/v1/object/public/event_image/${imageName}`;

  let query = supabase.from('events');

  if (!id) query = query.insert([{ ...newEvent, image: imagePath }]);
  if (id) query = query.update({ ...newEvent, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

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

export const approveEvent = async (id) => {
  const { data, error } = await supabase
    .from('events')
    .update({ is_approved: true })
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Event could not be approved');
  }

  return data;
};

export const deleteEvent = async (id) => {
  const { error: storageError } = await supabase.storage
    .from('event_image')
    .remove([`event_image/${id}`]);

  if (storageError) {
    console.error(storageError);
    throw new Error('Event image could not be deleted');
  }

  const { error: deleteError } = await supabase
    .from('events')
    .delete()
    .eq('id', id);

  if (deleteError) {
    console.error(deleteError);
    throw new Error('Event could not be deleted');
  }
};
