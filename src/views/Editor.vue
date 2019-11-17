<template>
  <div class="container px-8 my-5 mx-auto">
    <!-- Two columns -->
    <div class="flex flex-wrap">
      <div class="w-full sm:w-3/5">
        <div>
          <p class="text-left">Câu hỏi</p>
        </div>
        <div class="editor-wrap">
          <div id="editor-question" class="editor-input"></div>
        </div>

        <div>
          <p class="text-left">Đáp án</p>
        </div>
        <div class="editor-wrap">
          <div id="editor-answer" class="editor-input"></div>
        </div>

        <div>
          <p class="text-left">Gợi ý</p>
        </div>
        <div class="editor-wrap">
          <div id="editor-hint" class="editor-input"></div>
        </div>

        <div>
          <div class="my-5 ">
            <span
              class="tag-title bg-gray-300 rounded-full px-3 py-2 text-sm font-semibold text-gray-700"
            >#Lccnte temporecd!</span>
          </div>
        </div>
      </div>

      <div class="w-full sm:w-2/5">
        <div class="mx-auto text-center">
          <button
            :class="[isEdit? ' ' : 'opacity-50 pointer-events-none shadow-none']"
            class="bg-green-500 shadow appearance-none border font-bold rounded py-4 px-8 text-white leading-tight focus:outline-none focus:shadow-outline"
          >Tạo câu hỏi</button>

          <img
            onmousedown="return false"
            class="mx-auto mt-5 p-5"
            :src="isEdit ? '/img/undraw/add.png' : '/img/undraw/no_data.png'"
            width="275"
          />
        </div>
      </div>
    </div>

    <!-- <div v-if="!isPreview">
      <div class="text-center">
        <button class="bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white">Tạo câu hỏi</button>
      </div>

      <div class="preview ql-snow">
        <div class="my-5">
          <h1 class="title text-center">Xem trước</h1>
        </div>
        <br />

        <div v-if="questionHTML">
          <div>
            <h1 class="title is-5">Câu hỏi:</h1>
            <div class="ql-editor" v-html="questionHTML"></div>
          </div>
          <br />
          <hr />
        </div>

        <div v-if="answerHTML">
          <div>
            <h1 class="title is-5">Câu trả lời:</h1>
            <div v-html="answerHTML"></div>
          </div>
          <br />
          <hr />
        </div>

        <div v-if="hintHTML">
          <div>
            <h1 class="title is-5">Gợi ý:</h1>
            <div v-html="hintHTML"></div>
          </div>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
import * as Quill from 'quill/dist/quill'
import 'quill/dist/quill.snow.css'

export default {
  data() {
    return {
      questionEditor: null,
      answerEditor: null,
      hintEditor: null,
      // Other
      questionHTML: '',
      questionText: '',
      answerHTML: '',
      answerText: '',
      hintHTML: '',
      hintText: '',
      // Other
      isPreview: false,
      activeStep: 0,
      isAnimated: true,
      hasNavigation: !true,
      customNavigation: false,
      prevIcon: 'chevron-left',
      nextIcon: 'chevron-right',
      isStepsClickable: true,
      isProfileSuccess: false,
    }
  },
  computed: {
    isEdit() {
      const result = Boolean(
        this.questionText && this.answerText && this.hintText,
      )
      return result
    },
  },
  mounted() {
    window.scrollTo(0, 0)

    var toolbarOptions = [
      [
        { header: [1, 2, 3, 4, 5, 6, false] },
        'color',
        'background',
        'bold',
        'italic',
        'underline',
        'strike',
        'align',
        'blockquote',
        { list: 'ordered' },
        { list: 'bullet' },
        { script: 'sub' },
        { script: 'super' },
        'image',
      ],
    ]

    const listEditor = ['questionEditor', 'answerEditor', 'hintEditor']

    this.questionEditor = new Quill('#editor-question', {
      placeholder: 'Nhập câu hỏi...',
      theme: 'snow',
      modules: {
        toolbar: toolbarOptions,
      },
    })

    this.answerEditor = new Quill('#editor-answer', {
      placeholder: 'Nhập đáp án...',
      theme: 'snow',
      modules: {
        toolbar: toolbarOptions,
      },
    })

    this.hintEditor = new Quill('#editor-hint', {
      placeholder: 'Nhập gợi ý...',
      theme: 'snow',
      modules: {
        toolbar: toolbarOptions,
      },
    })

    listEditor.forEach(v => {
      try {
        const typeEditor = v.split('Editor')[0]
        this[v].on('text-change', (delta, oldDelta, source) => {
          this[typeEditor + 'HTML'] = String(this[v].root.innerHTML).normalize()
          this[typeEditor + 'Text'] = String(this[v].getText()).trim()
        })
      } catch (e) {
        console.error('List Editor error:', e)
      }
    })

    this.questionEditor.focus()
  },
}
</script>

<style lang="scss" scoped>
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
}

.preview {
  font-size: initial !important;
}

.tag-title {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
