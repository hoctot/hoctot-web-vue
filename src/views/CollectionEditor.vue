<template>
  <div class="container px-8 mt-5 mx-auto">
    <!-- Two columns -->
    <div class="flex flex-wrap">
      <div class="w-full sm:w-3/5">
        <div>
          <p class="text-left mb-4">Tiêu đề bộ câu hỏi</p>
        </div>
        <div class="editor-wrap">
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            ref="editorTitle"
          />
        </div>

        <div>
          <p class="text-left mb-4">Giới thiệu</p>
        </div>
        <div class="editor-wrap">
          <textarea
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
          />
        </div>

        <div>
          <p class="text-left mb-4">URL ảnh</p>
        </div>
        <div class="editor-wrap">
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
          />
        </div>

        <div class="text-center">
          <button
            :class="[isEdit? ' ' : 'opacity-50 pointer-events-none shadow-none']"
            class="bg-green-500 shadow appearance-none border font-bold rounded py-4 px-8 text-white leading-tight focus:outline-none focus:shadow-outline"
          >Tạo bộ câu hỏi</button>
        </div>
      </div>

      <div class="w-full sm:w-2/5">
        <div class="mx-auto text-center pt-0">
          <img
            onmousedown="return false"
            class="mx-auto my-10 p-5"
            src="/img/undraw/collections.png"
            width="275"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    isEdit() {
      return false
    },
  },
  mounted() {
    window.scrollTo(0, 0)
    this.$refs.editorTitle.focus()
  },
}
</script>

<style>
.editor-wrap {
  margin-bottom: 2rem;
}
</style>
