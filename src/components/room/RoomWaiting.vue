<template>
  <section
    v-if="$STATE('room.current.hostInfo') && !$STATE('room.current.isGameOver')"
  >
    <div class="text-center">
      <!-- <BaseButton
        @click.native="
          $ACTION('room/$updateUserRoom', {
            roomId: $route.params.roomId,
            key: 'score',
            value: 1,
            fieldValue: 'increment',
          })
        "
        >+ Điểm {{ $GETTER('room/userInRoom.score') }}
      </BaseButton> -->

      <div class="mb-3">
        <button
          @click="$ACTION('room/$exitRoom', { roomId: $route.params.roomId })"
          class="text-red-500 hover:text-orange-500 font-bold cursor-pointer"
        >
          Thoát phòng
        </button>
      </div>
    </div>
    <hr />

    <div
      class="mt-4 mb-6 flex justify-center"
      v-if="$STATE('room.current.users')"
    >
      <div
        class="text-center inline-block mx-2 py-2"
        v-for="item in $STATE('room.current.users')"
        :key="item.uid"
      >
        <div class="">
          <img
            class="mx-auto border rounded-full border-green-500 "
            :src="item.photoURL"
            width="48"
          />
        </div>
        <p class="mt-2 text-sm">
          <span
            :class="[item.isReady ? 'bg-green-500' : 'bg-gray-500']"
            class="inline-block w-2 h-2 mx-auto rounded-full"
          ></span>
          {{ item.displayName }}
        </p>
        <!-- <p>
          Điểm:
          <span v-text="item.score ? item.score : 0"></span>
        </p> -->
      </div>
    </div>

    <div class="text-center mt-2">
      <!-- <BaseButton
        @click.native="
          $ACTION('room/$updateUserRoom', {
            roomId: $route.params.roomId,
            key: 'isReady',
            value: $GETTER('room/isUserReady') ? false : true,
          })
        "
        >Sẵn sàng
      </BaseButton> -->
      <BaseButton
        v-if="$IS_HOST"
        @click.native="
          $ACTION('room/$updateRoom', {
            roomId: $route.params.roomId,
            key: 'isPlaying',
            value: true,
          })
        "
        >Bắt đầu thi đấu
      </BaseButton>
      <p>{{ $STATE('room.current.status') }}</p>
      <p v-if="!$IS_HOST" class="text-blue-500">
        Đợi chủ phòng bắt đầu
      </p>
      <div>
        <img class="mx-auto" width="300" src="/img/undraw/team.png" />
      </div>
    </div>
    <div>
      <!-- <pre> {{ $STATE('room.current') }} </pre> -->
    </div>
  </section>
</template>
