import supabase from '../superbase';

export const getTasks = async () => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Ошибка при получении задач:', error.message);
    throw error;
  }

  return data;
};

export const addTask = async taskData => {
  const { title, description, active, created_at } = taskData;
  const { data, error } = await supabase
    .from('tasks')
    .insert({ title, description, active, created_at }) // id генерируется автоматически, если это первичный ключ
    .select();

  if (error) {
    console.error('Ошибка при добавлении задачи:', error.message);
    throw error;
  }

  return data;
};

export const deleteTask = async id => {
  const { data, error } = await supabase.from('tasks').delete().eq('id', id);

  if (error) {
    console.error('Error deleting data:', error);
  } else {
    console.log('Deleted user:', data);
  }
  return data;
};

export const updateTask = async ({ id, updateChecked }) => {
  const { data, error } = await supabase
    .from('tasks')
    .update({ checked: updateChecked })
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating data:', error);
  } else {
    console.log('Updated tasks:', data);
  }

  return data;
};

export const registrUser = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/`,
    },
  });

  if (error) throw error;

  return data;
};

export const signInWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
};
