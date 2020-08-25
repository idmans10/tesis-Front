<template>
  <v-dialog persistent max-width="425px" v-model="showDialogUser">
    <v-card>
      <v-card-title>{{ formTitle }}</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                color="#325d79"
                label="Nombre de usuario*"
                outlined
                v-model="editedItem.nombre_usuario"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                color="#325d79"
                label="Correo*"
                outlined
                v-model="editedItem.correo"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                color="#325d79"
                label="Telefono"
                outlined
                v-model.number="editedItem.telefono"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                color="#325d79"
                label="Contraseña*"
                type="password"
                outlined
                v-model="editedItem.contrasena"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select
                color="#325d79"
                :items="roles"
                label="Rol de Usuario*"
                outlined
                v-model="editedItem.id_rol"
                required
                v-if="tag !== 'myUser'"
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-combobox
                color="#325d79"
                :items="piscicolas"
                label="Piscícola"
                outlined
                v-model="editedItem.id_piscicolas"
                v-if="tag !== 'myUser'"
              ></v-combobox>
            </v-col>
          </v-row>
        </v-container>
        <small> * campo obligatorio </small>
      </v-card-text>
      <v-card-actions vuetify-center>
        <v-btn text color="orange" dark class="pa-auto ml-auto" @click="close()"
          >CANCELAR</v-btn
        >
        <v-btn text color="orange" dark class="px-6 mr-auto" @click="save()"
          >GUARDAR</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { postRequest } from '@/plugins/api.js'
export default {
  props: {
    selectedUser: {
      type: Object
    },
    title: {
      type: Number
    },
    roles: {
      type: Array
    },
    piscicolas: {
      type: Array
    },
    tag: {
      type: String
    },
    value: {
      type: Boolean
    }
  },
  created() {},
  data() {
    return {
      editedItem: {
        nombre_usuario: '',
        telefono: null,
        correo: '',
        contrasena: '',
        id_rol: null,
        id_piscicolas: null
      },
      defaultItem: {
        nombre_usuario: '',
        telefono: null,
        correo: '',
        contrasena: '',
        id_rol: null,
        id_piscicolas: null
      }
    }
  },
  methods: {
    updateUser() {
      //esto es de vivi
      //iguaa el v-model con la info de selected user que le llega del padre
      this.editedItem = Object.assign({}, this.selectedUser)
      this.editedItem.contrasena = ''
    },
    createUser() {
      const data = {
        nombre_usuario: this.editedItem.nombre_usuario,
        telefono: this.editedItem.telefono,
        correo: this.editedItem.correo,
        contrasena: this.editedItem.contrasena,
        id_rol: this.editedItem.id_rol,
        id_piscicolas: this.editedItem.id_piscicolas.value
      }
      console.log(data)
      postRequest('create_user', data).then(response => {
        if (response.data.res == 200) {
          alert(response.data.msg)
          this.close()
        } else alert(response.data.msg)
      })
    },
    editUser() {
      const data = {
        nombre_usuario: this.editedItem.nombre_usuario,
        telefono: this.editedItem.telefono,
        correo: this.editedItem.correo,
        contrasena: this.editedItem.contrasena,
        id_rol: this.editedItem.id_rol,
        id_piscicolas: this.editedItem.id_piscicolas.value
      }
      postRequest('edit_user', data).then(response => {
        if (response.data.res == 200) {
          alert(response.data.msg)
          this.close()
        } else alert(response.data.msg)
      })
    },
    close() {
      this.$emit('updateUsers')
      this.showDialogUser = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
      })
    },
    save() {
      if (this.title > -1) {
        this.editUser()
      } else {
        this.createUser()
      }
    }
  },
  computed: {
    formTitle() {
      this.updateUser()
      return this.title === -1 ? 'Nuevo Usuario' : 'Editar Usuario'
    },
    showDialogUser: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('input', v)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
