<template>
  <nav class="top-nav animated fadeInDown mb-2">
    <router-link to="/">
      <img onmousedown="return false" src="/img/logo.png" class="logo inline-block" alt="logo" />
    </router-link>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.top-nav {
  padding: 1rem 0;
  text-align: center;

  .logo {
    width: 4rem;
  }
}
</style>
