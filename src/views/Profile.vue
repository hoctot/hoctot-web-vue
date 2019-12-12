<template>
  <div>
    <div class="container mx-auto mt-5">
      <div class="text-center">
        <h2>Thông tin tài khoản</h2>
        <br />
        <div>
          <img
            class="mx-auto rounded-full rounded"
            width="150"
            :src="user.photoURL?user.photoURL: '/public/img/undraw/avatar.png'"
          />
        </div>
        <br />
        <p>{{user.displayName}}</p>
        <p>{{user.email}}</p>
      </div>
      <div class="text-center my-10">
        <button
          @click="signOut"
          class="bg-orange-500 hover:bg-orange-400 shadow hover:shadow-xl appearance-none border font-bold rounded py-2 px-8 text-white leading-tight focus:outline-none focus:shadow-outline"
        >Đăng xuất</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { s, a } from '@/constant'
export default {
  data() {
    return {}
  },
  computed: mapState([s.isLogin, s.user]),
  methods: mapActions([a.signOut]),
}
</script>

<style scoped>
</style>
