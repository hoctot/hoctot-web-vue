<template>
  <div class="container mx-auto">
    <div class="container mx-auto flex flex-wrap px-1">
      <div class="w-full sm:w-9/12 md:w-9/12 px-2 mb-5">
        <input
          class="search-collection w-full shadow appearance-none border rounded py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="🔍 Tìm kiếm ..."
          v-model="search"
        />
      </div>

      <div class="w-full sm:w-3/12 md:w-3/12 text-center">
        <router-link to="/profile">
          <button
            class="hover:shadow-xl hover:bg-orange-400 hover:text-white shadow appearance-none border font-bold rounded py-3 px-8 bg-orange-500 text-white leading-tight focus:outline-none focus:shadow-outline"
          >Tài khoản</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { m } from '@/constant'
export default {
  computed: {
    search: {
      get() {
        return this.$store.state.search
      },
      set(value) {
        this.$store.commit(m.SET_SEARCH, value)
      },
    },
  },
}
</script>

<style scoped>
</style>
