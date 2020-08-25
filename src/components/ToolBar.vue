<template>
  <v-toolbar>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-autocomplete color="#325d79" class="mx-4" flat hide-no-data hide-details label="Seleccionar"></v-autocomplete>
  </v-toolbar>
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
    showDialogCreate: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("input", v);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
