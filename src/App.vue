<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { createData, readData, deleteData, updateData } from './firebase'

const todos = ref([])
const name = ref('')

const input_content = ref('')
const input_category = ref(null)

const loadDatas = () => {
  readData()
    .then((datas) => {
      // todos refereces
      todos.value.push(...datas)
    })
    .catch((e) => {
      console.error(e);
    })
}

const todo_asc = computed(() => todos.value.sort((a, b) => {
  return b.data.createdAt - a.data.createdAt
}))

const addTodo = () => {
  if (input_content.value.trim() === '' || input_category.value === null) {
    return
  }

  const content = input_content.value
  const category = input_category.value
  const status = false
  const time = new Date().getTime()

  createData(content, category, status, time)
  pushArr()

  input_content.value = ''
  input_category.value = ''
}

// Add Latest element to DOM
const pushArr = () => {
  
  readData()
    .then((datas) => {
      todos.value.push(...datas)
      console.log("Ini todos: ", todos.value);
    })
    .catch((e) => {
      console.error(e);
    })
}

// Baca Data

// const addTodo = () => {
//   if (input_content.value.trim() === '' || input_category.value === null) {
//     return
//   }
  
//   todos.value.push({
//     content: input_content.value,
//     category: input_category.value,
//     done: false,
//     createdAt: new Date().getTime()
//   })

//   input_content.value = ''
//   input_category.value = ''
// }

const removeTodo = todo => {
  todos.value = todos.value.filter(t => t !== todo)
  deleteData(todo.id)
}

watch(todos, (newVal) => {
  newVal.forEach((todo, i) => {
    const { id, data } = todo
    updateData(id, data);
  })
}, { deep: true })

watch(name, (newVal) => {
	localStorage.setItem('name', newVal)
})


onMounted(() => {
  loadDatas()
  name.value = localStorage.getItem('name') || ''
  // todos.value = JSON.parse(localStorage.getItem('todos')) || []
})

const iseng = () => {
  console.log(todos.value.length);
}

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
      <h3
            @click="iseng">Todo List</h3>
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


