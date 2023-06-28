<script setup>
import { ref } from 'vue';
const input_content = ref('')
const input_category = ref(null);
</script>

<template>
    <form @submit.prevent="handleAdd(input_content, input_category)">
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
    name: "FormVue",
    methods: {
      handleAdd(content, category) {
        this.$emit('add-todo', content, category);
        input_content.value = ''
        input_category.value = ''
    }
  }
}
</script>