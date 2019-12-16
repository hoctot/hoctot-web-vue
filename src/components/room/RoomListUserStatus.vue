<template>
  <div class="flex justify-center" v-if="$STATE('room.current.users')">
    <div
      class="text-center inline-block mx-2 py-2"
      v-for="item in $STATE('room.current.users')"
      :key="item.uid"
    >
      <div class="">
        <img
          class="mx-auto border rounded-full border-green-500 "
          :src="item.photoURL"
          width="48"
        />
      </div>
      <p class="mt-2 text-sm">
        <span
          :class="[item.isReady ? 'bg-green-400' : 'bg-gray-500']"
          class="inline-block w-2 h-2 mx-auto rounded-full"
        ></span>
        {{ item.displayName }}
      </p>
      <p class="mt-2 text-sm">
        Điểm:
        <span v-text="item.score ? item.score : 0"> </span> /
        {{ $STATE('room.current.ruleWin[2]') + 1 }}
      </p>
    </div>
  </div>
</template>
