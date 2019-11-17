<template>
  <div>
    <div class="container mx-auto mt-5">
      <div class="text-center">
        <div>
          <img class="mx-auto" width="200" src="/img/undraw/avatar.png">
        </div>
        <h2>Thông tin tài khoản</h2>
      </div>
      <div class="text-center my-10">
        <button
          @click="logout"
          class="bg-orange-400 shadow hover:shadow-xl appearance-none border font-bold rounded py-2 px-8 text-white leading-tight focus:outline-none focus:shadow-outline"
        >Đăng xuất</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    logout() {
      this.$router.push('home')
    },
  },
}
</script>

<style scoped>
</style>
