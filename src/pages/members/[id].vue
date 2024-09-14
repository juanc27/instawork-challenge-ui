<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

useRoute('/members/[id]')
const route = useRoute()

const loading = ref(false)
const member = ref(null)
const error = ref(null)

// watch the params of the route to fetch the data again
watch(() => route.params.id, fetchData, { immediate: true })

async function fetchData(id) {
  error.value = member.value = null
  loading.value = true

  try {
    const response = await fetch(`/api/members/${id}/`)
    member.value = await response.json()
  }
  catch (err) {
    error.value = err.toString()
  }
  finally {
    loading.value = false
  }
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

    <div v-if="member" class="content">
      <h2>First Name: {{ member.first_name }}</h2>
      <h2>Last Name: {{ member.last_name }}</h2>
      <h2>Email: {{ member.email }}</h2>
      <h2>Phone: {{ member.phone }}</h2>
      <h2>Role: {{ member.role }}</h2>
    </div>
  </div>
</template>
