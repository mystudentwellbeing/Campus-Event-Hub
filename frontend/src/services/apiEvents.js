import supabase, { supabaseUrl } from './supabase';
import { getCurrentMonthDateRange } from '../utils/helpers';

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

export const getAllEvents = async ({ status, sortBy, page }) => {
  let query = supabase.from('events').select('*', { count: 'exact' });

  if (status) {
    switch (status) {
      case 'pending':
        query = query.eq('is_approved', false);
        break;
      case 'approved':
        query = query.eq('is_approved', true);
        break;
      case 'past':
        query = query.lt('date', new Date().toISOString());
        break;
    }
  }

  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc',
    });
  }

  if (page) {
    const from = (page - 1) * 10;
    const to = from + 10 - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error('Bookings could not be loaded');
  }

  return { data, count };
};

export const getAllPendingEvents = async () => {
  const { data, error } = await supabase
    .from('events')
    .select('*', { count: 'exact' })
    .eq('is_approved', false);
  if (error) {
    console.error(error);
    throw new Error('Events could not be loaded');
  }

  return data.length;
};

export const getCurrentMonthEventsCount = async () => {
  const { firstDayOfMonth, lastDayOfMonth } = getCurrentMonthDateRange();
  const { data, error } = await supabase
    .from('events')
    .select('*', { count: 'exact' })
    .eq('is_approved', true)
    .gte('date', firstDayOfMonth.toISOString())
    .lte('date', lastDayOfMonth.toISOString());
  if (error) {
    console.error(error);
    throw new Error('Error fetching current month events count');
  }
  return data.length;
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
