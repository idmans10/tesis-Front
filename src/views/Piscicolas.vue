<template>
  <v-container>
    <v-row>
      <v-col xs="12" sm="6">
        <v-card class="pa-2 ma-5" width="350px" shaped>
          <v-card-title>Piscícola</v-card-title>
          <v-card-text>
            <v-combobox
              color="#325d79"
              item-color="#325d79"
              solo
              hide-details
              class="mb-5"
              :label="id_piscicolas.text"
              :items="piscicolas"
              @change="() => updateEstanques()"
              @click="id_estanque = id_estanqueDefaul"
              v-model="id_piscicolas"
            ></v-combobox>
            <p class="pb-1">Ubicación: {{ selectedPiscicola.ubicacion }}</p>
            <p>Descripción: {{ selectedPiscicola.descripcion }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn-toggle color="#325d79" v-model="title" mandatory>
              <v-btn>
                <v-icon
                  color="#325d79"
                  :disabled="show1 ? false : true"
                  @click="showDialogPiscicola = true"
                  >fa-plus</v-icon
                >
              </v-btn>
              <v-btn>
                <v-icon
                  color="#325d79"
                  @click="showDialogDeletePiscicola = true"
                  :disabled="id_piscicolas.value ? false : true"
                  >fa-trash-alt</v-icon
                >
              </v-btn>
              <v-btn>
                <v-icon
                  color="#325d79"
                  @click="selectedItemPiscicola(), (showDialogPiscicola = true)"
                  :disabled="id_piscicolas.value ? false : true"
                  >fa-edit</v-icon
                >
              </v-btn>
            </v-btn-toggle>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col xs="12" sm="6">
        <v-card
          class="pa-2 ma-5"
          width="350px"
          shaped
          :disabled="id_piscicolas.value ? false : true"
        >
          <v-card-title>Estanque</v-card-title>
          <v-card-text class="mt-2">
            <v-combobox
              color="#325d79"
              item-color="#325d79"
              solo
              hide-details
              class="mb-12"
              :label="id_estanque.text"
              :items="estanques"
              @change="() => updateSensores()"
              v-model="id_estanque"
            ></v-combobox>
            <p>Descripción: {{ selectedEstanque.descripcion }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn-toggle color="#325d79" v-model="title2" mandatory>
              <v-btn>
                <v-icon
                  color="#325d79"
                  :disabled="show1 ? false : true"
                  @click="showDialogEstanque = true"
                  >fa-plus</v-icon
                >
              </v-btn>
              <v-btn>
                <v-icon
                  color="#325d79"
                  @click="showDialogDeleteEstanque = true"
                  :disabled="id_estanque.value ? false : true"
                  >fa-trash-alt</v-icon
                >
              </v-btn>
              <v-btn>
                <v-icon
                  color="#325d79"
                  @click="selectedItemEstanque(), (showDialogEstanque = true)"
                  :disabled="id_estanque.value ? false : true"
                  >fa-edit</v-icon
                >
              </v-btn>
            </v-btn-toggle>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-btn
          color="#325d79"
          class="px-5 mt-5"
          outlined
          :disabled="id_estanque.value ? false : true"
          v-if="show1"
          @click="showDialogSensor = true"
          >Crear Sensor</v-btn
        >
      </v-col>
      <v-col cols="6">
        <v-text-field
          color="#325d79"
          class="px-5 mt-5"
          outlined
          dense
          v-model="search"
          label="Buscar Sensor"
          prepend-inner-icon="fa-search"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="sensores"
          :search="search"
          class="elevation-5"
        >
          <template v-slot:top>
            <v-toolbar flat color="#325d79" dark>
              <v-toolbar-title>Sensores Registrados</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              color="#325d79"
              @click="deleteItem(), (selectedSensor = item)"
              >fa-trash-alt</v-icon
            >
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <DialogPiscicola
      :selectedPiscicola="selectedPiscicola"
      :title="title"
      :id_piscicola="id_piscicolas.value"
      v-model="showDialogPiscicola"
      @updatePiscicolas="updatePiscicolas"
    />
    <DialogEstanque
      :selectedEstanque="selectedEstanque"
      :title2="title2"
      :id_piscicola="id_piscicolas.value"
      v-model="showDialogEstanque"
      @updateEstanques="updateEstanques"
    />
    <DialogSensor
      :id_estanque="id_estanque.value"
      v-model="showDialogSensor"
      @updateSensores="updateSensores"
    />

    <DialogDelete
      title="Piscícola"
      variable="Piscicola"
      v-model="showDialogDeletePiscicola"
      @delete="deletePiscicola"
    />
    <DialogDelete
      title="Estanque"
      variable="Estanque"
      v-model="showDialogDeleteEstanque"
      @delete="deleteEstanque"
    />
    <DialogDelete
      title="Sensor"
      variable="Sensor"
      v-model="showDialogDeleteSensor"
      @delete="deleteSensor"
    />
  </v-container>
</template>

<script>
import DialogPiscicola from "@/components/DialogPiscicola.vue";
import DialogEstanque from "@/components/DialogEstanque.vue";
import DialogSensor from "@/components/DialogSensor.vue";
import DialogDelete from "@/components/DialogDelete.vue";
import { postRequest } from "@/plugins/api.js";
export default {
  components: {
    DialogPiscicola,
    DialogEstanque,
    DialogSensor,
    DialogDelete
  },
  created() {
    this.updatePiscicolas();
    this.loggedUser();
  },
  data() {
    return {
      show1: true,
      title: null,
      title2: null,
      selectedPiscicola: {
        descripcion: "",
        id_piscicolas: null,
        id_usuario: null,
        nombre_piscicola: "",
        ubicacion: ""
      },
      selectedEstanque: {
        id_estanque: null,
        id_piscicolas: null,
        nombre_estanque: "",
        descripcion: ""
      },
      selectedSensor: null,
      search: "",
      showDialogPiscicola: false,
      showDialogEstanque: false,
      showDialogDeleteEstanque: false,
      showDialogDeletePiscicola: false,
      showDialogDeleteSensor: false,
      showDialogSensor: false,
      showDialogEditPiscicola: false,
      showDialogEditEstanque: false,
      headers: [
        {
          text: "id",
          value: "id_sensores"
        },
        {
          text: "Sensor",
          value: "nombre_sensor"
        },
        {
          text: "Unidad de medida",
          value: "unidad_medida"
        },
        {
          text: "Descripción",
          sortable: false,
          value: "descripcion"
        },
        {
          text: "Acción",
          sortable: false,
          value: "actions"
        }
      ],
      sensores: [],
      sensoresfull: [],
      piscicolas: [],
      piscicolasfull: [],
      estanquesfull: [],
      estanques: [],
      id_piscicolas: { text: "Seleccionar piscícola", value: 0 },
      id_estanque: { text: "Seleccionar Estanque", value: 0 },
      id_estanqueDefaul: { text: "Seleccionar Estanque", value: 0 },
      id_rol: null
    };
  },
  methods: {
    loggedUser() {
      postRequest("myuser").then(response => {
        if (response.data.res == 200) {
          this.id_rol = response.data.data[0].id_rol;
        } else alert(response.data.msg);
        console.log("id_rol:");
        console.log(this.id_rol);
        if (this.id_rol === 4) this.show1 = false;
      });
    },
    selectedItemPiscicola() {
      this.selectedPiscicola = this.piscicolasfull.find(
        x => x.id_piscicolas === this.id_piscicolas.value
      );
      //this.showDialogPiscicola = true
    },
    selectedItemEstanque() {
      this.selectedEstanque = this.estanquesfull.find(
        x => x.id_estanque === this.id_estanque.value
      );
      console.log("---->");
      console.log(this.selectedEstanque);
      //this.showDialogEstanque = true
    },
    updatePiscicolas() {
      postRequest("piscicolas").then(response => {
        if (response.data.res == 200) {
          this.piscicolas = response.data.data.map(piscicola => ({
            text: piscicola.nombre_piscicola,
            value: piscicola.id_piscicolas
          }));
          this.piscicolasfull = response.data.data;
        } else alert(response.data.msg);
      });
    },
    updateEstanques() {
      console.log("--->>>");
      console.log(this.id_piscicolas);
      postRequest("estanques", {
        id_piscicolas: this.id_piscicolas.value
      }).then(response => {
        if (response.data.res == 200) {
          this.estanques = response.data.data.map(estanque => ({
            text: estanque.nombre_estanque,
            value: estanque.id_estanque
          }));
          this.estanquesfull = response.data.data;
          this.selectedItemPiscicola();
        }
      });
    },
    updateSensores() {
      console.log("id_estanque--->>");
      console.log(this.id_estanque);
      postRequest("sensores", { id_estanque: this.id_estanque.value }).then(
        response => {
          if (response.data.res == 200) {
            this.sensores = response.data.data;
            this.sensoresfull = response.data.data;
            this.selectedItemEstanque();
          }
        }
      );
    },
    deletePiscicola() {
      this.selectedPiscicola = this.piscicolasfull.find(
        x => x.id_piscicolas === this.id_piscicolas.value
      );
      postRequest("delete_piscicola", {
        nombre_piscicola: this.selectedPiscicola.nombre_piscicola,
        id_piscicolas: this.selectedPiscicola.id_piscicolas
      }).then(response => {
        if (response.data.res == 200) {
          this.updatePiscicolas();
          alert(response.data.msg);
          this.showDialogDeletePiscicola = false;
        } else alert(response.data.msg);
      });
    },
    deleteEstanque() {
      this.selectedEstanque = this.estanquesfull.find(
        x => x.id_estanque === this.id_estanque.value
      );
      postRequest("delete_estanque", {
        nombre_estanque: this.selectedEstanque.nombre_estanque,
        id_estanque: this.selectedEstanque.id_estanque
      }).then(response => {
        if (response.data.res == 200) {
          this.updateEstanques();
          alert(response.data.msg);
          this.showDialogDeleteEstanque = false;
        } else alert(response.data.msg);
      });
    },
    deleteItem() {
      this.showDialogDeleteSensor = true;
    },

    deleteSensor() {
      postRequest("delete_sensor", {
        nombre_sensor: this.selectedSensor.nombre_sensor,
        id_sensores: this.selectedSensor.id_sensores
      }).then(response => {
        if (response.data.res == 200) {
          this.updateSensores();
          this.showDialogDeleteSensor = false;
          alert(response.data.msg);
        } else alert(response.data.msg);
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
