<template>
  <!-- Not found items -->
  <div class="w-full p-3" title="Bấm để tạo bộ câu hỏi mới">
    <router-link to="/editor">
      <div class="mx-auto max-w-sm rounded overflow-hidden">
        <img class="w-full h-40 object-contain" src="/img/undraw/notfound.png" />
        <div class="px-6 py-4">
          <div class="font-bold text-lg text-center mb-2">Oh...</div>
          <p class="text-gray-700 text-sm text-center">
            Bạn chưa có bộ câu hỏi nào cả.
            <br />hãy bấm để tạo bộ câu hỏi đầu tiên .
          </p>
        </div>
      </div>
    </router-link>
  </div>
  <!-- Not found items-->
</template>

<script>
export default {}
</script>

<style scoped>
</style>
