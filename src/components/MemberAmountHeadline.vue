<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{ amount: number }>()
function memberString(memberAmount: number): string {
  return memberAmount === 1 ? 'member' : 'members'
}
</script>

<template>
  <div class="content">
    <h2>You Have <b>{{ props.amount }}</b> team {{ memberString(props.amount) }}.</h2>
  </div>
  <hr class="3px solid #bbb; border-top:">
</template>
