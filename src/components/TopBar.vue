<template>
  <v-app-bar color="orange" dark app>
    <v-app-bar-nav-icon @click="$emit('change-show', !show)"></v-app-bar-nav-icon>

    <v-toolbar-title>DataFish IoT - iv</v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped></style>
