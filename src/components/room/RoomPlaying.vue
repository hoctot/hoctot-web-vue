<template>
  <div
    class="mx-auto container"
    v-if="
      $STATE('room.current.isPlaying') && !$STATE('room.current.isGameOver')
    "
  >
    <RoomListUserStatus></RoomListUserStatus>
    <hr />
    <RoomGameInput></RoomGameInput>
    <pre>
      {{ $STATE('room.listQuestion') }}
    </pre>
  </div>
</template>
