<template>
  <nav v-if="!isPlaying" class="top-nav animated fadeInDown mb-2">
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
import { s, rn } from '@/constant'
export default {
  computed: mapState([s.isLogin, s.isPlaying]),
  methods: {
    goToPage() {
      const name = this.isLogin ? rn.collections : rn.home
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
    transition: all .5s ease;
    &:hover, &:active {
      transform: rotate(-5deg)
    }
    &:active {
      transform: rotate(-2deg) scale(0.9)
    }
  }
}
</style>
