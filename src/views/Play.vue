<template>
  <div class="container mx-auto mb-10">
    <!-- List Account -->
    <div class="list-account mb-5">
      <div class="overflow-auto whitespace-no-wrap text-center">
        <div
          v-for="(item, index) in users"
          :key="item.id"
          :class="{'border-green-500': index == 0}"
          class="inline-block border-b-2 border-white pb-2 mx-2"
        >
          <img
            onmousedown="return false"
            class="rounded-full bg-gray-500 h-10 w-10 flex items-center justify-center"
            :src="`https://api.adorable.io/avatars/160/${index}@adorable.png`"
          />
        </div>
      </div>
    </div>
    <!-- List Account -->

    <div class="mb-2">
      <div class="container mx-auto flex justify-center px-2">
        <div class="text-center">
          <p class="text-sm">
            <img
              class="inline-block"
              width="22"
              src="https://image.flaticon.com/icons/svg/148/148933.svg"
              title="Thời gian"
            />
            <span>
              610s

              <img
                width="22"
                class="inline-block"
                src="https://image.flaticon.com/icons/svg/148/148767.svg"
                title="Câu hỏi đúng"
              />
              Đúng 1/10

              <img
                width="22"
                class="inline-block"
                src="https://image.flaticon.com/icons/svg/1153/1153111.svg"
                title="Thể loại"
              />
              Ôn tập
            </span>
          </p>
        </div>
      </div>
    </div>

    <!-- Game play -->
    <div>
      <div class="mb-5 p-2">
        <h4>Câu hỏi:</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo voluptates commodi saepe non nihil neque perferendis error earum sunt facilis officiis praesentium nobis, delectus illum illo similique iure? Iure, sunt.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptatum, culpa veniam laboriosam temporibus a omnis illum, eum, illo sed doloremque aperiam. Laboriosam itaque hic aliquid modi? Quasi atque vero saepe dignissimos officiis, nihil quaerat a, accusamus, deserunt maiores fugiat. Impedit vitae velit et ducimus dicta, quia maxime illo cumque, id dolor qui itaque doloribus rerum odit laudantium laborum adipisci, accusantium</p>
      </div>
      <div class="p-2">
        <h4>Gợi ý:</h4>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa voluptatibus officiis debitis ea illum? Voluptatibus totam libero quidem ab. Iste non sit et molestiae quisquam labore soluta libero veniam minus!</p>
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
      <div class="pb-10">
        <img class="mx-auto" src="/img/undraw/transfer.png" width="300" />
      </div>
    </div>
    <!-- Game play -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      answer: '',
      users: new Array(2).fill({
        name: 'user',
        isActive: false,
      }),
    }
  },
  methods: {
    sentAnswer() {
      this.answer = ''
      // this.$refs.answerInput.focus()
      window.scrollTo(0, 0)
    },
    exit() {
      const isExit = confirm('Bạn có muốn thoát khỏi thi đấu?')
      if (isExit) {
        this.$router.push('home')
      } else {
        console.log(0)
      }
    },
  },
  mounted() {
    // this.$refs.answerInput.focus()
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
