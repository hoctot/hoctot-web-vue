<template>
  <div>
    <section v-if="$STATE('room.current.isGameOver')">
      <div class="text-center">
        <h2>Kết thúc</h2>
        <h5 v-if="$STATE('room.current.gameOverTime')">
          {{
            $STATE('room.current.gameOverTime')
              .toDate()
              .toLocaleString()
          }}
        </h5>
        <div>
          <button
            v-if="$IS_HOST"
            @click="$ACTION('room/$deleteRoom', $route.params.roomId)"
            class="text-red-500 hover:text-orange-500 mt-2 font-bold cursor-pointer"
          >
            Xoá phòng
          </button>
          <button
            v-if="!$IS_HOST"
            @click="$router.push({ name: 'collections' })"
            class="text-red-500 hover:text-orange-500 mt-2 font-bold cursor-pointer"
          >
            Thoát phòng
          </button>
        </div>
      </div>
      <br />
      <hr />
      <br />
      <div class="text-center mb-10">
        <img class="mx-auto" width="300" src="/img/undraw/winner.png" />
        <h1><b>Bảng xếp hạng</b></h1>
        <div
          v-for="(item, index) in $GETTER('room/listUserOrder')(
            ['score'],
            ['desc'],
          )"
          :key="item.uid"
        >
          <h4 class="mb-2">
            <span :class="{ 'text-orange-500': index === 0 }">
              {{ index + 1 > 3 ? index + 1 + '. ' : ' ' }}
              <img
                v-if="index === 0"
                class="inline-block"
                width="62"
                src="https://image.flaticon.com/icons/png/512/744/744984.png"
              />
              <img
                v-if="index === 1"
                class="inline-block"
                width="48"
                src="https://image.flaticon.com/icons/png/512/1579/1579517.png"
              />
              <img
                v-if="index === 2"
                class="inline-block"
                width="32"
                src="https://image.flaticon.com/icons/png/512/199/199573.png"
              />
              <img class="inline-block ml-2" width="48" :src="item.photoURL" />
              {{ item.displayName }}
              :
              {{ item.score }} điểm
              {{ $STATE('user.uid') === item.uid ? '(Bạn) ' : '' }}
            </span>
          </h4>
        </div>
        <!-- <pre> {{ $STATE('room.current.users') }} </pre> -->
      </div>
    </section>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
