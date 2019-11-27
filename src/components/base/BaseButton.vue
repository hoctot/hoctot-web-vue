<template>
  <button
    :class="[isDisable ? 'bg-green-200 pointer-events-none': 'bg-green-500']"
    class="select-none text-white hover:shadow-xl font-bold mx-4 px-2 py-4 rounded appearance-none shadow"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['isDisable'],
}
</script>

<style scoped>
</style>
