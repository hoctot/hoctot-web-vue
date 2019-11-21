<template>
  <div>
    <div class="cssload-loader">
      <span></span>
    </div>
    <br>
    <div class="mt-1">
      <img class="mx-auto" width="48" src="https://image.flaticon.com/icons/svg/1161/1161388.svg" />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.cssload-loader *,
.cssload-loader *:before,
.cssload-loader *:after {
  box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}
.cssload-loader {
  background: white;
  position: absolute;
  left: 50%;
  margin-left: -23px;
  margin-top: -5px;
  width: 45px;
  border: 2px solid rgb(204, 204, 204);
  border-radius: 3px;
  padding: 1px;
  zoom: 1;
  animation: cssload-loader-border 1s ease-in infinite;
  -o-animation: cssload-loader-border 1s ease-in infinite;
  -ms-animation: cssload-loader-border 1s ease-in infinite;
  -webkit-animation: cssload-loader-border 1s ease-in infinite;
  -moz-animation: cssload-loader-border 1s ease-in infinite;
}
.cssload-loader > span {
  display: block;
  width: 0;
  height: 5px;
  background: rgb(204, 204, 204);
  position: relative;
  animation: cssload-loader-slide 1s ease-in infinite;
  -o-animation: cssload-loader-slide 1s ease-in infinite;
  -ms-animation: cssload-loader-slide 1s ease-in infinite;
  -webkit-animation: cssload-loader-slide 1s ease-in infinite;
  -moz-animation: cssload-loader-slide 1s ease-in infinite;
}
.cssload-loader:before,
.cssload-loader:after {
  content: '';
  display: block;
  background: white;
  height: 5px;
  width: 1px;
  position: absolute;
  z-index: 10;
}
.cssload-loader:before {
  left: 33%;
}
.cssload-loader:after {
  top: 1px;
  left: 66%;
}
.cssload-loader:before {
  content: '';
  display: block;
}
.cssload-loader:after {
  content: '';
  display: table;
  clear: both;
}

.cssload-loader-border {
  border-color: white;
  width: 45px;
  margin-left: -23px;
}
.cssload-loader-border {
  border-color: rgb(204, 204, 204);
  width: 45px;
  margin-left: -23px;
}
.cssload-loader-border {
  border-color: white;
  width: 45px;
  margin-left: -23px;
}

@keyframes cssload-loader-slide {
  0% {
    width: 0;
    margin-left: 0;
    opacity: 0;
  }
  0% {
    width: 0;
    margin-left: 0;
    opacity: 1;
  }
  50% {
    width: 0;
    margin-left: 0;
  }
  75% {
    width: 100%;
    margin-left: 0;
  }
  90% {
    width: 0;
    margin-left: 100%;
    opacity: 1;
  }
  100% {
    width: 0;
    margin-left: 100%;
    opacity: 0;
  }
}

@-o-keyframes cssload-loader-slide {
  0% {
    width: 0;
    margin-left: 0;
    opacity: 0;
  }
  0% {
    width: 0;
    margin-left: 0;
    opacity: 1;
  }
  50% {
    width: 0;
    margin-left: 0;
  }
  75% {
    width: 100%;
    margin-left: 0;
  }
  90% {
    width: 0;
    margin-left: 100%;
    opacity: 1;
  }
  100% {
    width: 0;
    margin-left: 100%;
    opacity: 0;
  }
}

@-ms-keyframes cssload-loader-slide {
  0% {
    width: 0;
    margin-left: 0;
    opacity: 0;
  }
  0% {
    width: 0;
    margin-left: 0;
    opacity: 1;
  }
  50% {
    width: 0;
    margin-left: 0;
  }
  75% {
    width: 100%;
    margin-left: 0;
  }
  90% {
    width: 0;
    margin-left: 100%;
    opacity: 1;
  }
  100% {
    width: 0;
    margin-left: 100%;
    opacity: 0;
  }
}

@-webkit-keyframes cssload-loader-slide {
  0% {
    width: 0;
    margin-left: 0;
    opacity: 0;
  }
  0% {
    width: 0;
    margin-left: 0;
    opacity: 1;
  }
  50% {
    width: 0;
    margin-left: 0;
  }
  75% {
    width: 100%;
    margin-left: 0;
  }
  90% {
    width: 0;
    margin-left: 100%;
    opacity: 1;
  }
  100% {
    width: 0;
    margin-left: 100%;
    opacity: 0;
  }
}

@-moz-keyframes cssload-loader-slide {
  0% {
    width: 0;
    margin-left: 0;
    opacity: 0;
  }
  0% {
    width: 0;
    margin-left: 0;
    opacity: 1;
  }
  50% {
    width: 0;
    margin-left: 0;
  }
  75% {
    width: 100%;
    margin-left: 0;
  }
  90% {
    width: 0;
    margin-left: 100%;
    opacity: 1;
  }
  100% {
    width: 0;
    margin-left: 100%;
    opacity: 0;
  }
}

@keyframes cssload-loader-border {
  0% {
    border-color: white;
    width: 45px;
    margin-left: -23px;
  }
  50% {
    border-color: rgb(204, 204, 204);
    width: 45px;
    margin-left: -23px;
  }
  100% {
    border-color: white;
    width: 45px;
    margin-left: -23px;
  }
}

@-o-keyframes cssload-loader-border {
  0% {
    border-color: white;
    width: 45px;
    margin-left: -23px;
  }
  50% {
    border-color: rgb(204, 204, 204);
    width: 45px;
    margin-left: -23px;
  }
  100% {
    border-color: white;
    width: 45px;
    margin-left: -23px;
  }
}

@-ms-keyframes cssload-loader-border {
  0% {
    border-color: white;
    width: 45px;
    margin-left: -23px;
  }
  50% {
    border-color: rgb(204, 204, 204);
    width: 45px;
    margin-left: -23px;
  }
  100% {
    border-color: white;
    width: 45px;
    margin-left: -23px;
  }
}

@-webkit-keyframes cssload-loader-border {
  0% {
    border-color: white;
    width: 45px;
    margin-left: -23px;
  }
  50% {
    border-color: rgb(204, 204, 204);
    width: 45px;
    margin-left: -23px;
  }
  100% {
    border-color: white;
    width: 45px;
    margin-left: -23px;
  }
}

@-moz-keyframes cssload-loader-border {
  0% {
    border-color: white;
    width: 45px;
    margin-left: -23px;
  }
  50% {
    border-color: rgb(204, 204, 204);
    width: 45px;
    margin-left: -23px;
  }
  100% {
    border-color: white;
    width: 45px;
    margin-left: -23px;
  }
}
</style>
