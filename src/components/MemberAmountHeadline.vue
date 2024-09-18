<script setup>
const amount = defineProp('amount')
function memberString(memberAmount) {
  if (memberAmount === 1) {
    return 'member'
  }
  return 'members'
}
</script>

<template>
  <div class="content">
    <h2>You Have <b>{{ amount }}</b> team {{ memberString(amount) }}.</h2>
  </div>
  <hr class="3px solid #bbb; border-top:">
</template>
