<template>
  <div class="mt-2 mb-20">
    <SearchBarData searchType="collection" />

    <!-- List Room -->
    <div
      v-if="$store.state.room.listRoom.length"
      class="container mx-auto text-center"
    >
      <p>
        Phòng thi đấu
        <img
          class="inline-block"
          width="24"
          src="https://image.flaticon.com/icons/png/512/1632/1632670.png"
        />
      </p>
    </div>
    <div class="container mx-auto flex flex-wrap justify-center ">
      <div
        v-for="item in $store.state.room.listRoom"
        :key="item.id"
        class="order-bottom-mobile w-full sm:w-6/12 md:w-4/12 xl:w-3/12 p-3"
      >
        <div
          class="rounded mx-auto max-w-sm rounded overflow-hidden shadow-md hover:shadow-lg collections-item"
        >
          <img
            class="w-full h-20 object-cover mt-2"
            :src="item.collection.imgUrl"
          />
          <div class="px-6 py-4 text-center">
            <p class="text-gray-700 mb-2 font-bold" v-text="item.title"></p>
            <div class="text-xs mb-2" v-text="item.desc"></div>
            <BaseButton
              @click.native="
                $router.push({ name: 'room', params: { roomId: item.id } })
              "
              class="mt-2 mb-2"
              >Vào phòng
            </BaseButton>
            <div>
              <button
                v-if="$CHECK_IS_HOST(item)"
                @click="$ACTION('room/$deleteRoom', item.id)"
                class="text-red-500 hover:text-orange-500 mt-2 font-bold cursor-pointer"
              >
                Xoá
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <hr />
      <br />
    </div>

    <!-- <pre> {{ $store.state.room.listRoom }} </pre> -->
    <!-- End List Room -->

    <!-- List collections -->
    <div class="text-center my-2" v-if="listCollection.length">
      <p>
        {{ search ? 'Tìm thấy ' : '' }}
        {{ getListSearch('listCollection').length }} bộ câu hỏi
        <img
          class="inline-block"
          width="24"
          src="https://image.flaticon.com/icons/svg/167/167756.svg"
        />
      </p>
    </div>

    <div
      class="container mx-auto flex flex-wrap mt-2"
      v-if="listCollection.length"
    >
      <div
        class="order-bottom-mobile w-full sm:w-6/12 md:w-4/12 xl:w-3/12 p-3"
        title="Bấm để tạo bộ câu hỏi mới"
      >
        <div class="mx-auto max-w-sm rounded overflow-hidden ">
          <img
            class="w-full h-30 object-contain"
            src="/img/undraw/collections.png"
          />
          <div class="px-6 py-4 text-center">
            <router-link :to="{ name: rn.collectionEditor }">
              <BaseButton>Bộ câu hỏi mới</BaseButton>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Collection Card -->
      <div
        class="w-full sm:w-6/12 md:w-4/12 xl:w-3/12 p-3"
        v-for="item in $GETTER_FILTER('getListSearch', 'listCollection')"
        :key="item.id"
      >
        <div
          class="mx-auto max-w-sm rounded overflow-hidden shadow-md hover:shadow-lg collections-item"
        >
          <router-link
            :to="{
              name: rn.collectionData,
              params: { id: item.id },
              query: { item: JSON.stringify(item) },
            }"
          >
            <div class="relative menu-hover">
              <img
                class="w-full h-40 object-cover bg-gray-300"
                :src="item.imgUrl"
              />
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
                    <a @click.stop="newRoom(item)" href="javascript:void(0)">
                      <img
                        title="Thi đấu Online"
                        class="bg-white hover:bg-blue-200 p-1 ml-auto w-8"
                        src="https://image.flaticon.com/icons/svg/149/149145.svg"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      @click.stop="editCollections(item.id)"
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
            <div class="px-6 py-4">
              <div
                class="font-bold text-lg mb-2 text-blue-500 text-center"
                v-text="item.title"
              ></div>
              <a
                title="Bấm để tạo phòng"
                class="block "
                @click.stop="newRoom(item)"
                href="javascript:void(0)"
              >
                <p
                  class="p-4 hover:shadow hover:bg-green-400 text-center bg-green-500 text-white font-bold  rounded"
                >
                  Tạo phòng
                </p>
              </a>
              <!-- <p
                class="text-gray-700 text-xs block-with-text"
                v-text="item.desc"
              ></p> -->
            </div>
            <div class="text-right px-2">
              <p class="text-gray-700 text-xs">
                {{
                  item.createdAt &&
                    item.createdAt.toDate().toLocaleString('vi-VN')
                }}
              </p>
            </div>
          </router-link>
        </div>
      </div>
      <!-- Collection Card -->
    </div>

    <div>
      <Promised
        :promise="listCollectionPromise"
        v-slot:combined="{ isPending }"
      >
        <div>
          <div
            class="text-center p-2"
            v-if="!isPending && !listCollection.length"
          >
            <BaseButton class="mb-8" @click.native="createCollection"
              >Tạo bộ câu hỏi mới</BaseButton
            >
            <NotFoundCollections />
          </div>
          <div v-if="isPending" class="text-center mt-5">
            <Loading></Loading>
          </div>
        </div>
      </Promised>
    </div>

    <!-- <pre>{{ listCollection }}</pre> -->
  </div>
</template>

<script>
import { db } from '@/firebaseConfig'
import { m, s, ref, rn, a, g } from '@/constant'
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      itemsPromise: null,
      listCollectionPromise: null,
    }
  },
  computed: {
    ...mapState([s.user, s.listCollection, s.search]),
    ...mapGetters([g.getListSearch]),
    rn() {
      return rn
    },
  },
  methods: {
    deleteCollection(id, title) {
      const isDelete = confirm(`Bạn có muốn xoá bộ câu hỏi : ${title}?`)
      if (isDelete) {
        this.$COMMIT(m.SET_LOADING, true)

        db.collection(ref.collections.root)
          .doc(this.user.uid)
          .collection(ref.collections.data)
          .doc(id)
          .delete()
          .finally(() => {
            this.$store.commit(m.SET_LOADING, false)
          })
      }
    },
    editCollections(id) {
      this.$GO({ name: rn.collectionEditorId, params: { id } })
    },
    createCollection() {
      this.$GO(rn.collectionEditor)
    },
    newRoom(item) {
      this.$ACTION('room/$createRoom', {
        collectionId: item.id,
        collection: item,
        options: {
          isRedirect: true,
        },
      })
    },
    openMenu(event) {},
  },
  mounted() {
    window.scrollTo(0, 0)
    this.listCollectionPromise = this.$ACTION(a.bindListCollection)
    this.$ACTION('room/bindListRoom')
  },
}
</script>

<style scoped>
.collections-item {
  min-height: 17.65rem;
}
.collections-item-desc {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
