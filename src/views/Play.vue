<template>
  <div class="container mx-auto mb-10 mt-2">
    <!-- List Account -->
    <div class="list-account mt-5 mb-5">
      <div class="overflow-auto whitespace-no-wrap text-center">
        <div
          v-for="(item) in roomListUser"
          :key="item.id"
          :class="{'border-green-500': (user && (user.uid === item.uid)) == 0}"
          class="inline-block border-b-2 border-white pb-2 mx-2"
        >
          <img
            onmousedown="return false"
            class="mx-auto rounded-full bg-gray-500 h-10 w-10 flex items-center justify-center"
            :src="item.photoURL"
          />
          <p>{{item.displayName}}</p>
        </div>
      </div>
    </div>
    <!-- List Account -->

    <div class="mb-2">
      <div class="container mx-auto flex justify-center px-2">
        <div class="text-center">
          <p class="text-sm">
            <span>
              <img
                width="22"
                class="inline-block"
                src="https://image.flaticon.com/icons/svg/148/148767.svg"
                title="Câu hỏi đúng"
              />
              Đúng 0/10
            </span>
          </p>
        </div>
      </div>
    </div>

    <!-- Game play -->
    <div v-if="listPlayQuestion && listPlayQuestion.length">
      <div class="mb-5 p-2">
        <h4>Câu hỏi:</h4>
        <div v-html="listPlayQuestion[0].question"></div>
      </div>
      <div class="p-2">
        <h4>Gợi ý:</h4>
        <div v-html="listPlayQuestion[0].hint"></div>
      </div>
      <div class="mt-10 text-center">
        <textarea
          v-model="answer"
          placeholder="nhập câu trả lời..."
          class="shadow appearance-none border rounded py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          type="text"
          ref="answerInput"
        />
        <br />
        <BaseButton class="mb-4" @click.native="sentAnswer" :isDisable="!answer">Gửi đáp án</BaseButton>
      </div>
      <pre>
        {{ listPlayQuestion[0] }}
      </pre>
      <div class="pb-10">
        <img class="mx-auto" src="/img/undraw/transfer.png" width="300" />
      </div>
    </div>
    <div v-else>
      <Loading></Loading>
    </div>
    <!-- Game play -->
  </div>
</template>

<script>
import { storeState, routerName, storeGetter, storeActions } from '@/constant'
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      answer: '',
      storeActions: storeActions,
      users: new Array(2).fill({
        name: 'user',
        isActive: false,
      }),
    }
  },
  computed: {
    ...mapState([
      storeState.listRoom,
      storeState.user,
      storeState.listPlayQuestion,
    ]),
    ...mapGetters([storeGetter.roomListUser]),
  },
  methods: {
    sentAnswer() {
      // this.$refs.answerInput.focus()
      const question = this.listPlayQuestion[0]
      if (this.answer === question.answer) {
        alert('Đúng')
      }
      this.answer = ''
      window.scrollTo(0, 0)
    },
    exit() {
      const isExit = confirm('Bạn có muốn thoát khỏi thi đấu?')
      if (isExit) {
        this.$router.push({ name: routerName.home })
      }
    },
  },
  mounted() {
    window.scrollTo(0, 0)
  },
}
</script>

<style lang="scss" scoped>
.list-account {
  user-select: none;

  ::-webkit-scrollbar {
    background-color: white;
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background-color: white;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #babac0;
    border-radius: 16px;
    border: 4px solid #fff;

    &:hover {
      background-color: grey;
    }
  }
  ::-webkit-scrollbar-button {
    display: none;
  }
}
.info-play {
  position: fixed;
  top: 0;
  left: 0;
  padding: 1rem;
  width: 100%;
  z-index: 1;
  background: white;
  min-height: 4rem;
  margin-top: 0.5rem;
}
</style>
