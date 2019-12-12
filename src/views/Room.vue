<template>
  <div class="container mx-auto px-2">
    <div>
      <BaseButton
        @click.native="$ACTION('room/$updateRoom', { roomId: $route.params.roomId })"
      >+ Điểm {{$route.params.roomId}}</BaseButton>
      <BaseButton
        @click.native="$ACTION('room/$exitRoom', { roomId: $route.params.roomId })"
      >- Thoát phòng</BaseButton>
    </div>
    <div>{{ $STATE('test') }}</div>
    <div>
      <pre> {{ $STATE('room.listRoom').filter(i => i.id === $route.params.roomId) }} </pre>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$ACTION('room/bindListRoom')
  },
}
</script>

<style>
</style>
