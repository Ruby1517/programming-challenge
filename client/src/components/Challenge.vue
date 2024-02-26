<template>
  <div class="challenge">
    <div class="wrapper">
      <h1>To Do List</h1>
      <p v-if="state === 'loading'">Loading...</p>
      <p v-else-if="state === 'failed'">Error fetching data</p>
      <div 
        v-else-if="state === 'loaded'"  
        class="items"
      >
        <TaskDisplay
          v-for="task in tasks"
          :key="task.tasksId"
          :task="task"
          @updateTaskStatus="handleTaskStatusUpdate"
        />

        <!-- Mission one is inside the task input! -->
        <TaskInput @submit="handleAddTask"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TaskDisplay from './TaskDisplay.vue';
import TaskInput from './TaskInput.vue';

/* composables */
import { useGetTasks } from '@/composables/useGetTasks';
import { useSubmitTask } from '../composables/useSubmitTask';

const { tasks, state } = useGetTasks();
const { submitTask } = useSubmitTask();

const handleTaskStatusUpdate = (updatedTask) => {
  // Assuming tasks are reactive and updating the tasks array directly
  const index = tasks.value.findIndex(task => task.tasksId === updatedTask.tasksId);
  if (index !== -1) {
    tasks.value[index] = updatedTask;
    submitTask(updatedTask); // Call the method to submit the updated task to the database
  }
};


const handleAddTask = (task) => {
  tasks.value.push(task);
};
</script>

<style lang="scss">
.challenge {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;  

  .wrapper {
    width: 350px;
    background-color: var(--color-input-background-extra-light);
    margin: var(--space-2) var(--space-3);
    h1 {
      padding: 0px 20px;
      color: var(--color-heading);
      font-weight: 800;
      font-size: var(--fs-5);
    }
    
    .items {
      padding-top: var(--space-3);
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }
  }
}
</style>
