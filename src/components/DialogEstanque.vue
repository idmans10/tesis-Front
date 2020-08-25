<template>
  <v-dialog persistent max-width="300px" v-model="showDialogEstanque">
    <v-card>
      <v-card-title>{{ formTitle }}</v-card-title>
      <v-card-text>
        <v-text-field
          color="#325d79"
          label="Nombre de la Estanque"
          outlined
          v-model="editedItem.nombre_estanque"
        ></v-text-field>
        <v-text-field
          color="#325d79"
          label="Descripción"
          outlined
          v-model.number="editedItem.descripcion"
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
    selectedEstanque: {
      type: Object
    },
    title2: {
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
        nombre_estanque: '',
        descripcion: ''
      },
      defaultItem: {
        nombre_estanque: '',
        descripcion: ''
      }
    }
  },
  methods: {
    updateEstanque() {
      //esto es de viviaaadss
      //iguaa el v-model con la info de selected user que le llega del padre
      if (this.title2 === 0) {
        this.editedItem = Object.assign({}, this.defaultItem)
      } else {
        this.editedItem = Object.assign({}, this.selectedEstanque)
      }
    },
    createEstanque() {
      const data = {
        id_piscicolas: this.id_piscicola,
        nombre_estanque: this.editedItem.nombre_estanque,
        descripcion: this.editedItem.descripcion
      }
      postRequest('create_estanque', data).then(response => {
        if (response.data.res == 200) {
          alert(response.data.msg)
          this.close()
        } else alert(response.data.msg)
      })
    },
    editEstanque() {
      //falta envias id_estanque
      postRequest('edit_estanque', {
        nombre_estanque: this.editedItem.nombre_estanque,
        descripcion: this.editedItem.descripcion
      }).then(response => {
        if (response.data.res == 200) {
          alert(response.data.msg)
          this.close()
        } else alert(response.data.msg)
      })
    },
    close() {
      this.showDialogEstanque = false
      this.$emit('updateEstanques')
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
      })
    },
    save() {
      if (this.title2 === 0) {
        this.createEstanque()
      } else {
        this.editEstanque()
      }
    }
  },
  computed: {
    formTitle() {
      this.updateEstanque()
      return this.title2 === 0 ? 'Nuevo Estanque' : 'Editar Estanque'
    },
    showDialogEstanque: {
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
