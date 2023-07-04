<script setup>

import { ref } from 'vue';

const emit = defineEmits(['add-todo'])

const input_content = ref('')
const input_category = ref(null);

function handleAdd() {
      emit('add-todo', input_content, input_category);
  }

</script>

<template>
    <form @submit.prevent="handleAdd">
        <h4>What's on your todo list?</h4>  
        <input 
          type="text" 
          placeholder="e.g make a video" 
          v-model="input_content" 
        />
        
        <h4>Pick a category</h4>
        
        <div class="options">

          <label>
            <input 
              type="radio" 
              name="category" 
              value="business"
              v-model="input_category"
            /> 
            <span class="bubble business"></span>
            <div>Business</div>
          </label>
          
          <label>
            <input 
              type="radio" 
              name="category" 
              value="personal"
              v-model="input_category"
            /> 
            <span class="bubble personal"></span>
            <div>Personal</div>
          </label>

          </div>

          <input
            type="submit" 
          />

    </form>
</template>

<script>
export default {
    name: "FormVue"
}
</script>