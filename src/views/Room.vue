<template>
  <div class="container mx-auto px-2">
    <!-- // Game Over -->
    <RoomGameOver></RoomGameOver>

    <!-- // Game waiting -->
    <RoomWaiting></RoomWaiting>

    <!-- // Game Loading -->
    <RoomLoading></RoomLoading>

    <!-- //TODO: Game Play -->
    <RoomPlaying></RoomPlaying>
  </div>
</template>

<script>
export default {
  beforeMount() {
    this.$ACTION('room/$enterRoom', {
      id: this.$route.params.roomId,
    })
  },
  mounted() {},
  beforeDestroy() {
    this.$ACTION('room/unsubscribe')
  },
}
</script>

<style></style>
