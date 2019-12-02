<template>
  <div class="container mx-auto">
    <div v-if="listRoom.length">
      <div class="bg-white border p-4 rounded mb-4" v-for="item in listRoom" :key="item.id">
        <details>
          <summary>Data.</summary>
          <pre class="text-xs">{{ item }}</pre>
        </details>
        <div class="flex justify-between">
          <div v-if="user.uid !== (item.hostInfo && item.hostInfo.uid)">
            <button
              @click="$store.dispatch(storeActions.enterRoom, {roomId: item.id})"
              class="text-blue-500"
            >Vào</button>
          </div>
          <div v-if="user.uid === (item.hostInfo && item.hostInfo.uid) && ((item.status && item.status === 'wait-open'))">
            <button
              class="text-red-500"
              @click="$store.dispatch(storeActions.deleteRoom, {roomId: item.id})"
            >Xoá</button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <Promised :promise="listRommPromise" v-slot:combined="{ isPending }">
        <div>
          <NotFoundCollections v-if="!isPending && !listRoom.length" />
          <div v-if="isPending" class="text-center mt-5">
            <Loading></Loading>
          </div>
        </div>
      </Promised>
    </div>
  </div>
</template>

<script>
import { storeActions, storeState } from '@/constant'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      listRommPromise: null,
      storeActions: storeActions,
    }
  },
  computed: mapState([storeState.listRoom, storeState.user]),
  methods: {
    isHost(user, item) {
      return Boolean(user.uid === (item.hostInfo && item.hostInfo.uid))
    },
  },
  mounted() {
    this.listRommPromise = this.$store.dispatch(storeActions.bindListRoom)
  },
}
</script>

<style>
</style>
