import api from '../utils/axios';

import { ref } from 'vue'
import type { Task } from '../utils/types';

export const useSubmitTask = () => {
  const state = ref<'loading' | 'failed' | 'loaded'>('loading');
  const tasks = ref<Task[]>([]);   
  
  /**
   * Mission two: Insert a task into the database.
   * 
   * Write and return a function here which will submit
   * a JSON object to the server to be inserted into the
   * database. Make sure that the response
   * from the server is then placed into the tasks list.
   * 
   * Definition of done:
   * [ ] the function sends a post request to the server
   * [ ] the server inserts the task into the database
   * [ ] the newly inserted task is placed into the tasks list
   * 
   * Your submission will be judged out of 10 points based on
   * the following criteria:
   * 
   * - Works as expected - 5 points
   * - Code quality - 5 points
   *   - Is the code clean and easy to read?
   *   - Are there any obvious bugs?
   *   - Are there any obvious performance issues?
   *   - Are there comments where necessary?
   */

  const submitTask = async (task: Task) => {
    try {
      state.value = 'loading'
      if(task.tasksId) {
        // If the task has an ID, it means it's an existing task that needs to be updated
        const response = await api.put(`/tasks/${task.tasksId}`, task);
        console.log('Task updated successfully:', response.data);
      } else {
        // If the task doesn't have an ID, it's a new task that needs to be added
        const response = await api.post('/addTask', task);
        console.log('New task added successfully:', response.data);
        location.reload()
        state.value = 'loaded';
      }    
     
    } catch(error) {
      console.error(error);
      state.value = 'failed';
    };
    
   };
    
  return  { submitTask, tasks, state };

  
};
export default useSubmitTask
