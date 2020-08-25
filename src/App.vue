<template>
  <v-app>
    <SideBar :show="show" v-if="$route.name != 'login' && show"></SideBar>
    <TopBar :show="show" @change-show="v => (show = v)" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import TopBar from "@/components/TopBar.vue";

export default {
  name: "App",
  components: {
    SideBar,
    TopBar
  },
  data() {
    return {
      show: false
    };
  }
};
</script