<template>
  <div>
    <div>roomId {{ $route.query.roomId }}</div>
    <div>collectionId {{ $route.query.collectionId }}</div>
    <div>room type: basic</div>
    <BaseButton
      v-if="isHost(room) && roomListUser.length > 1"
      @click.native="$store.dispatch(storeActions.startRoom, {
        roomId: $route.query.roomId
      })"
    >Bắt đầu</BaseButton>
    <BaseButton
      v-if="isGuess(room)"
      @click.native="$store.dispatch(storeActions.exitRoom, {
        roomId: $route.query.roomId
      })"
    >Thoát phòng</BaseButton>
    <BaseButton
      v-if="isHost(room)"
      @click.native="$store.dispatch(storeActions.deleteRoom,{
        roomId: $route.query.roomId
      })"
    >Xoá phòng</BaseButton>
    <div>
      <div v-if="roomListUser.length">
        <pre> {{ roomListUser }} </pre>
        <div class="inline-block m-2" v-for="item in roomListUser" :key="item.uid">
          <!-- {{ item }} -->
          <img class="rounded-full border hover:border-green-500" :src="item.photoURL" width="48" />
        </div>
      </div>

      <pre> {{ room }} </pre>
      <br />
    </div>
  </div>
</template>

<script>
import { storeActions, storeState, storeGetter } from '@/constant'
import { mapState, mapGetters } from 'vuex'

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
  },
  computed: {
    ...mapState([storeState.room, storeState.user]),
    ...mapGetters([storeGetter.roomListUser]),
  },
}
</script>

<style>
</style>
