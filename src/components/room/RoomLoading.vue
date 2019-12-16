<template>
  <section v-if="!$STATE('room.current.hostInfo')">
    <h3 class="text-center">Đang tải thông tin phòng ...</h3>
    <br />
    <Loading></Loading>
  </section>
</template>
