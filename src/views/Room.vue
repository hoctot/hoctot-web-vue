<template>
  <div class="container mx-auto px-2">
    <div>
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
          item.status === 'waiting' ? 'border-orange-500' : 'border-green-500',
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
          <span v-text="item.score"></span>
        </p>
      </div>
    </div>

    <div>
      <pre> {{ $STATE('room.current') }} </pre>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {},
}
</script>

<style></style>
