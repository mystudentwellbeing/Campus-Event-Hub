import supabase from './supabase';

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
};

export const signup = async ({ email, password, passwordConfirm }) => {
  // Check if password and confirm password match
  if (password !== passwordConfirm) {
    throw new Error('Password and confirm password do not match.');
  }
  // If password and confirm password match, proceed with signup
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
};

export const login = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
};

export const getAllUsers = async () => {
  const { data, error } = await supabase.from('profiles').select('*');

  if (error) throw new Error(error.message);

  return data;
};

export const updateCurrentUser = async ({ email, password }) => {
  let updateData = {};
  if (email) updateData.email = email;
  if (password) updateData.password = password;

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  return data;
};
