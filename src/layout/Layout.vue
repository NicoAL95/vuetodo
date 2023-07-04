<script setup>
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';
</script>

<template>
<div class="container-fluid">
    <Navbar/>
        <slot></slot>
        
    <Footer/>
</div>
</template>

<script>
export default {
    name:"Layout"
}
</script>
