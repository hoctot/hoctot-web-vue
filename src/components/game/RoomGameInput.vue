<template>
  <div
    class="mt-2 mb-8"
    v-if="$STATE('room.listQuestion') && $STATE('room.listQuestion').length"
  >
    <h4 class="text-left mb-2"><u>Câu hỏi:</u></h4>
    <div class="pl-4">
      <div v-html="$STATE('room.listQuestion')[0].question"></div>
    </div>
    <h5 class="text-left mt-2 mb-2"><u>Gợi ý:</u></h5>
    <div class="pl-4">
      <div v-html="$STATE('room.listQuestion')[0].hint"></div>
    </div>

    <div class="text-center mt-4">
      <form v-on:submit.prevent="checkAnswer">
        <textarea
          appearance-none
          v-model="answer"
          class="border border-gray-500 rounded p-2 mb-2 leading-tight focus:outline-none focus:shadow-outline"
          name="answer"
          id="answer"
          cols="30"
          rows="2"
          placeholder="Nhập đáp án..."
          required
        ></textarea>
        <div>
          <button
            class="bg-green-500 hover:bg-green-400 hover:shadow px-8 py-4 rounded text-white "
            type="submit"
          >
            Gửi
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Noty from 'noty'
import { shuffle } from 'lodash'
import { m } from '../../constant'
export default {
  data() {
    return {
      answer: '',
    }
  },
  methods: {
    checkAnswer() {
      const data = this.$STATE('room.listQuestion')[0]
      if (
        String(this.answer).toLowerCase() === String(data.answer).toLowerCase()
      ) {
        this.$ACTION('room/$updateUserRoom', {
          roomId: this.$route.params.roomId,
          key: 'score',
          value: 1,
          fieldValue: 'increment',
        }).then(() => this.shufferQuestion(true))
      } else {
        this.$store.commit(m.SET_LOADING, true)
        setTimeout(() => {
          this.$store.commit(m.SET_LOADING, false)
          this.shufferQuestion(false)
        }, 300)
      }
    },
    shufferQuestion(isRight) {
      new Noty({
        type: isRight ? 'success' : 'error',
        layout: 'topCenter',
        text: isRight ? 'Đúng' : 'Sai',
        timeout: 1000,
      }).show()

      this.answer = ''
      this.$COMMIT('room/SET_STATE', {
        key: 'listQuestion',
        value: shuffle(this.$STATE('room.listQuestion')),
      })
    },
  },
}
</script>
