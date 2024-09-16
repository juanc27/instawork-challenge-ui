<script setup>
defineProps(['id', 'firstName', 'lastName', 'email', 'phone', 'role'])
</script>

<template>
  <a :href="id">
    <div>
      <p>Name: {{ firstName }} {{ lastName }} <span v-if="role === 'admin'">(admin)</span></p>
      <p>Email: {{ email }}</p>
      <p>Phone: {{ phone }}</p>
      <hr class="3px solid #bbb; border-top:"><hr>
    </div>
  </a>
</template>
