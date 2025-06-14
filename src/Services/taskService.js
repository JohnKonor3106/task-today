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

  return data; // Возвращаем массив объектов
};

export const addTask = async taskData => {
  const { title, description, active } = taskData; // Разбираем объект
  const { data, error } = await supabase
    .from('tasks')
    .insert({ title, description, active, created_at: new Date() }) // id генерируется автоматически, если это первичный ключ
    .select();

  if (error) {
    console.error('Ошибка при добавлении задачи:', error.message);
    throw error;
  }

  return data; // Возвращаем вставленные данные
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
