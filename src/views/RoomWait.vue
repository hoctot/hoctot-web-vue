<template>
  <div>
    <div>roomId {{ $route.query.roomId }}</div>
    <div>collectionId {{ $route.query.collectionId }}</div>
    <div>List user</div>
    <div>room type: basic</div>
    <BaseButton v-if="isHost(room)">Bắt đầu</BaseButton>
    <BaseButton v-if="isGuess(room)">Thoát phòng</BaseButton>
    <BaseButton
      v-if="isHost(room)"
      @click.native="$store.dispatch(storeActions.deleteRoom, $route.query.roomId)"
    >Xoá phòng</BaseButton>
    <div>
      <pre> {{ room }} </pre>
      <br />
      <pre> {{ listRoomUser }} </pre>
    </div>
  </div>
</template>

<script>
import { storeActions, storeState } from '@/constant'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      storeActions: storeActions,
    }
  },
  beforeDestroy() {},
  methods: {
    isHost(item) {
      return Boolean(
        (this.user && this.user.uid) === (item.hostInfo && item.hostInfo.uid),
      )
    },
    isGuess(item) {
      return Boolean(
        (this.user && this.user.uid) !== (item.hostInfo && item.hostInfo.uid),
      )
    },
  },
  beforeMount() {
    this.$store.dispatch(storeActions.setRoomData, {
      roomId: this.$route.query.roomId,
    })

    this.$store.dispatch(storeActions.bindRoomListUser)
  },
  computed: mapState([
    storeState.room,
    storeState.user,
    storeState.listRoomUser,
  ]),
}
</script>

<style>
</style>
