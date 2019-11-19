<template>
  <div>
    <!-- <div>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <HeaderTop></HeaderTop>
    <div v-show="isLogin !== null">
      <router-view />
    </div>
    <div v-if="isLogin === null" class="mx-auto container text-center mt-10">
        <LoadingProgress></LoadingProgress>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { storeState } from '@/constant'
export default {
  computed: mapState([storeState.isLogin]),
}
</script>
