<template>
  <v-dialog width="30%" v-model="showDialogCreate">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <v-text-field
          color="#325d79"
          :label="'Nombre de ' + variable"
          outlined
          v-model="editedItem.nombre"
        ></v-text-field>
        <v-text-field
          color="#325d79"
          label="Telefono"
          outlined
          v-if="$route.name == 'users' || variable == 'miusuario'"
          v-model.number="editedItem.telefono"
        ></v-text-field>

        <v-text-field
          color="#325d79"
          label="Correo"
          outlined
          v-if="$route.name == 'users' || variable == 'miusuario'"
          v-model="editedItem.correo"
        ></v-text-field>

        <v-text-field
          color="#325d79"
          label="Contraseña"
          type="password"
          outlined
          v-if="$route.name == 'users' || variable == 'miusuario'"
          v-model="editedItem.contrasena"
        ></v-text-field>

        <v-select
          color="#325d79"
          :items="roles"
          label="Rol de Usuario"
          outlined
          v-if="$route.name == 'users' || variable == 'miusuario'"
          v-model="editedItem.id_rol"
        ></v-select>

        <v-select
          color="#325d79"
          :items="piscicolas"
          label="Piscícola"
          outlined
          v-if="$route.name == 'users' && variable !== 'miusuario'"
          v-model="editedItem.id_piscicolas"
        ></v-select>

        <v-text-field
          color="#325d79"
          :label="'Descripción de ' + variable"
          outlined
          v-if="$route.name == 'piscicolas' && variable !== 'miusuario'"
          v-model="editedItem.descripcion"
        ></v-text-field>
        <v-text-field
          color="#325d79"
          :label="'Ubicación de ' + variable"
          outlined
          v-if="variable == 'Piscícola'"
          v-model="editedItem.ubicacion"
        ></v-text-field>
        <v-text-field
          color="#325d79"
          label="Unidad de Medida"
          outlined
          v-if="variable == 'Sensor'"
          v-model="editedItem.unidad_medida"
        ></v-text-field>
      </v-card-text>
      <v-card-actions vuetify-center>
        <v-btn text color="orange" dark class="pa-auto ml-auto" @click="close"
          >CANCELAR</v-btn
        >

        <v-btn
          text
          color="orange"
          dark
          class="px-6 mr-auto"
          @click="createUser"
          v-if="$route.name == 'users' && action == 'crear'"
          >GUARDAR</v-btn
        >

        <v-btn
          text
          color="orange"
          dark
          class="px-6 mr-auto"
          @click="createPiscicola"
          v-else-if="variable == 'Piscícola' && action == 'crear'"
          >GUARDAR</v-btn
        >

        <v-btn
          text
          color="orange"
          dark
          class="px-6 mr-auto"
          @click="createEstanque"
          v-else-if="variable == 'Estanque' && action == 'crear'"
          >GUARDAR</v-btn
        >

        <v-btn
          text
          color="orange"
          dark
          class="px-6 mr-auto"
          @click="createSensor"
          v-else-if="variable == 'Sensor' && action == 'crear'"
          >GUARDAR</v-btn
        >

        <v-btn
          text
          color="orange"
          dark
          class="px-6 mr-auto"
          @click="editUser"
          v-if="$route.name == 'users' && action == 'editar'"
          >GUARDAR</v-btn
        >

        <v-btn
          text
          color="orange"
          dark
          class="px-6 mr-auto"
          @click="editPiscicola"
          v-else-if="variable == 'Piscícola' && action == 'editar'"
          >GUARDAR</v-btn
        >

        <v-btn
          text
          color="orange"
          dark
          class="px-6 mr-auto"
          @click="editEstanque"
          v-else-if="variable == 'Estanque' && action == 'editar'"
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
    title: {
      type: String
    },
    variable: {
      type: String
    },
    action: {
      type: String
    },
    roles: {
      type: Array
    },
    piscicolas: {
      type: Array
    },
    id_piscicolas: {
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
        nombre: '',
        telefono: null,
        correo: '',
        contrasena: '',
        id_rol: null,
        id_piscicolas: null,
        ubicacion: '',
        descripcion: '',
        unidad_medida: ''
      },
      defaultItem: {
        nombre: '',
        telefono: null,
        correo: '',
        contrasena: '',
        id_rol: null,
        id_piscicolas: null,
        ubicacion: '',
        descripcion: '',
        unidad_medida: ''
      }
    }
  },
  methods: {
    createUser() {
      const data = {
        nombre_usuario: this.editedItem.nombre,
        telefono: this.editedItem.telefono,
        correo: this.editedItem.correo,
        contrasena: this.editedItem.contrasena,
        id_rol: this.editedItem.id_rol,
        id_piscicolas: this.editedItem.id_piscicolas.value
      }
      postRequest('create_user', data).then(response => {
        if (response.data.res == 200) {
          this.showDialogCreate = false
          this.$emit('updateUsers')
        } else alert(response.data.msg)
      })
    },
    createPiscicola() {
      postRequest('create_piscicola', {
        nombre_piscicola: this.editedItem.nombre,
        ubicacion: this.editedItem.ubicacion,
        descripcion: this.editedItem.descripcion
      }).then(response => {
        if (response.data.res == 200) {
          this.showDialogCreate = false
        } else alert(response.data.msg)
      })
    },
    createEstanque() {
      postRequest('create_estanque', {
        id_piscicolas: this.id_piscicolas,
        nombre_estanque: this.editedItem.nombre,
        descripcion: this.editedItem.descripcion
      }).then(response => {
        if (response.data.res == 200) {
          this.showDialogCreate = false
        } else alert(response.data.msg)
      })
    },
    createSensor() {
      postRequest('create_sensor', {
        id_estanque: this.editedItem.id_estanque,
        nombre_sensor: this.editedItem.nombre,
        descripcion: this.editedItem.descripcion,
        unidad_medida: this.editedItem.unidad_medida
      }).then(response => {
        if (response.data.res == 200) {
          this.showDialogCreate = false
        } else alert(response.data.msg)
      })
    },
    editUser() {
      postRequest('edit_user', {
        nombre_usuario: this.editedItem.nombre,
        telefono: this.editedItem.telefono,
        correo: this.editedItem.correo,
        contrasena: this.editedItem.contrasena,
        id_rol: this.editedItem.id_rol,
        id_piscicolas: this.editedItem.id_piscicolas
      }).then(response => {
        if (response.data.res == 200) {
          this.showDialogCreate = false
        } else alert(response.data.msg)
      })
    },
    editPiscicola() {
      postRequest('edit_piscicola', {
        id_piscicolas: this.editedItem.id_piscicolas,
        nombre_piscicola: this.editedItem.nombre,
        ubicacion: this.editedItem.ubicacion,
        descripcion: this.editedItem.descripcion
      }).then(response => {
        if (response.data.res == 200) {
          this.showDialogCreate = false
        } else alert(response.data.msg)
      })
    },
    editEstanque() {
      postRequest('edit_estanque', {
        id_estanque: this.editedItem.id_estanque,
        nombre_estanque: this.editedItem.nombre,
        descripcion: this.editedItem.descripcion
      }).then(response => {
        if (response.data.res == 200) {
          this.showDialogCreate = false
        } else alert(response.data.msg)
      })
    },
    close() {
      this.showDialogCreate = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
      })
    }
  },
  computed: {
    showDialogCreate: {
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
