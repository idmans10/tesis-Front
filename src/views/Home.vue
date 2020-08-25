<template>
  <v-container>
    <v-row>
      <v-col
        align="center"
        class="py-6 my-6"
        cols="6"
        v-for="route in routes"
        :key="route.id"
      >
        <v-btn color="#325d79" fab outlined x-large class="ma-3" :to="route.to" :disabled="route.show1 ? false : true">
          <v-icon x-large>{{ route.icon }}</v-icon>
        </v-btn>
        <p>{{ route.title }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { postRequest } from '@/plugins/api.js'
export default {
  created() {
    this.loggedUser()
  },
  data() {
    return {
      routes: [
        {
          title: 'Gestión de Usuarios',
          icon: 'fa-user',
          to: '/users',
          show1: true
        },
        {
          title: 'Reportes',
          icon: 'fa-file-alt',
          to: '/reports',
          show1: true
        },
        {
          title: 'Gestión de Piscícolas',
          icon: 'fa-fish',
          to: '/piscicolas',
          show1: true
        },
        {
          title: 'Visualización',
          icon: 'fa-chart-area',
          to: '/visualizacion',
          show1: true
        }
      ],
      id_rol: null
    }
  },
  methods: {
    loggedUser() {
      postRequest('myuser').then(response => {
        if (response.data.res == 200) {
          this.id_rol = response.data.data[0].id_rol
        } else alert(response.data.msg)
        console.log('id_rol:')
        console.log(this.id_rol)
        console.log(this.routes)
        if (this.id_rol === 3) {
          this.routes[0].show1 = false
          this.routes[2].show1 = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
