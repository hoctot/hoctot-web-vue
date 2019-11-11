<template>
  <div class="c-content">
    <img src="/bg/1.jpg" class="img-bg" />
    <div class="button-group">
      <div class="desc-text">
        <h1 class="title is-5">
          <span style="font-size: 2rem">❝</span>
          Nhà trường chỉ cho chúng ta chiếc chìa khóa tri thức, học trong cuộc sống là công việc cả đời.
        </h1>
        <p class="subtitle is-6">Bill Gates</p>
      </div>

      <div>
        <router-link to="editor">
          <button class="button is-success">Bắt đầu ngay</button>
        </router-link>

        <router-link to="about">
          <button class="button">Giới thiệu</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.c-content {
  position: relative;
  .img-bg {
    width: 100%;
    height: 25rem;
    object-fit: cover;
    // border-radius: 4rem;
    padding: 0 1rem;
  }
  .desc-text {
    padding: 0.5rem;
    margin-bottom: 1rem;
    .title {
      text-align: justify;
    }
    .subtitle {
      text-align: right;
      font-style: italic;
    }
  }
  .button-group {
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .button {
      margin: 0.5rem;
    }
  }
}
</style>
