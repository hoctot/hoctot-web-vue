<template>
  <div>
    <div>
      <div id="firebaseui-auth-container"></div>
    </div>

    <div class="container mx-auto text-center mt-2">
      <div class="mb-8">
        <vue-typer
          :shuffle="true"
          class="title-app"
          :text="['Ôn tập kiến thức','Thi đấu trực tuyến','Chia sẻ câu hỏi', 'Tiện ích học tập']"
        ></vue-typer>
      </div>
      <div>
        <div v-if="isLogin === true">
          <router-link :to="rn.collections">
            <BaseButton>Bộ câu hỏi</BaseButton>
          </router-link>
        </div>

        <div v-if="isLogin === false">
          <BaseButton @click.native="login">Bắt đầu ngay</BaseButton>
        </div>

        <Loading v-if="isLogin === null"></Loading>

        <div>
          <router-link :to="rn.about">
            <button class="text-blue-500 mt-5">Giới thiệu</button>
          </router-link>
        </div>
      </div>
    </div>

    <div>
      <div>
        <img class="mx-auto bg-white" src="/img/undraw/learn.png" width="300" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { a, s, rn } from '@/constant'

export default {
  beforeMount() {},
  computed: {
    ...mapState([s.isLogin]),
    rn() {
      return rn
    },
  },
  methods: {
    ...mapActions([a.login]),
  },
}
</script>

<style scoped>
.title-app {
  font-size: 2rem;
}
</style>
