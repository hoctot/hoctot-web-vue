<template>
  <button
    :class="[isDisable ? 'bg-green-200 pointer-events-none' : 'bg-green-500']"
    class="select-none text-white hover:shadow-sm hover:bg-green-400 font-bold px-4 py-4 rounded appearance-none shadow"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['isDisable'],
}
</script>

<style scoped></style>
