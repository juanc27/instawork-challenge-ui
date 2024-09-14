<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

useRoute('/members/add')
const router = useRouter()

const loading = ref(false)
const member = ref(null)
member.value = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  role: 'regular',
}
const error = ref(null)

async function addMember() {
  loading.value = true
  try {
    const response = await fetch(`/api/members/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(member.value) })
    member.value = await response.json()
  }
  catch (err) {
    error.value = err.toString()
  }
  finally {
    router.push(`/members/`)
  }
}

function back() {
  // Reset form data or perform other cancel actions
  router.push(`/members/`)
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
