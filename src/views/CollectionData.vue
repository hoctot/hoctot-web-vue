 <template>
  <div class="mt-2 mb-20">
    <SearchBarData />

    <div class="container mx-auto mt-5">
      <div class="flex flex-wrap justify-center mb-8">
        <BaseButton @click.native="createQuestion" class="w-full sm:w-3/12 mb-2 mx-0">Tạo câu hỏi</BaseButton>
        <BaseButton @click.native="playQuiz" class="w-full sm:w-3/12 mb-2">Thi đấu trực tuyến</BaseButton>
        <BaseButton @click.native="playQuiz" class="w-full sm:w-3/12 mb-2">Ôn tập</BaseButton>
      </div>
      <div v-if="items.length">
        <div class="text-center">{{items.length}} câu hỏi</div>
        <br>
        <div v-for="item in items" :key="item.id">
          <div
            @click="editCollections(item)"
            class="relative menu-hover cursor-pointer w-full rounded overflow-hidden shadow hover:shadow-lg mb-5"
          >
            <div class="px-6 py-4">
              <div class="mb-2" v-html="item.question"></div>
              <hr />
              <br />
              <div class="text-gray-700 text-sm block-with-text mb-5" v-text="item.answer"></div>
            </div>

            <div class="absolute top-0 right-0 flex">
              <ul>
                <li>
                  <a @click.stop="openMenu" href="javascript:void(0)">
                    <img
                      class="bg-white hover:bg-gray-200 p-1 w-8"
                      src="https://image.flaticon.com/icons/svg/61/61499.svg"
                    />
                  </a>
                </li>
                <li>
                  <a @click.stop="editCollections(item)" href="javascript:void(0)">
                    <img
                      title="Chỉnh sửa"
                      class="bg-white hover:bg-blue-200 p-1 ml-auto w-8"
                      src="https://image.flaticon.com/icons/svg/1159/1159633.svg"
                    />
                  </a>
                </li>
                <li>
                  <a @click.stop="deleteCollection(item.id, item.title)" href="javascript:void(0)">
                    <img
                      title="Xoá"
                      class="bg-white hover:bg-red-200 p-1 ml-auto w-8"
                      src="https://image.flaticon.com/icons/svg/61/61848.svg"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Promised :promise="itemsPromise" v-slot:combined="{ isPending }">
          <div>
            <NotFoundCollections v-if="!isPending && !items.length" />
            <div v-if="isPending" class="text-center mt-5">
              <!-- <p>Đang tải...</p> -->
              <!-- <br /> -->
              <Loading></Loading>
            </div>
          </div>
        </Promised>
      </div>
    </div>
  </div>
</template>

<script>
import { routerName, storeState, dataRef, storeMutations } from '@/constant'
import { mapState } from 'vuex'
import { db } from '@/firebaseConfig'

export default {
  data() {
    return {
      // items: new Array(10).fill({
      //   title: 'fake',
      // }),
      items: [],
      itemsPromise: null,
    }
  },
  computed: {
    ...mapState([storeState.user]),
  },
  methods: {
    createQuestion() {
      this.$router.push({
        name: routerName.editor,
        query: {
          collectionId: this.$route.params.id,
          item: this.$route.query.item,
        },
      })
    },
    playQuiz() {
      this.$router.push({ name: routerName.play })
    },
    editCollections(item) {
      this.$router.push({
        name: routerName.editor,
        query: {
          isEditMode: 'true',
          collectionId: this.$route.params.id,
          questionId: item.id,
          item: JSON.stringify(item),
        },
      })
    },
    deleteCollection(id) {
      const isDelete = confirm(`Bạn có muốn xoá câu hỏi?`)
      if (isDelete) {
        this.$store.commit(storeMutations.SET_LOADING, true)
        db.collection(dataRef.questions.root)
          .doc(this.user.uid)
          .collection(dataRef.questions.data)
          .doc(id)
          .delete()
          .finally(() => {
            this.$store.commit(storeMutations.SET_LOADING, false)
          })
      }
    },
    openMenu(event) {},
    bindCollection() {
      this.itemsPromise = this.$bind(
        'items',
        db
          .collection(dataRef.questions.root)
          .doc(this.user.uid)
          .collection(dataRef.questions.data),
      )
    },
  },
  watch: {
    user(newData, oldData) {
      if (newData.uid) {
        this.bindCollection()
      }
    },
  },
  mounted() {
    window.scrollTo(0, 0)
    if (this.user.uid) {
      this.bindCollection()
    }
  },
}
</script>

 <style>
</style>
