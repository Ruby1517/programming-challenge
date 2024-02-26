<template>
  <div class="task-display">
    <!--
      Mission Two: Add ability to check and uncheck tasks

      Display the tasks according to the design in the README.md file.

      Definition of done:
      [ ] A checkbox is visible to the left of the task
      [ ] Clicking a checked task will uncheck it
      [ ] Clicking an unchecked task will check it
      [ ] All task changes are persisted to the database

      Your submission will be judged out of ten points based
      on the following criteria:

      Design fidelity - 5 points total
        - Is the spacing correct? (e.g. padding, margin) - 2 points
        - Is there good interaction feedback? (e.g. hover, focus, active states) - 3 points
      Code quality - 5 points
        - Are concerns clearly separated? (e.g. clear responsibilities for functions, etc.) - 3 point
        - Is the code easy to read and understand? - 2 points
    -->

    <input type="checkbox" v-model="isChecked" @click="completeTask" >
    <span :class="{ 'completed-task': isChecked }">{{ task.content }}</span>    
  </div>
</template>

<script setup lang="ts">
import type { Task } from '../utils/types';
import { ref, reactive } from 'vue';

const emit = defineEmits()
 
const isChecked = ref<boolean>(false)

// Define a prop to accept the task data from the parent component
const props = defineProps<{
  task: Task;
}>();

// Initialize the checked state based on the initial value of isComplete in the task object
isChecked.value = props.task.isComplete;

const completeTask = () => {
  isChecked.value = !isChecked.value;   
  
}





</script>

<style scoped lang="scss">
.task-display {
  color: var(--color-heading);
  font-size: var(--fs-3);
  font-weight: 500;
  box-shadow: var(--box-shadow-1);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--border-radius-1);
  margin: var(--space-2) var(--space-3);
}
.task-display input[type="checkbox"] {
  margin-right: 10px;
}

</style>
