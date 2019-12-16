<template>
  <section
    v-if="
      $STATE('room.current.hostInfo') &&
        !$STATE('room.current.isGameOver') &&
        !$STATE('room.current.isPlaying')
    "
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
        <button
          v-if="$IS_HOST"
          @click="$ACTION('room/$deleteRoom', $route.params.roomId)"
          class="ml-4 text-red-500 hover:text-orange-500 font-bold cursor-pointer"
        >
          Xoá phòng
        </button>
      </div>
    </div>
    <hr />

    <div class="mt-4 mb-6 ">
      <RoomListUserStatus></RoomListUserStatus>
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
        v-if="$IS_HOST && $GETTER('room/listUserReady').length > 1"
        @click.native="
          $ACTION('room/$updateRoom', {
            roomId: $route.params.roomId,
            key: 'isPlaying',
            value: true,
          })
        "
        >Bắt đầu thi đấu
      </BaseButton>
      <div v-if="$IS_HOST && $GETTER('room/listUserReady').length <= 1">
        <h3 class="text-blue-500">
          Đang chờ người tham gia phòng...
        </h3>
      </div>

      <div v-if="!$IS_HOST">
        <h3 class="text-blue-500">
          Đợi chủ phòng bắt đầu ...
        </h3>
      </div>

      <div class="mt-4">
        <img class="mx-auto" width="300" src="/img/undraw/team.png" />
      </div>
    </div>
    <div>
      <!-- <pre> {{ $STATE('room.current') }} </pre> -->
    </div>
  </section>
</template>
