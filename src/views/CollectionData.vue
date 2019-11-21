 <template>
  <div class="mt-2 mb-20">
    <SearchBarData />

    <div class="container mx-auto mt-5">
      <div class="flex flex-wrap justify-center mb-8">
        <BaseButton @click.native="createQuestion" class="w-full sm:w-3/12 mb-2">Tạo câu hỏi</BaseButton>
        <BaseButton @click.native="playQuiz" class="w-full sm:w-3/12 mb-2">Thi đấu trực tuyến</BaseButton>
        <BaseButton @click.native="playQuiz" class="w-full sm:w-3/12 mb-2">Ôn tập</BaseButton>
      </div>
      <div v-if="items.length">
        <div v-for="item in items" :key="item.id">
          <div
            @click="gotoEditor"
            class="cursor-pointer w-full rounded overflow-hidden shadow hover:shadow-lg mb-5"
          >
            <div class="px-6 py-4">
              <div class="font-bold text-base mb-2">The Coldest Sunset</div>
              <p class="text-gray-700 text-sm block-with-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam at repudiandae sequi suscipit sint asperiores cum ea totam eligendi perferendis soluta, fuga reprehenderit veritatis laudantium id obcaecati fugiat dolores nobis!
              </p>
            </div>
            <div class="px-6 py-4">
              <span
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
              >photography</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <NotFoundCollectios v-if="!items.length" />
      </div>
    </div>
  </div>
</template>

<script>
import { routerName } from '../constant'
// import { db } from '@/firebaseConfig'

export default {
  data() {
    return {
      items: new Array(10).fill({
        title: 'fake',
      }),
    }
  },
  methods: {
    createQuestion() {
      this.$router.push({ name: routerName.editor })
    },
    playQuiz() {
      this.$router.push({ name: routerName.play })
    },
    gotoEditor() {
      this.$router.push({ name: routerName.editor })
    },
  },
  mounted() {
    window.scrollTo(0, 0)
  },
}
</script>

 <style>
</style>
