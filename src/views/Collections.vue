<template>
  <div class="mt-2 mb-20">
    <SearchBarData/>

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
              >Tạo kho kiến thức của bạn ôn tập, thi đấu trực tuyến miễn phí</p>
            </div>
          </div>
        </router-link>
      </div>

      <!-- Collection Card -->
      <div class="w-full sm:w-6/12 md:w-4/12 xl:w-3/12 p-3" v-for="(item, index) in items" :key="item.id">
        <router-link :to="{name: 'collection-data', params: { id: index }}">
          <div
            class="mx-auto max-w-sm rounded overflow-hidden shadow-md hover:shadow-lg collections-item"
          >
            <!-- <img
              class="w-full h-40 object-cover bg-gray-500"
              :src="`https://picsum.photos/id/3${index}/600/600`"
            /> -->
            <img
              class="w-full h-40 object-cover bg-gray-300"
              :src="`https://dummyimage.com/800x600/4CAF50/fff.jpg&text=${item.title}`"
            />
            <div class="px-6 py-4">
              <div class="font-bold text-lg mb-2">The Coldest Sunset {{ index }}</div>
              <p
                class="text-gray-700 text-xs block-with-text"
              >Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem asperiores similique veniam eum labore suscipit explicabo cum voluptas nam quidem et aliquam reiciendis ipsam ducimus, tempora officiis quis, incidunt illo.</p>
            </div>
          </div>
        </router-link>
      </div>
      <!-- Collection Card -->

      <NotFoundCollectios v-if="!items.length" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: new Array(10).fill({
        title: 'Toán học',
      }),
    }
  },
  mounted() {
    window.scrollTo(0, 0)
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
