<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

useRoute('/[id]')
const route = useRoute()
const router = useRouter()

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

async function updateMember() {
  loading.value = true
  error.value = null
  try {
    const response = await fetch(`/api/members/${member.value.id}/`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(member.value) })
    if (!response.ok) {
      const message = await response.text()
      error.value = `Errors: ${message}`
      return
    }
    member.value = await response.json()
  }
  catch (err) {
    error.value = err.toString()
  }
  finally {
    loading.value = false
  }
}

async function deleteMember() {
  if (confirm("Do you really want to delete this member?")) {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`/api/members/${member.value.id}/`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } })
      if (!response.ok) {
        const message = await response.text()
        error.value = `Errors: ${message}`
        return
      }
      router.push(`/`)
    }
    catch (err) {
      error.value = err.toString()
    }
    finally {
      loading.value = false
    }
  }
}

function back() {
  // Reset form data or perform other cancel actions
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

    <form v-if="member" @submit.prevent="updateMember">
      <MemberInputs
        v-model:first-name="member.first_name"
        v-model:last-name="member.last_name"
        v-model:email="member.email"
        v-model:phone="member.phone"
        v-model:role="member.role"
      />

      <br>
      <button type="button" class="text-md m-3 btn" @click="back">
        Back
      </button>
      <br>
      <button type="button" class="text-md m-3 btn" @click="deleteMember">
        Delete
      </button>
      <br>
      <button type="submit" class="text-md m-3 btn">
        Save
      </button>
    </form>
  </div>
</template>
