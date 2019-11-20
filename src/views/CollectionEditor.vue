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
            v-model="title"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            ref="titleEditor"
          />
          <div
            v-if="isSupportSpeech"
            :class="{isSpeak: speakType === 'title'}"
            @click="startRec('title')"
            class="editor-mic"
          >
            <img width="24" src="https://image.flaticon.com/icons/svg/107/107737.svg" />
          </div>
        </div>

        <div>
          <p class="text-left mb-4">Giới thiệu</p>
        </div>
        <div class="editor-wrap">
          <textarea
            v-model="desc"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            ref="descEditor"
          />
          <div
            v-if="isSupportSpeech"
            :class="{isSpeak: speakType === 'desc'}"
            @click="startRec('desc')"
            class="editor-mic"
          >
            <img width="24" src="https://image.flaticon.com/icons/svg/107/107737.svg" />
          </div>
        </div>

        <div>
          <p class="text-left mb-4">URL ảnh (Tuỳ chọn)</p>
        </div>
        <div class="editor-wrap">
          <input
            v-model="imgUrl"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
          />
        </div>

        <div class="text-center">
          <button
            :class="[
              isEdit ? ' ' : 'opacity-50 pointer-events-none shadow-none',
            ]"
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
    return {
      title: '',
      desc: '',
      imgUrl: '',
      // Other
      recognitionInput: null,
      isSpeak: false,
      speakType: '',
      isSupportSpeech: false,
    }
  },
  methods: {
    startRec(type) {
      this.recognitionInput.stop()
      this.isSpeak = false
      this.speakType = ''
      console.log('Stop')

      setTimeout(() => {
        console.log('Start')
        this.isSpeak = true
        this.speakType = type
        this.recognitionInput.start()
        const typeEditor = type + 'Editor'
        this.$refs[typeEditor].focus()
      }, 300)
    },
  },
  computed: {
    isEdit() {
      return Boolean(this.title && this.desc)
    },
  },
  mounted() {
    window.scrollTo(0, 0)
    this.$refs.titleEditor.focus()
    /* eslint-disable */
    const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
    const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
    const SpeechRecognitionEvent =
      SpeechRecognitionEvent || webkitSpeechRecognitionEvent
    const recognition = new SpeechRecognition()
    const speechRecognitionList = new SpeechGrammarList()

    this.isSupportSpeech = Boolean(recognition)

    if (this.isSupportSpeech) {
      recognition.lang = 'vi-VN'
      // recognition.start()
      recognition.onspeechend = () => {
        this.isSpeak = false
        this.speakType = ''

        recognition.stop()
      }

      recognition.onresult = event => {
        try {
          const last = event.results.length - 1
          const result = event.results[last][0].transcript
          this[this.speakType] = result
        } catch (error) {
          console.error(error)
        }
      }

      recognition.onerror = () => {
        console.log('Loi me no roi')
        this.isSpeak = false
        recognition.stop()
      }

      this.recognitionInput = recognition
    }
  },
}
</script>

<style scoped>
.editor-wrap {
  margin-bottom: 2rem;
  position: relative;
}
.editor-mic {
  position: absolute;
  right: 0.5rem;
  padding-bottom: 0.25rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
.editor-mic:active {
  transform: translateY(-50%) scale(0.75);
}

.editor-mic.isSpeak {
  /* pointer-events: none; */
  border-bottom: 0.2rem dashed #38d39f;
}
</style>
