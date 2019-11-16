<template>
  <div class="container px-8 mt-5 mx-auto">
    <!-- Two columns -->
    <div class="flex">
      <div class="w-3/5 pl-1">
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
          <input
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
            class=" bg-green-500 shadow appearance-none border font-bold rounded py-4 px-8 text-white leading-tight focus:outline-none focus:shadow-outline"
          >Tạo bộ câu hỏi</button>
        </div>
      </div>

      <div class="w-2/5">
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
    this.$refs.editorTitle.focus();
  },
}
</script>

<style lang="scss">
.editor-wrap {
  margin-bottom: 2rem;
  .ql-toolbar {
    opacity: 0;
    border: 0px solid white;
    padding-left: 0;
    // margin-top: 0.25rem;
  }
  .ql-toolbar.ql-snow + .ql-container.ql-snow {
    border: 0px solid white;
    border-bottom-width: 0.1rem;
    border-bottom-color: #eee;
    // border-radius: 0.5rem;
  }

  &:hover {
    .ql-toolbar {
      opacity: 1;
      border-bottom-color: white;
      // border-radius: 0.5rem;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      transition: 0.3s ease;
    }
    .ql-toolbar.ql-snow + .ql-container.ql-snow {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }
  .ql-editor {
    padding-left: 0;
    &::before {
      left: 0px;
    }
  }
  .editor-input {
    // min-height: 7rem;
  }
}

.preview {
  font-size: initial !important;
}
</style>
