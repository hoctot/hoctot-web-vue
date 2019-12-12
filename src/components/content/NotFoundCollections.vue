<template>
  <!-- Not found items -->
  <div class="w-full p-3">
    <div @click="goToEditorPage" class="mx-auto max-w-sm rounded overflow-hidden">
      <img class="w-full h-40 object-contain" src="/img/undraw/notfound.png" />
      <div class="px-6 py-4">
        <div class="font-bold text-lg text-center mb-2">Oh...</div>
        <p class="text-gray-700 text-sm text-center">
          Bạn chưa có dữ liệu.
        </p>
      </div>
    </div>
  </div>
  <!-- Not found items-->
</template>

<script>
// import { rn } from '@/constant'
export default {
  methods: {
    goToEditorPage() {
      // this.$router.push({ name: rn.collectionEditor })
    },
  },
}
</script>

<style scoped>
</style>
