<template>
  <div>
    <div class="c-content">
      <img src="/bg/1.jpg" class="img-bg" />
      <div class="button-group">
        <div class="desc-text">
          <h3>
            <span style="font-size: 2rem">❝</span>
           Tiện ích học tập trực tuyến
          </h3>
        </div>

        <div>
          <router-link to="editor">
            <button class="bg-green-500 text-white font-semibold px-4 py-2 rounded">Bắt đầu ngay</button>
          </router-link>
          <br />
          <router-link to="about">
            <button class="text-blue-500 mt-5 ">Giới thiệu</button>
          </router-link>
        </div>
      </div>
    </div>
    <div>
      <div>
        <img class="mx-auto" src="/img/undraw/learn.png" width="50%" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.c-content {
  position: relative;
  .img-bg {
    width: 100%;
    height: 15rem;
    object-fit: cover;
    // border-radius: 4rem;
    // padding: 0 1rem;
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
