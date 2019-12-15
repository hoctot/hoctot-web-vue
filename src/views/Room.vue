<template>
  <div class="container mx-auto px-2">
    <!-- // Game Over -->
    <section v-if="$STATE('room.current.gameOver')">
      <div class="text-center">
        <h1>#Kết thúc</h1>
        <h4 v-if="$STATE('room.current.gameOverTime')">
          {{
            $STATE('room.current.gameOverTime')
              .toDate()
              .toLocaleString()
          }}
        </h4>
        <div>
          <button
            v-if="$IS_HOST"
            @click="$ACTION('room/$deleteRoom', $route.params.roomId)"
            class="text-red-500 hover:text-orange-500 mt-2 font-bold cursor-pointer"
          >
            Xoá phòng
          </button>
        </div>
      </div>
      <br />
      <hr />
      <br />
      <div class="text-center">
        <h1><b>Bảng xếp hạng</b></h1>
        <div
          v-for="(item, index) in $GETTER('room/listUserOrder')(
            ['score'],
            ['desc'],
          )"
          :key="item.uid"
        >
          <h3>Hạng {{ ++index }}: {{ item.displayName }}: {{ item.score }}</h3>
        </div>
        <!-- <pre> {{ $STATE('room.current.users') }} </pre> -->
      </div>
    </section>

    <!-- // Game waiting -->
    <section
      v-if="$STATE('room.current.hostInfo') && !$STATE('room.current.gameOver')"
    >
      <div>
        <h1>{{ $STATE('room.current.gameOver') }}</h1>
        <BaseButton
          @click.native="
            $ACTION('room/$updateUserRoom', {
              roomId: $route.params.roomId,
              key: 'score',
              value: 1,
              fieldValue: 'increment',
            })
          "
          >+ Điểm {{ $GETTER('room/userInRoom.score') }}
        </BaseButton>

        <BaseButton
          @click.native="
            $ACTION('room/$updateUserRoom', {
              roomId: $route.params.roomId,
              key: 'status',
              value: $GETTER('room/isUserReady') ? 'waiting' : 'ready',
            })
          "
          >Sẵn sàng {{ $GETTER('room/isUserReady') }}
        </BaseButton>

        <BaseButton
          @click.native="
            $ACTION('room/$exitRoom', { roomId: $route.params.roomId })
          "
          >- Thoát phòng {{ $GETTER('room/userInRoom.status') }}
        </BaseButton>
      </div>

      <div v-if="$STATE('room.current.users')">
        <div
          class="text-center inline-block mx-2 border-b-4"
          :class="[
            item.status === 'waiting'
              ? 'border-orange-500'
              : 'border-green-500',
          ]"
          v-for="item in $STATE('room.current.users')"
          :key="item.uid"
        >
          <div>
            <img
              class="mx-auto border rounded-full"
              :src="item.photoURL"
              width="48"
            />
          </div>
          <p>
            Điểm:
            <span v-text="item.score ? item.score : 0"></span>
          </p>
        </div>
      </div>

      <div>
        <pre> {{ $STATE('room.current') }} </pre>
      </div>
    </section>

    <!-- // Game Loading -->
    <section v-if="!$STATE('room.current.hostInfo')">
      <h1 class="text-center">Đang tải thông tin phòng ...</h1>
      <br />
      <Loading></Loading>
    </section>

    <!-- //TODO: Game Play -->
  </div>
</template>

<script>
export default {
  beforeMount() {
    this.$ACTION('room/$enterRoom', {
      id: this.$route.params.roomId,
    })
  },
  beforeDestroy() {
    this.$ACTION('room/unsubscribe')
  },
}
</script>

<style></style>
