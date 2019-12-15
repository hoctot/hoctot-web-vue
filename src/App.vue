<template>
  <div>
    <HeaderTop></HeaderTop>
    <div v-show="isLogin !== null">
      <router-view />
    </div>
    <div v-if="isLoading && !isLoadingGlobal" class="full-page-loading">
      <div>
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>

    <div v-if="isLoadingGlobal" class="full-page-loading">
      <div>
        <div class="loadingio-spinner-reload-jw1ivwv342">
          <div class="ldio-n4w6u70v4xj">
            <div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
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
import { s } from '@/constant'
export default {
  computed: mapState([s.isLogin, s.isLoading, s.isLoadingGlobal]),
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
