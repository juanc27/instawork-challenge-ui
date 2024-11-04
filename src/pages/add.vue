<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Member } from '../types/Member'

useRoute('/add')
const router = useRouter()

const loading = ref<boolean>(false)
const member = ref<Member | null>(null)
member.value = {
  id: 0,
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  role: 'regular',
}
const error = ref<string | null>(null)
const inputErrors = ref<Record<string, string[]> | null>(null)

async function addMember() {
  loading.value = true
  error.value = null
  inputErrors.value = null
  try {
    const response = await fetch(`/api/members/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(member.value) })
    if (!response.ok) {
      const errorMessage = await response.json()
      error.value = `Error: Bad Request - Check individual fields for errors`
      inputErrors.value = errorMessage
      return
    }
    router.push(`/`)
  }
  catch (err) {
    error.value = (err as Error).toString()
  }
  finally {
    loading.value = false
  }
}

function back() {
  router.push(`/`)
}
</script>

<template>
  <div class="member">
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <form v-if="member" @submit.prevent="addMember">
      <MemberInputs
        v-model:first-name="member.first_name"
        v-model:last-name="member.last_name"
        v-model:email="member.email"
        v-model:phone="member.phone"
        v-model:role="member.role"
        v-model:input-errors="inputErrors"
      />

      <br>
      <button type="button" class="text-md m-3 btn" @click="back">
        Back
      </button>
      <br>
      <button type="submit" class="text-md m-3 btn">
        Save
      </button>
    </form>
  </div>
</template>
