<template>
  <div class="container px-2 my-5 mx-auto">
    <!-- Two columns -->
    <div class="flex flex-wrap">
      <div class="w-full sm:w-8/12">
        <div>
          <p class="text-left">Câu hỏi</p>
        </div>
        <div class="editor-wrap">
          <div id="editor-question" class="editor-input"></div>

          <!-- <div
            @click="startRec('question')"
            :class="{isSpeak: speakType === 'question'}"
            class="editor-mic"
          >
            <img width="22" src="https://image.flaticon.com/icons/svg/107/107737.svg" />
          </div>-->
        </div>

        <div>
          <p class="text-left">Đáp án</p>
        </div>
        <div class="editor-wrap">
          <div id="editor-answer" class="editor-input"></div>

          <!-- <div
            @click="startRec('answer')"
            :class="{isSpeak: speakType === 'answer'}"
            class="editor-mic"
          >
            <img width="22" src="https://image.flaticon.com/icons/svg/107/107737.svg" />
          </div>-->
        </div>

        <div>
          <p class="text-left">Gợi ý</p>
        </div>
        <div class="editor-wrap">
          <div id="editor-hint" class="editor-input"></div>

          <!-- <div
            @click="startRec('hint')"
            :class="{isSpeak: speakType === 'hint'}"
            class="editor-mic"
          >
            <img width="22" src="https://image.flaticon.com/icons/svg/107/107737.svg" />
          </div>-->
        </div>
      </div>
      <div class="w-full sm:w-4/12">
        <div class="mx-auto text-center">
          <button
            @click="createQuestion"
            :class="[isEdit? ' ' : 'opacity-50 pointer-events-none shadow-none']"
            class="bg-green-500 hover:bg-green-400 shadow appearance-none border font-bold rounded py-4 px-8 text-white leading-tight focus:outline-none focus:shadow-outline"
            v-text="isEditMode ? 'Cập nhật' : 'Tạo câu hỏi'"
          ></button>

          <img
            onmousedown="return false"
            class="mx-auto mt-5 p-5"
            :src="isEdit ? '/img/undraw/add.png' : '/img/undraw/no_data.png'"
            width="275"
          />
          <div v-if="!isEditMode">
            <label for="checkBack" class="select-none">
              <input v-model="disableBack" type="checkbox" name="checkBack" id="checkBack" />
              <span class="text-base">
                Ở lại trang
                <br />khi tạo xong câu hỏi
              </span>
            </label>
          </div>
          <div>
            <div class="my-5 px-10 whitespace-normal">
              <p
                @click="back"
                :title="item.title"
                class="cursor-pointer tag-title hover:underline text-blue-500 px-3 py-2 text-sm font-semibold text-gray-700"
              >Trở về: {{item.title}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, serverTimestamp } from '@/firebaseConfig'
import * as Quill from 'quill/dist/quill'
import 'quill/dist/quill.snow.css'
import { ref, s, m, dataSample } from '@/constant'
import { mapState } from 'vuex'

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
      //
      isSupportSpeech: false,
      speakType: '',
      item: {},
      isEditMode: false,
      disableBack: false,
    }
  },
  computed: {
    ...mapState([s.user]),
    isEdit() {
      const result = Boolean(
        this.questionText && this.answerText && this.hintText,
      )
      return result
    },
  },
  methods: {
    back() {
      this.$router.back()
    },
    startRec(type) {},
    createQuestion() {
      this.$store.commit(m.SET_LOADING, true)

      const docRef = db
        .collection(ref.questions.root)
        .doc(this.user.uid)
        .collection(ref.questions.data)

      if (this.isEditMode) {
        // Update
        docRef
          .doc(this.$route.query.questionId)
          .set(
            {
              question: this.questionHTML,
              answer: this.answerText,
              hint: this.hintHTML,
              updatedAt: serverTimestamp(),
            },
            { merge: true },
          )
          .then(() => {
            this.resetFields()
            this.$router.back()
          })
          .finally(() => {
            this.$store.commit(m.SET_LOADING, false)
          })
      } else {
        // Create
        docRef
          .add({
            question: this.questionHTML,
            answer: this.answerText,
            hint: this.hintHTML,
            collectionId: this.$route.query.collectionId,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          })
          .then(() => {
            this.resetFields()
            if (!this.disableBack) {
              this.$router.back()
            }
          })
          .finally(() => {
            this.$store.commit(m.SET_LOADING, false)
          })
      }
    },
    resetFields() {
      this.questionHTML = ''
      this.questionText = ''
      this.answerHTML = ''
      this.answerText = ''
      this.hintHTML = ''
      this.hintText = ''

      this.questionEditor.setText('')
      this.answerEditor.setText('')
      this.hintEditor.setText('')
    },
  },
  beforeMount() {
    this.isEditMode = Boolean(this.$route.query.isEditMode)
    this.item = JSON.parse(this.$route.query.item) || {}
  },
  mounted() {
    console.log()
    window.scrollTo(0, 0)

    var toolbarOptions = [
      [
        { header: [1, 2, 3, 4, 5, 6, false] },
        { align: ['', 'center', 'right', 'justify'] },
        { color: dataSample.listColorHex },
        { background: dataSample.listColorHex },
        'bold',
        'italic',
        'underline',
        'strike',
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
        toolbar: [],
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

    if (this.isEditMode) {
      this.questionEditor.clipboard.dangerouslyPasteHTML(0, this.item.question)
      this.answerEditor.clipboard.dangerouslyPasteHTML(0, this.item.answer)
      this.hintEditor.clipboard.dangerouslyPasteHTML(0, this.item.hint)
    }
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

  &:hover,
  &:active {
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

.tag-title {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
