<script setup>

</script>

<template>
    <div v-for="(todo, i) in items" :class="`todo-item ${todo.data.done && 'done'}`" :key="i">

        <label>
            <input type="checkbox" v-model="todo.data.done" />
            <span :class="`bubble ${todo.data.category}`"></span>
        </label>

        <div class="todo-content">
            <input type="text" v-model="todo.data.content" />
        </div>

        <div class="actions">
            <button class="delete" @click="handleRemove(todo)">Delete</button>
        </div>

    </div>
</template>

<script>
    export default {
        name: "List",
        props: {
            items: {
                type: Array,
                required: true
            }
        },
        methods: {
            handleRemove(index){
                this.$emit('remove-todo', index)
            }
        }
    }
</script>