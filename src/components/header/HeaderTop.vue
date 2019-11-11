<template>
  <nav class="top-nav animated fadeInUp">
    <router-link to="/">
      <img onmousedown="return false" src="/img/logo.png" class="logo" alt="logo" />
    </router-link>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss">
.top-nav {
  padding: 1rem 0;
  text-align: center;

  .logo {
    width: 4.75rem;
  }
}
</style>
