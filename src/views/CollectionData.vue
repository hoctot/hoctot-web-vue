<template>
  <div class="mt-2 mb-20">
    <SearchBarData searchType="question" />

    <div class="container mx-auto mt-5">
      <div class="flex flex-wrap justify-center mb-8">
        <BaseButton
          @click.native="createQuestion"
          class="w-full sm:w-3/12 mb-2 mx-0 text-lg"
          >Tạo câu hỏi</BaseButton
        >
      </div>

      <div v-if="listQuestion.length" class="px-2">
        <div class="text-center">
          {{ getListSearch('listQuestion').length }} câu hỏi
          {{ search ? 'được tìm thấy' : '' }}
          <img
            class="inline-block"
            width="24"
            src="https://image.flaticon.com/icons/svg/1660/1660216.svg"
          />
        </div>
        <br />
        <div v-for="item in getListSearch('listQuestion')" :key="item.id">
          <div
            @click="editCollections(item)"
            class="relative menu-hover cursor-pointer w-full rounded overflow-hidden shadow hover:shadow-lg mb-5"
          >
            <div class="px-6 py-4">
              <div class="mb-2" v-html="item.question"></div>
              <hr />
              <br />
              <div
                class="text-gray-700 text-sm block-with-text mb-5"
                v-text="item.answer"
              ></div>
              <div v-if="item.solve">
                <hr />
                <br />
                <div class="mb-5" v-html="item.solve"></div>
              </div>
              <div class="text-right px-2">
                <p class="text-gray-700 text-xs">
                  {{
                    item.createdAt &&
                      item.createdAt.toDate().toLocaleString('vi-VN')
                  }}
                </p>
              </div>
            </div>

            <div class="absolute top-0 right-0 flex">
              <ul class="hover-list">
                <li>
                  <a @click.stop="openMenu" href="javascript:void(0)">
                    <img
                      class="bg-white hover:bg-gray-200 p-1 w-8"
                      src="https://image.flaticon.com/icons/svg/61/61499.svg"
                    />
                  </a>
                </li>
                <li>
                  <a
                    @click.stop="editCollections(item)"
                    href="javascript:void(0)"
                  >
                    <img
                      title="Chỉnh sửa"
                      class="bg-white hover:bg-blue-200 p-1 ml-auto w-8"
                      src="https://image.flaticon.com/icons/svg/1159/1159633.svg"
                    />
                  </a>
                </li>
                <li>
                  <a
                    @click.stop="deleteCollection(item.id, item.title)"
                    href="javascript:void(0)"
                  >
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
        <Promised
          :promise="listQuestionPromise"
          v-slot:combined="{ isPending }"
        >
          <div>
            <NotFoundCollections v-if="!isPending && !listQuestion.length" />
            <div v-if="isPending" class="text-center mt-5">
              <Loading></Loading>
            </div>
          </div>
        </Promised>
      </div>

      <!-- <div>{{ listQuestion }}</div> -->
    </div>
  </div>
</template>

<script>
import { rn, s, ref, m, a, g } from '@/constant'
import { mapState, mapGetters } from 'vuex'
import { db } from '@/firebaseConfig'

export default {
  data() {
    return {
      // items: new Array(10).fill({
      //   title: 'fake',
      // }),
      listQuestionPromise: null,
    }
  },
  computed: {
    ...mapState([s.user, s.search, s.listQuestion]),
    ...mapGetters([g.getListSearch]),
  },
  methods: {
    createQuestion() {
      this.$router.push({
        name: rn.editor,
        query: {
          collectionId: this.$route.params.id,
          item: this.$route.query.item,
        },
      })
    },
    editCollections(item) {
      this.$router.push({
        name: rn.editor,
        query: {
          isEditMode: 'true',
          collectionId: this.$route.params.id,
          questionId: item.id,
          item: JSON.stringify({
            ...item,
            title: JSON.parse(this.$route.query.item).title,
          }),
        },
      })
    },
    deleteCollection(id) {
      const isDelete = confirm(`Bạn có muốn xoá câu hỏi?`)
      if (isDelete) {
        this.$store.commit(m.SET_LOADING, true)
        db.collection(ref.questions.root)
          .doc(this.user.uid)
          .collection(ref.questions.data)
          .doc(id)
          .delete()
          .finally(() => {
            this.$store.commit(m.SET_LOADING, false)
          })
      }
    },
    openMenu(event) {},
  },
  mounted() {
    window.scrollTo(0, 0)
    this.listQuestionPromise = this.$ACTION(a.bindListQuestion)
  },
}
</script>

<style></style>
