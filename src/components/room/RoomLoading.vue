<template>
  <section v-if="!$STATE('room.current.hostInfo')">
    <h1 class="text-center">Đang tải thông tin phòng ...</h1>
    <br />
    <Loading></Loading>
  </section>
</template>
