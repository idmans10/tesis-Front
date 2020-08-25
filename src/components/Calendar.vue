<template>
  <v-menu
    ref="menu"
    :close-on-content-click="false"
    :return-value.sync="fechaObtenida"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="fechaObtenida"
        :label="'Seleccione Fecha ' + title"
        prepend-icon="fa-calendar-week"
        readonly
        v-on="on"
        color="#325d79"
      ></v-text-field>
    </template>
    <v-date-picker color="#325d79" v-model="fechaObtenida" no-title scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="orange" dark @click="menu = false">Cancel</v-btn>
      <v-btn
        text
        color="orange"
        dark
        @click="
          $refs.menu.save(fechaObtenida), $emit('selectedDate', fechaObtenida)
        "
        >OK</v-btn
      >
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },

    value: {
      type: String
    }
  },
  created() {},
  data() {
    return {
      datos: "",
      fechaObtenida: ""
    };
  },

  computed: {
    date: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("input", v);
      }
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped></style>
