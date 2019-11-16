<template>
  <div class="container mx-auto">
    <div class="container mx-auto flex flex-wrap px-1">
      <div class="w-full sm:w-9/12 md:w-9/12 px-2 mb-5">
        <input
          class="search-collection w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="🔍 Tìm kiếm ..."
        />
      </div>

      <div class="w-full sm:w-3/12 md:w-3/12 text-center">
        <router-link to="/profile">
          <button
            class="hover:shadow-xl shadow appearance-none border font-bold rounded py-2 px-8 bg-green-500 text-white leading-tight focus:outline-none focus:shadow-outline"
          >Tài khoản</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
