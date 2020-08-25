<template>
  <v-dialog persistent max-width="300px" v-model="showDialogDelete">
    <v-card>
      <v-card-title>¿Desea eliminar {{ title }}?</v-card-title>
      <v-card-actions vuetify-center>
        <v-btn
          text
          color="orange"
          dark
          class="pa-auto ml-auto"
          @click="showDialogDelete = false"
          >CANCELAR</v-btn
        >
        <v-btn
          text
          color="orange"
          dark
          class="px-auto mr-auto"
          @click="$emit('delete', true)"
          >ELIMINAR</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    value: {
      type: Boolean
    }
  },
  computed: {
    showDialogDelete: {
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
