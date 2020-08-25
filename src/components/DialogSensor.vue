<template>
  <v-dialog persistent max-width="300px" v-model="showDialogSensor">
    <v-card>
      <v-card-title>Nuevo Sensor</v-card-title>
      <v-card-text>
        <v-text-field
          color="#325d79"
          label="Nombre del sensor"
          outlined
          v-model="editedItem.nombre_sensor"
        ></v-text-field>
        <v-text-field
          color="#325d79"
          label="Unidad de medida"
          outlined
          v-model="editedItem.unidad_medida"
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
    id_estanque: {
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
        nombre_sensor: '',
        unidad_medida: '',
        descripcion: ''
      },
      defaultItem: {
        nombre_sensor: '',
        unidad_medida: '',
        descripcion: ''
      }
    }
  },
  methods: {
    createSensor() {
      const data = {
        id_estanque: this.id_estanque,
        nombre_sensor: this.editedItem.nombre_sensor,
        unidad_medida: this.editedItem.unidad_medida,
        descripcion: this.editedItem.descripcion
      }
      postRequest('create_sensor', data).then(response => {
        if (response.data.res == 200) {
          alert(response.data.msg)
          this.close()
        } else alert(response.data.msg)
      })
    },
    close() {
      this.showDialogSensor = false
      this.$emit('updateSensores')
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
      })
    },
    save() {
      this.createSensor()
    }
  },
  computed: {
    showDialogSensor: {
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
