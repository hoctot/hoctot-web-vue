<template>
  <div class="mt-2 mb-20">
    <SearchBarData />
    <!-- List collections -->
    <div class="container mx-auto flex flex-wrap mt-2">
      <div
        v-if="items.length"
        class="w-full sm:w-6/12 md:w-4/12 xl:w-3/12 p-3"
        title="Bấm để tạo bộ câu hỏi mới"
      >
        <router-link to="collection-editor">
          <div
            class="mx-auto max-w-sm rounded overflow-hidden shadow-md hover:shadow-lg collections-item"
          >
            <img class="w-full h-40 object-contain" src="/img/undraw/collections.png" />
            <div class="px-6 py-4">
              <div class="font-bold text-lg mb-2">Tạo bộ câu hỏi mới</div>
              <p
                class="text-gray-700 text-xs"
              >Tạo kho kiến thức cùng ôn tập, thi đấu trực tuyến miễn phí</p>
            </div>
          </div>
        </router-link>
      </div>

      <!-- Collection Card -->
      <div
        class="w-full sm:w-6/12 md:w-4/12 xl:w-3/12 p-3"
        v-for="(item, index) in items"
        :key="item.id"
      >
        <div
          class="mx-auto max-w-sm rounded overflow-hidden shadow-md hover:shadow-lg collections-item"
        >
          <router-link :to="{name: 'collection-data', params: { id: index }}">
            <div class="relative menu-hover">
              <img class="w-full h-40 object-cover bg-gray-300" :src="item.imgUrl" />
              <div class="absolute top-0 right-0 flex">
                <ul>
                  <li>
                    <a @click.stop="openMenu" href="javascript:void(0)">
                      <img
                        alt="menu"
                        width="30"
                        class="bg-white hover:bg-gray-200 p-1"
                        src="https://image.flaticon.com/icons/svg/61/61499.svg"
                      />
                    </a>
                  </li>
                  <!-- <li>
                    <a href="javascript:void(0)">
                      <img
                        title="Thêm câu hỏi"
                        alt="add"
                        width="30"
                        class="bg-white hover:bg-green-200 p-1"
                        src="https://image.flaticon.com/icons/svg/748/748113.svg"
                      />
                    </a>
                  </li> -->
                  <li>
                    <a @click.stop="editCollections(item.id)" href="javascript:void(0)">
                      <img
                        alt="edit"
                        title="Chỉnh sửa"
                        width="30"
                        class="bg-white hover:bg-blue-200 p-1 ml-auto"
                        src="https://image.flaticon.com/icons/svg/1159/1159633.svg"
                      />
                    </a>
                  </li>
                  <li>
                    <a @click.stop="deleteCollection(item.id)" href="javascript:void(0)">
                      <img
                        alt="delete"
                        title="Xoá"
                        width="30"
                        class="bg-white hover:bg-red-200 p-1 ml-auto"
                        src="https://image.flaticon.com/icons/svg/61/61848.svg"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="px-6 py-4">
              <div class="font-bold text-lg mb-2 text-blue-500" v-text="item.title"></div>
              <p
                class="text-gray-700 text-xs block-with-text"
                :title="item.desc"
                v-text="item.desc"
              ></p>
            </div>
          </router-link>
        </div>
      </div>
      <!-- Collection Card -->
    </div>

    <div>
      <Promised :promise="itemsPromise" v-slot:combined="{ isPending }">
        <div>
          <NotFoundCollectios v-if="!isPending && !items.length" />
          <div v-if="isPending" class="text-center">Đang tải...</div>
        </div>
      </Promised>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebaseConfig'
import { storeMutations } from '@/constant'

export default {
  data() {
    return {
      items: [],
      itemsPromise: null,
    }
  },

  methods: {
    deleteCollection(id) {
      const isDelete = confirm('Bạn có muốn xoá bộ câu hỏi?')
      if (isDelete) {
        this.$store.commit(storeMutations.SET_LOADING, true)
        db.collection('collections')
          .doc(id)
          .delete()
          .finally(() => {
            this.$store.commit(storeMutations.SET_LOADING, false)
          })
      }
    },
    openMenu(event) {},
    editCollections(id) {
      this.$router.push({ name: 'collection-editor-id', params: { id } })
    },
  },
  mounted() {
    window.scrollTo(0, 0)
    this.itemsPromise = this.$bind('items', db.collection('collections'))
      .then(doc => {
        console.log(doc)
      })
      .catch(error => {
        console.log('error in loading: ', error)
      })
    console.log(this)
  },
}
</script>

<style scoped>
.collections-item {
  min-height: 17rem;
}
.collections-item-desc {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
