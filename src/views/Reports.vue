<template>
  <v-container>
    <v-row>
      <v-col xs="12" sm="6">
        <v-card class="pa-1 mx-10" width="350px" shaped elevation="5">
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
              @change="() => selectedItemPiscicola()"
              @click="id_estanque = id_estanqueDefaul"
              v-model="id_piscicolas"
            ></v-combobox>
            <p class="pb-1">Ubicación: {{ selectedPiscicola.ubicacion }}</p>
            <p>Descripción: {{ selectedPiscicola.descripcion }}</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col xs="12" sm="6">
        <v-card
          class="pa-1 mx-10"
          width="350px"
          shaped
          elevation="5"
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
              @change="() => selectedItemEstanque()"
              v-model="id_estanque"
            ></v-combobox>
            <p>Descripción: {{ selectedEstanque.descripcion }}</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          class="pa-1 mx-10"
          width="350px"
          shaped
          elevation="5"
          :disabled="id_estanque.value ? false : true"
        >
          <v-card-text>
            <Calendar title="Inicial" @selectedDate="selectedInitDate" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          class="pa-1 mx-10"
          width="350px"
          shaped
          elevation="5"
          :disabled="initDateBandera ? false : true"
        >
          <v-card-text>
            <Calendar title="Final" @selectedDate="selectedFinalDate" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col xs="12" sm="6">
        <v-card
          class="pa-1 mx-10"
          width="350px"
          shaped
          elevation="5"
          :disabled="id_estanque.value ? false : true"
        >
          <v-card-title>Reporte de Indicadores</v-card-title>
          <v-card-text
            >Se generará un reporte en formato .csv con los indicadores (avg,
            mín, máx) del último mes, última semana, día anterior y día
            actual</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>

            <download-csv :data="dataCalculadafull" name="Indicadores.csv">
              <v-btn color="#325d79" outlined>Descargar</v-btn>
            </download-csv>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col xs="12" sm="6">
        <v-card
          class="pa-1 mx-10"
          width="350px"
          shaped
          elevation="5"
          :disabled="finalDateBandera ? false : true"
        >
          <v-card-title>Reporte Histórico de Mediciones</v-card-title>
          <v-card-text
            >Se generará un reporte en formato .csv con el histórico de
            mediciones del estanque y rango de fechas seleccionado</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <download-csv
              :data="medicionesfull"
              name="Historico_Mediciones.csv"
            >
              <v-btn color="#325d79" outlined>Descargar</v-btn>
            </download-csv>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//import ToolBar from '@/components/ToolBar.vue'
import Calendar from "@/components/Calendar.vue";
import { postRequest } from "@/plugins/api.js";
export default {
  components: {
    //  ToolBar,
    Calendar
  },
  created() {
    this.updatePiscicolas();
  },
  data() {
    return {
      id_piscicolas: { text: "Seleccionar piscícola", value: 0 },
      id_estanque: { text: "Seleccionar Estanque", value: 0 },
      id_estanqueDefaul: { text: "Seleccionar Estanque", value: 0 },
      initDate: new Date().toISOString().substr(0, 10),
      initDateBandera: false,
      finalDate: new Date().toISOString().substr(0, 10),
      finalDateBandera: false,
      medicionesfull: [],
      dataCalculadafull: [],
      estanques: [],
      estanquesfull: [],
      selectedEstanque: {
        id_estanque: null,
        id_piscicolas: null,
        nombre_estanque: "",
        descripcion: ""
      },
      piscicolas: [],
      piscicolasfull: [],
      selectedPiscicola: {
        descripcion: "",
        id_piscicolas: null,
        id_usuario: null,
        nombre_piscicola: "",
        ubicacion: ""
      }
    };
  },
  methods: {
    selectedInitDate(fechaObtenidaDelHijo) {
      console.log("fechaObtenidaDelHijo ------>");
      console.log(fechaObtenidaDelHijo);
      console.log("initDate ------>");
      this.initDate = fechaObtenidaDelHijo + " 00:00:00";
      console.log(this.initDate);
      this.initDateBandera = true;
      this.updateMediciones();
    },
    selectedFinalDate(fechaObtenidaDelHijo) {
      console.log("fechaObtenidaDelHijo ------>");
      console.log(fechaObtenidaDelHijo);
      console.log("finalDate ------>");
      this.finalDate = fechaObtenidaDelHijo + " 23:59:59";
      console.log(this.finalDate);
      this.finalDateBandera = true;
      this.updateMediciones();
    },
    selectedItemPiscicola() {
      this.selectedPiscicola = this.piscicolasfull.find(
        x => x.id_piscicolas === this.id_piscicolas.value
      );
      this.updateEstanques();
    },
    selectedItemEstanque() {
      this.selectedEstanque = this.estanquesfull.find(
        x => x.id_estanque === this.id_estanque.value
      );
      this.updateDataCalculada();
    },
    updateDataCalculada() {
      console.log("id_estanque ------>");
      console.log(this.id_estanque.value);
      postRequest("data_calculada", {
        id_estanque: this.id_estanque.value,
        initDate: this.initDate,
        finalDate: this.finalDate
      }).then(response => {
        if (response.data.res == 200) {
          this.dataCalculadafull = response.data.data;
          console.log("datcalculada obtenidad del back ------>");
          console.log(this.dataCalculadafull);
          //this.convertToCSV(this.dataCalculadafull)
        } else alert(response.data.msg);
      });
    },
    updateMediciones() {
      if ((this.initDate, this.finalDate)) {
        postRequest("mediciones", {
          id_estanque: this.id_estanque.value,
          initDate: this.initDate,
          finalDate: this.finalDate
        }).then(response => {
          if (response.data.res == 200) {
            this.medicionesfull = response.data.data;
            console.log("mediciones obtenidad del back ------>");
            console.log(this.medicionesfull);
          } else alert(response.data.msg);
        });
      }
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
      postRequest("estanques", {
        id_piscicolas: this.id_piscicolas.value
      }).then(response => {
        if (response.data.res == 200) {
          this.estanques = response.data.data.map(estanque => ({
            text: estanque.nombre_estanque,
            value: estanque.id_estanque
          }));
          this.estanquesfull = response.data.data;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
