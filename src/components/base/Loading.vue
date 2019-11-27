<template>
  <div>
    <div class="progress-container">
      <div class="progress">
        <div class="progress-bar">
          <div class="progress-shadow"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.progress-container {
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
}

.progress {
  background-color: rgb(229, 233, 235);
  height: 0.25em;
  position: relative;
  width: 15em;
}
.progress-bar {
  background-size: 23em 0.25em;
  height: 100%;
  position: relative;
  background-image: linear-gradient(
    to right,
    rgb(76, 217, 100),
    rgb(90, 200, 250),
    rgb(0, 122, 255),
    rgb(52, 170, 220),
    rgb(88, 86, 214),
    rgb(255, 45, 85)
  );
  animation: cssload-width 0.5s cubic-bezier(0.45, 0, 1, 1) infinite;
}
.progress-shadow {
  height: 4em;
  position: absolute;
  top: 100%;
  width: 100%;
  transform: skew(45deg);
  transform-origin: 0 0;
  background-image: linear-gradient(to bottom, rgb(234, 236, 238), transparent);
}

@keyframes cssload-width {
  0%,
  100% {
    transition-timing-function: cubic-bezier(1, 0, 0.65, 0.85);
  }
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
</style>
