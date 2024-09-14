<script setup>
const firstName = defineModel('firstName')
const lastName = defineModel('lastName')
const email = defineModel('email')
const phone = defineModel('phone')
const role = defineModel('role')
</script>

<template>
  <h2>Info:</h2>
  <br>
  <input v-model="firstName" type="text" placeholder="First Name" min="1" max="255">
  <br>
  <input v-model="lastName" type="text" placeholder="Last Name" min="1" max="255">
  <br>
  <input v-model="email" type="text" placeholder="Email" min="1" max="255">
  <br>
  <input v-model="phone" type="text" placeholder="Phone" min="1" max="12">
  <br>
  <h2>Role:</h2>
  <br>
  <label for="regular">Regular - Can't delete members</label>
  <input id="regular" v-model="role" type="radio" value="regular">
  <br>
  <label for="admin">Admin - Can delete members</label>
  <input id="admin" v-model="role" type="radio" value="admin">
</template>
