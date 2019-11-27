<template>
  <div class="mt-2 mb-20">
    <SearchBarData />
    <!-- List collections -->

    <div class="text-center my-2" v-if="listCollection.length">
      {{ listCollection.length }} bộ câu hỏi
      <img
        class="inline-block"
        width="24"
        src="https://image.flaticon.com/icons/svg/167/167756.svg"
      />
    </div>

    <div class="container mx-auto flex flex-wrap mt-2" v-if="listCollection.length">
      <div class="w-full sm:w-6/12 md:w-4/12 xl:w-3/12 p-3" title="Bấm để tạo bộ câu hỏi mới">
        <router-link :to="{name: routerName.collectionEditor}">
          <div
            class="mx-auto max-w-sm rounded overflow-hidden shadow-md hover:shadow-lg collections-item"
          >
            <img class="w-full h-40 object-contain" src="/img/undraw/collections.png" />
            <div class="px-6 py-4">
              <div class="font-bold text-lg mb-2">Tạo bộ câu hỏi</div>
              <p class="text-gray-700 text-xs">Cùng ôn tập, thi đấu trực tuyến miễn phí</p>
            </div>
          </div>
        </router-link>
      </div>

      <!-- Collection Card -->
      <div
        class="w-full sm:w-6/12 md:w-4/12 xl:w-3/12 p-3"
        v-for="(item) in listCollection"
        :key="item.id"
      >
        <div
          class="mx-auto max-w-sm rounded overflow-hidden shadow-md hover:shadow-lg collections-item"
        >
          <router-link
            :to="{name: routerName.collectionData, params: { id: item.id }, query: { item: JSON.stringify(item) }}"
          >
            <div class="relative menu-hover">
              <img class="w-full h-40 object-cover bg-gray-300" :src="item.imgUrl" />
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
                    <a @click.stop="editCollections(item.id)" href="javascript:void(0)">
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
            <div class="px-6 py-4">
              <div class="font-bold text-lg mb-2 text-blue-500" v-text="item.title"></div>
              <p class="text-gray-700 text-xs block-with-text" v-text="item.desc"></p>
            </div>
          </router-link>
        </div>
      </div>
      <!-- Collection Card -->
    </div>

    <div>
      <Promised :promise="listCollectionPromise" v-slot:combined="{ isPending }">
        <div>
          <div class="text-center p-2" v-if="!isPending && !listCollection.length">
            <BaseButton class="mb-8" @click.native="createCollection">Tạo bộ câu hỏi mới</BaseButton>
            <NotFoundCollections />
          </div>
          <div v-if="isPending" class="text-center mt-5">
            <Loading></Loading>
          </div>
        </div>
      </Promised>
    </div>

    <!-- <div>{{ listCollection }}</div> -->
  </div>
</template>

<script>
import { db } from '@/firebaseConfig'
import {
  storeMutations,
  storeState,
  dataRef,
  routerName,
  storeActions,
} from '@/constant'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      itemsPromise: null,
      listCollectionPromise: null,
    }
  },
  computed: {
    ...mapState([storeState.user, storeState.listCollection]),
    routerName() {
      return routerName
    },
  },
  methods: {
    deleteCollection(id, title) {
      const isDelete = confirm(`Bạn có muốn xoá bộ câu hỏi : ${title}?`)
      if (isDelete) {
        this.$store.commit(storeMutations.SET_LOADING, true)
        db.collection(dataRef.collections.root)
          .doc(this.user.uid)
          .collection(dataRef.collections.data)
          .doc(id)
          .delete()
          .finally(() => {
            this.$store.commit(storeMutations.SET_LOADING, false)
          })
      }
    },
    editCollections(id) {
      this.$router.push({ name: routerName.collectionEditorId, params: { id } })
    },
    createCollection() {
      this.$router.push({
        name: routerName.collectionEditor,
      })
    },
    openMenu(event) {},
  },
  mounted() {
    window.scrollTo(0, 0)
    this.listCollectionPromise = this.$store.dispatch(
      storeActions.bindListCollection,
    )
  },
}
</script>

<style scoped>
.collections-item {
  min-height: 17.5rem;
}
.collections-item-desc {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
