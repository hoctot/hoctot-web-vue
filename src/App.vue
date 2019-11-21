<template>
  <div>
    <HeaderTop></HeaderTop>
    <div v-show="isLogin !== null">
      <router-view />
    </div>
    <div v-if="isLoading" class="full-page-loading">
      <div>
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
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
  computed: mapState([storeState.isLogin, storeState.isLoading]),
}
</script>

<style>
.full-page-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.25);
  /* opacity: 0.1; */
  z-index: 9999999;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
