<template>
  <v-dialog persistent max-width="350px" v-model="showDialogPiscicola">
    <v-card>
      <v-card-title>{{ formTitle }}</v-card-title>
      <v-card-text>
        <v-text-field
          color="#325d79"
          label="Nombre de la piscicola"
          outlined
          v-model="editedItem.nombre_piscicola"
        ></v-text-field>

        <v-text-field
          color="#325d79"
          label="Ubicación"
          outlined
          v-model="editedItem.ubicacion"
        ></v-text-field>

        <v-text-field
          color="#325d79"
          label="Descripción"
          outlined
          v-model="editedItem.descripcion"
        ></v-text-field>
      </v-card-text>
      <v-card-actions vuetify-center>
        <v-btn text color="orange" dark class="pa-auto ml-auto" @click="close"
          >CANCELAR</v-btn
        >
        <v-btn text color="orange" dark class="px-6 mr-auto" @click="save"
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
    selectedPiscicola: {
      type: Object
    },
    title: {
      type: Number
    },
    id_piscicola: {
      type: Number
    },
    value: {
      type: Boolean
    }
  },
  created() {},
  data() {
    return {
      editedItem: {
        nombre_piscicola: '',
        ubicacion: '',
        descripcion: ''
      },
      defaultItem: {
        nombre_piscicola: '',
        ubicacion: '',
        descripcion: ''
      }
    }
  },
  methods: {
    updatePiscicola() {
      //esto es de viviaaadss
      //iguaa el v-model con la info de selected user que le llega del padre
      if (this.title === 0) {
        this.editedItem = Object.assign({}, this.defaultItem)
      } else {
        this.editedItem = Object.assign({}, this.selectedPiscicola)
      }
    },
    createPiscicola() {
      const data = {
        nombre_piscicola: this.editedItem.nombre_piscicola,
        ubicacion: this.editedItem.ubicacion,
        descripcion: this.editedItem.descripcion
      }
      postRequest('create_piscicola', data).then(response => {
        if (response.data.res == 200) {
          alert(response.data.msg)
          this.close()
        } else alert(response.data.msg)
      })
    },
    editPiscicola() {
      const data = {
        id_piscicolas: this.selectedPiscicola.id_piscicolas,
        nombre_piscicola: this.editedItem.nombre_piscicola,
        ubicacion: this.editedItem.ubicacion,
        descripcion: this.editedItem.descripcion
      }
      postRequest('edit_piscicola', data).then(response => {
        if (response.data.res == 200) {
          alert(response.data.msg)
          this.close()
        } else alert(response.data.msg)
      })
    },
    close() {
      this.showDialogPiscicola = false
      this.$emit('updatePiscicolas')
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
      })
    },
    save() {
      if (this.title === 0) {
        this.createPiscicola()
      } else {
        this.editPiscicola()
      }
    }
  },
  computed: {
    formTitle() {
      this.updatePiscicola()
      return this.title === 0 ? 'Nuevo Usuario' : 'Editar Usuario'
    },
    showDialogPiscicola: {
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
