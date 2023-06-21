<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { createData, readData, deleteData, updateData } from './firebase'

const todos = ref([])
const name = ref('')

const input_content = ref('')
const input_category = ref(null)

// Load data from database
const loadDatas = () => {

  // Call from firebase
  readData()
    .then((datas) => {
      // assign all datas from database to todos array
      todos.value = datas
    })
    .catch((e) => {
      console.error(e);
    })
}

// Compute sorting
const todo_asc = computed(() => todos.value.sort((a, b) => {
  return b.data.createdAt - a.data.createdAt
}))

// Add new list to database
const addTodo = () => {
  if (input_content.value.trim() === '' || input_category.value === null) {
    return
  }

  const content = input_content.value
  const category = input_category.value
  const status = false
  const time = new Date().getTime()

  // Insert new data to database
  createData(content, category, status, time)
  // Call load datas function to refresh array
  loadDatas()

  // Make this value below to empty
  input_content.value = ''
  input_category.value = ''
}

// Remove data
const removeTodo = todo => {
  // Filter data 
  todos.value = todos.value.filter(t => t !== todo)
  // Delete data from id
  deleteData(todo.id)
}

// Watch array changes
watch(todos, (newVal) => {
  newVal.forEach((todo, i) => {
    const { id, data } = todo
    updateData(id, data);
  })
}, { deep: true })

// Watch name changes
watch(name, (newVal) => {
	localStorage.setItem('name', newVal)
})

// Run some function when render the page
onMounted(() => {
  loadDatas()
  name.value = localStorage.getItem('name') || ''
})

</script>

<template>

  <main class="app">

    <section class="greeting">
      <h2 class="title">
        What's up, 
        <input 
          type="text" 
          id="name" 
          placeholder="Name here" 
          v-model="name" 
        />
      </h2>
    </section>

    <section class="create-todo">
      <h3>Create ToDo</h3>

      <form @submit.prevent="addTodo">
        <h4>What's on your todo list?</h4>  
        <input 
          type="text" 
          placeholder="e.g make a video" 
          v-model="input_content" 
        />
        
        <h4 @click="readData">Pick a category</h4>
        
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

    </section>

    <section class="todo-list">
      <h3>Todo List</h3>
      <div class="list">
        <div v-for="(todo, i) in todo_asc" :class="`todo-item ${todo.data.done && 'done'}`" :key="i">

            <label>
              <input type="checkbox" v-model="todo.data.done" />
              <span :class="`bubble ${todo.data.category}`"></span>
            </label>

            <div class="todo-content">
              <input type="text" v-model="todo.data.content" />
            </div>

            <div class="actions">
              <button class="delete" @click="removeTodo(todo)">Delete</button>
            </div>

        </div>
      </div>
    </section>

  </main>

</template>


