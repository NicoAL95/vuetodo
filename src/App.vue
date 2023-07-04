<script setup>

import Layout from './layout/Layout.vue';
import List from './components/List.vue';
import FormVue from './components/Form.vue';

import { ref, onMounted, computed, watch } from 'vue'
import { createData, readData, deleteData, updateData } from './firebase'

const todos = ref([])
const name = ref('')

// Load data from database
const loadDatas = async () => {
  // Call from firebase
  try {
    const datas = await readData();
    todos.value = datas;
  } catch (e) {
    console.log(e);
  }
};

// Compute sorting
const todo_asc = computed(() => todos.value.sort((a, b) => {
  return b.data.createdAt - a.data.createdAt
}));

// Add new list to database
const addTodo = async (content, category) => {
  if (content.value.trim() === '' || category.value === null) {
    return
  }

  const content_data = content.value
  const category_data = category.value
  const status = false
  const time = new Date().getTime()

  // Insert new data to database
  await createData(content_data, category_data, status, time)
  // Call load datas function to refresh array
  loadDatas()
};

// Remove data
const removeTodo = async todo => {
  // Filter data 
  // todos.value = todos.value.filter(t => t !== todo)

  // Delete data from id
  await deleteData(todo.id)
  loadDatas()
};

// Watch array changes
watch(todos, (newVal) => {
  newVal.forEach((todo, i) => {
    const { id, data } = todo
    updateData(id, data);
  })
}, { deep: true });

// Watch name changes
watch(name, (newVal) => {
	localStorage.setItem('name', newVal)
});

// Run some function when render the page
onMounted(async () => {
  await loadDatas()
  name.value = localStorage.getItem('name') || ''
});

</script>

<template>

  <Layout>
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

        <FormVue @add-todo="addTodo"/>

      </section>

      <section class="todo-list">
        <h3>Todo List</h3>
        <div class="list">
          <List :items="todo_asc" @remove-todo="removeTodo"/>
        </div>
      </section>

      </main>

  </Layout>

</template>