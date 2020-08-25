<template>
  <v-container>
    <v-row class="pt-6 mt-6">
      <v-col align="center">
        <v-card shaped max-width="350px" elevation="5">
          <v-card-title>Iniciar Sesión</v-card-title>
          <v-card-text>
            <v-text-field
              color="#325d79"
              v-model="user"
              label="Usuario"
              outlined
            ></v-text-field>
            <v-text-field
              color="#325d79"
              label="Contraseña"
              v-model="password"
              :type="show1 ? 'text' : 'password'"
              outlined
            ></v-text-field>
            <v-checkbox
              v-model="show1"
              color="#325d79"
              label="Mostrar Contraseña"
            ></v-checkbox>
            <a style="color:#325d79" href>¿Olvidaste tu Contraseña?</a>
          </v-card-text>
          <v-card-actions>
            <v-btn
              outlined
              color="#325d79"
              width="30%"
              dark
              class="pa-auto ma-auto"
              @click="login"
              >INGRESAR</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { postRequest } from '@/plugins/api.js'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      show1: false,
      user: '',
      password: ''
    }
  },
  methods: {
    login() {
      const handleReponse = response => {
        if (response.data.res == 200) {
          console.log(response.data.data)
          this.saveToken(response.data.data.token)
          this.$router.push({ name: 'home' })
        } else alert(response.data.msg)
      }

      postRequest('login', {
        nombre_usuario: this.user,
        contrasena: this.password
      }).then(handleReponse)
    },
    ...mapActions(['saveToken'])
  }
}
</script>

<style lang="scss" scoped></style>
