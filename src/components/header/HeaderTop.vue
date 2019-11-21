<template>
  <nav class="top-nav animated fadeInDown mb-2">
    <img
      @click="goToPage"
      tabindex="0"
      onmousedown="return false"
      src="/img/logo.png"
      class="logo inline-block cursor-pointer"
      alt="logo"
    />
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import { storeState, routerName } from '@/constant'
export default {
  computed: mapState([storeState.isLogin]),
  methods: {
    goToPage() {
      const name = this.isLogin ? routerName.collections : routerName.home
      this.$router.push({ name }).catch(() => {})
    },
  },
}
</script>

<style lang="scss" scoped>
.top-nav {
  padding: 1rem 0;
  text-align: center;

  .logo {
    width: 4.25rem;
  }
}
</style>
