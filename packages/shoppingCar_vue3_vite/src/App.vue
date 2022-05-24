<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>

<template>
  <router-view v-slot="{ Component, route }">
      <keep-alive v-if="route.meta.keepAlive">
        <component :is="Component">{{route.meta.keepAlive}}</component>
      </keep-alive>
      <component :is="Component" v-else />
  </router-view>
</template>

<style>
html,body {
  margin: 0;
  padding: 0;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  user-select: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
  position: relative;
  /* padding: 0 10px; */
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
