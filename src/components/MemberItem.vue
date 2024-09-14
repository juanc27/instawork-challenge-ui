<script setup>
defineProps(['firstName', 'lastName', 'email', 'phone', 'role'])
</script>

<template>
  <div>
    <h2>Name: {{ firstName }} {{ lastName }} <span v-if="role === 'admin'">(admin)</span></h2>
    <h2>Email: {{ email }}</h2>
    <h2>Phone: {{ phone }}</h2>
    <hr class="3px solid #bbb; border-top:"><hr>
  </div>
</template>
