<script setup>
defineProps(['firstName', 'lastName', 'email', 'phone', 'role'])
</script>

<template>
  <div>
    <p>Name: {{ firstName }} {{ lastName }} <span v-if="role === 'admin'">(admin)</span></p>
    <p>Email: {{ email }}</p>
    <p>Phone: {{ phone }}</p>
    <hr class="3px solid #bbb; border-top:"><hr>
  </div>
</template>
