<template>
  <v-navigation-drawer app :value="show" color="#fffdf4">
    <v-divider></v-divider>
    <p />
    <v-img
      width="50%"
      class="mx-auto"
      src="https://cdn2.iconfinder.com/data/icons/character-8/100/people_character_avatar_2-32-256.png"
    ></v-img>
    <p />
    <p class="text-center">{{ editedItem.nombre_usuario }}</p>
    <p class="text-center">{{ editedItem.correo }}</p>

    <v-list dense nav>
      <v-list-item :to="items[0].to">
        <v-list-item-icon>
          <v-icon color="#325d79">{{ items[0].icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ items[0].title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item :to="items[1].to" @click="editMyUser()">
        <v-list-item-icon>
          <v-icon color="#325d79">{{ items[1].icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ items[1].title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click="logout()">
        <v-list-item-icon>
          <v-icon color="#325d79">{{ items[2].icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ items[2].title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <p class="caption font-weight-regular text-center">Realizado por:</p>
      <p class="caption font-weight-light text-center">Einny Viviana Jiménez Ramírez</p>
      <p class="caption font-weight-light text-center">Iván Darío Ángel Español</p>
      <div class="pb-2">
        <v-img
          max-width="200px"
          class="ma-auto"
          src="https://www.udistrital.edu.co/themes/custom/versh/logo.png"
        ></v-img>
      </div>
    </template>
    <DialogUser
      :selectedUser="editedItem"
      :title="editedIndex"
      tag="myUser"
      v-model="showDialog"
      @updateUsers="loggedUser"
    />
  </v-navigation-drawer>
</template>

<script>
import DialogUser from '@/components/DialogUser.vue'
import { postRequest } from '@/plugins/api.js'
import { mapActions } from 'vuex'
export default {
  components: {
    DialogUser
  },
  props: {
    show: {
      type: Boolean
    }
  },
  created() {
    this.loggedUser()
    this.loggedUserPiscicola()
  },
  data() {
    return {
      showDialog: false,
      editedIndex: 0,
      items: [
        {
          title: 'Inicio',
          icon: 'fa-home',
          to: '/'
        },
        {
          title: 'Editar Mi Perfil',
          icon: 'fa-cog'
        },
        {
          title: 'Salir',
          icon: 'fa-sign-out-alt',
          to: '/login'
        }
      ],
      editedItem: {
        nombre_usuario: '',
        correo: '',
        telefono: null,
        contrasena: '',
        id_piscicolas: null,
        id_rol: null
      },
      piscicolas: []
    }
  },
  methods: {
    editMyUser() {
      this.editedItem.id_piscicolas = this.piscicolas[0]
      this.showDialog = true
      this.loggedUser()
      this.loggedUserPiscicola()
    },
    loggedUser() {
      postRequest('myuser').then(response => {
        if (response.data.res == 200) {
          this.editedItem.nombre_usuario = response.data.data[0].nombre_usuario
          this.editedItem.correo = response.data.data[0].correo
          this.editedItem.telefono = response.data.data[0].telefono
          this.editedItem.contrasena = ''
          this.editedItem.id_rol = response.data.data[0].id_rol
        } else alert(response.data.msg)
        console.log('usuario logeado:')
        console.log(this.editedItem)
      })
    },
    loggedUserPiscicola() {
      postRequest('piscicolas').then(response => {
        if (response.data.res == 200) {
          this.piscicolas = response.data.data.map(piscicola => ({
            text: piscicola.nombre_piscicola,
            value: piscicola.id_piscicolas
          }))
        } else alert(response.data.msg)
      })
      console.log('piscicolas')
      console.log(this.piscicolas)
    },
    logout() {
      this.deleteToken('')
      this.$router.push('login')
    },
    ...mapActions(['deleteToken'])
  }
}
</script>

<style lang="scss" scoped></style>
