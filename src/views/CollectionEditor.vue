<template>
  <div class="container px-8 mt-5 mx-auto">
    <!-- Two columns -->
    <form id="form" @submit.prevent="onSubmit">
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
              minlength="1"
              maxlength="250"
              required
              name="title"
            />
            <div
              v-if="isSupportSpeech"
              :class="{isSpeak: speakType === 'title'}"
              @click="startRec('title')"
              class="editor-mic"
            >
              <img width="22" src="https://image.flaticon.com/icons/svg/107/107737.svg" />
            </div>
          </div>

          <div>
            <p class="text-left mb-4">Giới thiệu</p>
          </div>
          <div class="editor-wrap">
            <textarea
              v-model="desc"
              minlength="1"
              maxlength="250"
              rows="8"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              ref="descEditor"
              name="desc"
            />
            <div
              v-if="isSupportSpeech"
              :class="{isSpeak: speakType === 'desc'}"
              @click="startRec('desc')"
              class="editor-mic"
            >
              <img width="22" src="https://image.flaticon.com/icons/svg/107/107737.svg" />
            </div>
          </div>

          <div class="text-center">
            <button
              :class="[
              isEdit ? ' ' : 'opacity-50 pointer-events-none shadow-none',
            ]"
              class="bg-green-500 shadow appearance-none border font-bold rounded py-4 px-8 text-white leading-tight focus:outline-none focus:shadow-outline"
              v-text="isEditMode? 'Cập nhật': 'Tạo bộ câu hỏi'"
            ></button>
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
    </form>
  </div>
</template>

<script>
import { db } from '@/firebaseConfig'
import { storeMutations } from '@/constant'
import sample from 'lodash/sample'
export default {
  data() {
    return {
      title: '',
      desc: '',
      imgUrl: '',
      // Other
      isEditMode: false,
      docId: '',
      recognitionInput: null,
      isSpeak: false,
      speakType: '',
      isSupportSpeech: false,
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.docId = this.$route.params.id
    this.isEditMode = Boolean(this.docId)
    if (this.isEditMode) {
      db.collection('collections')
        .doc(this.docId)
        .get()
        .then(doc => {
          if (doc.exists) {
            const data = doc.data()
            const { title, desc, imgUrl } = data
            console.log('Document data:', data)
            this.title = title
            this.desc = desc
            this.imgUrl = String(imgUrl).replace(title, '')
          } else {
            console.log('No such document!')
          }
        })
    }

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
        recognition.stop()
      }

      recognition.onresult = event => {
        try {
          const last = event.results.length - 1
          console.log('TCL: mounted -> event.results', event.results)
          const result = event.results[last][0].transcript
          this[this.speakType] = result
          console.log('TCL: mounted -> result', result, this.speakType)
          this.speakType = ''
        } catch (error) {
          console.error(error)
        }
      }

      recognition.onerror = e => {
        console.error(e)
        this.isSpeak = false
        recognition.stop()
      }

      this.recognitionInput = recognition
    }
  },
  beforeDestroy() {
    this.recognitionInput.stop()
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
    onSubmit(e) {
      console.log('Submit form')
      this.$store.commit(storeMutations.SET_LOADING, true)

      if (this.isEditMode) {
        db.collection('collections')
          .doc(this.docId)
          .set(
            {
              title: this.title,
              desc: this.desc,
              imgUrl: this.imgUrl + this.title,
            },
            { merge: true },
          )
          .then(data => {
            console.log('xong', data)
            this.title = ''
            this.desc = ''
            this.imgUrl = ''
            this.$router.push('/collections')
          })
          .catch(e => {
            console.error(e)
          })
          .finally(() => {
            this.$store.commit(storeMutations.SET_LOADING, false)
          })
        return
      }

      const color = sample([
        '3f51b5',
        '673ab7',
        'e91e63',
        'ffc107',
        '03a9f4',
        '00bcd4',
        '009688',
        '795548',
        '607d8b',
        'f44336',
        'ffc107',
      ])
      db.collection('collections')
        .add({
          title: this.title,
          desc: this.desc,
          imgUrl: `https://dummyimage.com/1024x680/${color}/fff.jpg&text=${
            this.title
          }`,
        })
        .then(data => {
          console.log('xong', data)
          this.title = ''
          this.desc = ''
          this.imgUrl = ''
          this.$router.push('/collections')
        })
        .catch(e => {
          console.error(e)
        })
        .finally(() => {
          this.$store.commit(storeMutations.SET_LOADING, false)
        })
    },
  },
  computed: {
    isEdit() {
      return Boolean(this.title && this.desc)
    },
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
  top: 0;
  cursor: pointer;
  background: #fff;
  border-radius: 50%;
  border-bottom: 0.15rem dashed #fff;
  transition: all ease 0.25s;
  margin-top: 0.25rem;
  opacity: 0.75;
}
.editor-mic:active {
  transform: scale(0.75);
}

.editor-mic.isSpeak {
  /* pointer-events: none; */
  border-radius: 0%;
  border-bottom: 0.15rem dashed #38d39f;
}
</style>
