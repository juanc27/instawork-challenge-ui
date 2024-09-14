<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

useRoute('/members/')

const route = useRoute()

const loading = ref(false)
const members = ref(null)
const error = ref(null)

// watch the params of the route to fetch the data again
watch(() => route.params.id, fetchData, { immediate: true })

async function fetchData() {
  error.value = members.value = null
  loading.value = true

  try {
    const response = await fetch(`/api/members/`)
    members.value = await response.json()
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
  <nav mt-6 inline-flex gap-2 text-xl>
    <button icon-btn @click="toggleDark()">
      <div i-carbon-add dark:i-carbon-add />
    </button>
  </nav>
  <h1>Team Members</h1>
  <div class="number_of_members">
    <div v-if="loading" class="loading">
      Loading...
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div v-if="members" class="content">
      <h2>You Have <b>{{ members.length }}</b> team members.</h2>
    </div>
    <hr class="border-top: 3px solid #bbb;">
  </div>

  <MemberItem
    v-for="item in members"
    :key="item.id"
    :first_name="item.first_name"
    :last_name="item.last_name"
    :email="item.email"
    :phone="item.phone"
    :role="item.role"
  />
</template>
