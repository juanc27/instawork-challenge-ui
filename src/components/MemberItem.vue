<script setup lang="ts">
import { defineProps } from 'vue'
import type { Member } from '../types/Member'

const props = defineProps<Member>()
</script>

<template>
  <a :href="props.id ? `/${props.id}` : '#'">
    <div>
      <p>Name: {{ props.first_name }} {{ props.last_name }} <span v-if="role === 'admin'">(admin)</span></p>
      <p>Email: {{ props.email }}</p>
      <p>Phone: {{ props.phone }}</p>
      <hr class="3px solid #bbb; border-top:"><hr>
    </div>
  </a>
</template>
