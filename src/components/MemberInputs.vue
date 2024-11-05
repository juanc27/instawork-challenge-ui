<script setup lang="ts">
import { defineModel } from 'vue'
import type { InputErrors } from '~/types/InputErrors'

const firstName = defineModel<string>('firstName')
const lastName = defineModel<string>('lastName')
const email = defineModel<string>('email')
const phone = defineModel<string>('phone')
const role = defineModel<string>('role')
const inputErrors = defineModel<InputErrors | null>('inputErrors')

function checkErrors(key: keyof InputErrors): boolean {
  if (inputErrors.value && inputErrors.value[key]) {
    return true
  }
  return false
}

function getErrorMessage(key: keyof InputErrors): string {
  return inputErrors?.value?.[key]?.[0] || ''
}
</script>

<template>
  <h2>Info:</h2>
  <br>
  <input v-model="firstName" type="text" placeholder="First Name" min="1" max="255" :class="{ error: checkErrors('first_name') }">
  <div v-if="checkErrors('first_name')">
    {{ getErrorMessage('first_name') }}
  </div>
  <br>
  <input v-model="lastName" type="text" placeholder="Last Name" min="1" max="255" :class="{ error: checkErrors('last_name') }">
  <div v-if="checkErrors('last_name')">
    {{ getErrorMessage('last_name') }}
  </div>
  <br>
  <input v-model="email" type="text" placeholder="Email" min="1" max="255" :class="{ error: checkErrors('email') }">
  <div v-if="checkErrors('email')">
    {{ getErrorMessage('email') }}
  </div>
  <br>
  <input v-model="phone" type="text" placeholder="Phone" min="1" max="12" :class="{ error: checkErrors('phone') }">
  <div v-if="checkErrors('phone')">
    {{ getErrorMessage('phone') }}
  </div>
  <br>
  <h2>Role:</h2>
  <br>
  <label for="regular">Regular - Can't delete members</label>
  <input id="regular" v-model="role" type="radio" value="regular">
  <br>
  <label for="admin">Admin - Can delete members</label>
  <input id="admin" v-model="role" type="radio" value="admin">
</template>
