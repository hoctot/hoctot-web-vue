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
              autocomplete="off"
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
              autocomplete="off"
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
              class="bg-green-500 hover:bg-green-400 shadow appearance-none border font-bold rounded py-4 px-8 text-white leading-tight focus:outline-none focus:shadow-outline"
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
import { mapState } from 'vuex'
import { db, serverTimestamp } from '@/firebaseConfig'
import {
  storeMutations,
  storeState,
  dataRef,
  dataSample,
  routerName,
} from '@/constant'
import sample from 'lodash/sample'
export default {
  data() {
    return {
      title: '',
      desc: '',
      imgUrl: '',
      idTimeoutRec: null,
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
      db.collection(`collections`)
        .doc(this.user.uid)
        .collection('data')
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
      recognition.onspeechend = () => {
        this.isSpeak = false
        recognition.stop()
      }

      recognition.onresult = event => {
        try {
          const last = event.results.length - 1
          const result = event.results[last][0].transcript
          this[this.speakType] += result + ' '
          console.log('TCL: mounted -> event.results', event.results)
          console.log(
            'TCL: mounted -> result',
            result,
            'speakType: ',
            this.speakType,
          )
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
    stopRecInput() {
      this.recognitionInput.stop()
      this.isSpeak = false
      this.speakType = ''
    },
    startRec(type) {
      if (this.isSpeak && type === this.speakType) {
        clearTimeout(this.idTimeoutRec)
        this.stopRecInput()
        return
      }
      this.stopRecInput()

      this.idTimeoutRec = setTimeout(() => {
        try {
          this.isSpeak = true
          this.speakType = type
          this.recognitionInput.start()
          const typeEditor = type + 'Editor'
          this.$refs[typeEditor].focus()
        } catch (error) {
          console.error(error)
        }
      }, 250)
    },
    resetData() {
      this.title = ''
      this.desc = ''
      this.imgUrl = ''
    },
    onSubmit(e) {
      console.log('Submit form')
      this.$store.commit(storeMutations.SET_LOADING, true)

      const docRef = db
        .collection(dataRef.collections.root)
        .doc(this.user.uid)
        .collection(dataRef.collections.data)

      if (this.isEditMode) {
        docRef
          .doc(this.docId)
          .set(
            {
              title: this.title.trim().normalize(),
              desc: this.desc.trim().normalize(),
              imgUrl: this.imgUrl + this.title,
              updatedAt: serverTimestamp(),
            },
            { merge: true },
          )
          .then(data => this.$router.push({ name: routerName.collections }))
          .finally(() => {
            this.$store.commit(storeMutations.SET_LOADING, false)
          })
        return
      }
      const color = sample(dataSample.listColor)

      docRef
        .add({
          title: this.title.trim().normalize(),
          desc: this.desc.trim().normalize(),
          imgUrl: `https://dummyimage.com/1024x680/${color}/fff.jpg&text=${
            this.title
          }`,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        })
        .then(data => this.$router.push({ name: routerName.collections }))
        .finally(() => {
          this.$store.commit(storeMutations.SET_LOADING, false)
        })
    },
  },
  computed: {
    isEdit() {
      return Boolean(this.title && this.desc)
    },
    ...mapState([storeState.user]),
  },
}
</script>

<style scoped>
</style>
