import api from '../utils/axios';
import { ref } from 'vue'
import type { Task } from '../utils/types';


export const useUpdateTask =() => {
        const tasks = ref<Task[]>([]);

    const updateTask = async(task: Task) => {    
    try {      
      return await api.put<Task[]>('/tasks/{taskId}', { taskId: tasks.tasksId, isComplete: tasks.isComplete })
              
      
    } catch(error) {
      console.error('Error updating task:', error);
    }
  };
    
  return { updateTask, tasks, state}
};

export default useUpdateTask