<template>
  <div class="px-2 container">
    <div id="editor-container" class="editor"></div>
  </div>
</template>

<script>
import * as Quill from 'quill/dist/quill'
import 'quill/dist/quill.snow.css'

export default {
  data() {
    return {
      question: null,
    }
  },
  mounted() {
    const quill = new Quill('#editor-container', {
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block'],
        ],
      },
      placeholder: 'Compose an epic...',
      theme: 'snow',
    })
    console.log(quill)
  },
}
</script>

<style scoped>
.editor {
  min-height: 20rem;
}
</style>
