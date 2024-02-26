<template>
  <div class="task-input">
      
     <form @submit.prevent="handleOnSubmit">
        <input type="text" placeholder="Add a new task" v-model="newTask.content">
        <button type="submit">ADD</button>
     </form>
    
    <!--
      Mission One: Add a task input

      Create a task input according to the design in the README.md file.

      Definition of done:
      [ ] User can type into the input
      [ ] A button with the text "Add" is visible
      [ ] User can click the button to submit the input
       
      Your submission will be judged out of ten points based
      on the following criteria:
      
      Design fidelity - 5 points total
        - Is the spacing correct? (e.g. padding, margin) - 2 points
        - Is there good interaction feedback? (e.g. hover, focus, active states) - 3 points
      Code quality - 5 points
        - Are concerns clearly separeted? (e.g. clear responsibilities for functions, etc.) - 3 point
        - Is the code easy to read and understand? - 2 points
    -->
    
  </div>
</template>

<script setup lang="ts">

import type { Task } from "../utils/types"
import { reactive, ref} from 'vue';

import useSubmitTask from '../composables/useSubmitTask'

const { submitTask } = useSubmitTask()
const newTask = reactive<Omit<Task, "tasksId">>({ content: ''})  

const resetForm = () => {
  newTask.content = ""
}


const handleOnSubmit = () => {
  // add new task
  if(newTask.content.trim() !== ""){
    submitTask(newTask);
    resetForm();
  }  
}

/**
 * Component design is up to you. You'll define the props,
 * events, and methods for the component here.
 * 
 * Good luck!
 */

</script>


<style scoped>
.task-input {
  display: flex;
  color: var(--color-heading);
  background-color: var(--color-border-light);
  font-size: var(--fs-3);
  font-weight: 500;
  border: 1px solid var(--color-border);
  box-shadow: var(--box-shadow-1);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--border-radius-1);
  margin: var(--space-2) var(--space-3);
}

.task-input input {
  flex: 1;
  border: none;  
  background-color: var(--color-border-light);
  padding: var(--space-1) var(--space-2);
  margin: var(--space-1) var(--space-2);
  cursor: pointer;
  
}

.task-input button {
  background-color: var(--color-background);
  color: var(--color-text);
  border: none;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--border-radius-1);
  font-size: var(--fs-3);
  font-weight: 700;
  cursor: pointer;
}

.task-input input[type="text"]:focus {
  outline: none;

}
.task-input button:hover {
  border: none;
  
}
</style>
  