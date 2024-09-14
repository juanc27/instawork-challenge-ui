<script setup>
  const props = defineProps(['first_name', 'last_name', 'email', 'phone', 'role'])
</script>

<template>
  <div>
    <h2>Name: {{ first_name }} {{ last_name }} <span v-if="role==='admin'">(admin)</span></h2>
    <h2>Email: {{ email }}</h2>
    <h2>Phone: {{ phone }}</h2>
    <hr class="border-top: 3px solid #bbb;"/>
  </div>
</template>
