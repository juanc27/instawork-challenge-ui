<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Member } from '../types/Member'
import type { RouteParams } from '../types/RouteParams'

const route = useRoute() as { params: RouteParams }
const router = useRouter()

const loading = ref<boolean>(false)
const members = ref<Member[] | null>(null)
const error = ref<string | null>(null)

// watch the params of the route to fetch the data again
watch(() => route.params.id, fetchData, { immediate: true })

async function fetchData() {
  error.value = null
  members.value = null
  loading.value = true

  try {
    const response = await fetch(`/api/members/`)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    members.value = await response.json() as Member[]
  }
  catch (err) {
    error.value = (err as Error).toString()
  }
  finally {
    loading.value = false
  }
}

function navigateToAdd() {
  router.push(`/add`)
}
</script>

<template>
  <nav mt-6 inline-flex gap-2 text-xl>
    <button icon-btn @click="navigateToAdd()">
      <div i-carbon-add dark:i-carbon-add style="font-size: 30px;" />
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
    <MemberAmountHeadline v-if="members" :amount="members.length" />
    <hr class="3px solid #bbb; border-top:">
  </div>

  <MemberItem
    v-for="item in members"
    :id="item.id"
    :key="item.id"
    :first-name="item.first_name"
    :last-name="item.last_name"
    :email="item.email"
    :phone="item.phone"
    :role="item.role"
  />
</template>
