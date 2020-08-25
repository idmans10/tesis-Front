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
      <v-col xs="12" sm="6">
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
      <v-col xs="12" sm="6">
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
      <v-col class="text-center" cols="12">
        <v-btn
          color="#325d79"
          outlined
          @click="updateAll()"
          :disabled="finalDateBandera ? false : true"
          >Visualizar</v-btn
        >
      </v-col>
      <v-col cols="12" v-for="(chartData, index) in dataCharts" :key="index">
        <v-card class="px-2 mx-2" width="2000px" shaped elevation="5">
          <v-card-title
            >Sensor: {{ chartData.line.datasets[0].label[0] }}
          </v-card-title>
          <v-container>
            <v-row>
              <v-col cols="8">
                <v-card class="px-2 mx-2" raised elevation="5">
                  <vuescroll :ops="ops">
                    <line-chart
                      :chartData="chartData.line"
                      :options="chartData.options"
                      :width="2000"
                      :height="500"
                    />
                  </vuescroll>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card class="px-2 my-2" width="500px" raised elevation="5">
                  <v-card-title> Indicadores </v-card-title>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="6"
                        v-for="(donut, index) in chartData.donuts"
                        :key="index"
                      >
                        <p>{{ periodos[index] }}:</p>
                        <doughnut-chart
                          :chartdata="donut"
                          :options="chartOptions2"
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Calendar from "@/components/Calendar.vue";
import { postRequest } from "@/plugins/api.js";
import LineChart from "@/components/AreaChart.vue";
import DoughnutChart from "@/components/ChartDonut.vue";
import vuescroll from "vuescroll/dist/vuescroll-native";

export default {
  components: { LineChart, DoughnutChart, Calendar, vuescroll },
  created() {
    this.updatePiscicolas();
  },

  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  data() {
    return {
      ops: {
        vuescroll: {
          mode: "native",
          sizeStrategy: "percent",
          detectResize: true
        },
        scrollPanel: {
          initialScrollY: false,
          initialScrollX: false,
          scrollingX: true,
          scrollingY: false,
          speed: 400,
          easing: "easeOutQuint",
          verticalNativeBarPos: "left"
        },
        rail: {
          background: "#2196F3",
          opacity: 0.2,
          size: "5px",
          specifyBorderRadius: false,
          gutterOfEnds: "1px",
          gutterOfSide: "1px",
          keepShow: false
        },
        bar: {
          showDelay: 200,
          onlyShowBarOnScroll: true,
          keepShow: false,
          background: "#ff8a76",
          opacity: 0.4,
          hoverStyle: false,
          specifyBorderRadius: false,
          minSize: 0,
          size: "3px",
          disable: false
        }
      },
      initDate: new Date().toISOString().substr(0, 10),
      initDateBandera: false,
      finalDate: new Date().toISOString().substr(0, 10),
      finalDateBandera: false,
      intervalId: null,
      piscicolas: [],
      piscicolasfull: [],
      selectedPiscicola: {
        descripcion: "",
        id_piscicolas: null,
        id_usuario: null,
        nombre_piscicola: "",
        ubicacion: ""
      },
      estanques: [],
      estanquesfull: [],
      selectedEstanque: {
        id_estanque: null,
        id_piscicolas: null,
        nombre_estanque: "",
        descripcion: ""
      },
      sensoresfull: [],
      id_piscicolas: { text: "Seleccionar piscícola", value: 0 },
      id_estanque: { text: "Seleccionar Estanque", value: 0 },
      id_estanqueDefaul: { text: "Seleccionar Estanque", value: 0 },
      mediciones: [],
      indicadores: null,
      periodos: [],
      datoSensor: [],
      dataCalculadafull: [],
      dataCharts: [],
      chartOptions: {},
      chartOptions2: {
        rotation: Math.PI,
        circumference: Math.PI
      }
    };
  },
  async mounted() {},
  methods: {
    selectedInitDate(fechaObtenidaDelHijo) {
      console.log("fechaObtenidaDelHijo ------>");
      console.log(fechaObtenidaDelHijo);
      console.log("initDate ------>");
      this.initDate = fechaObtenidaDelHijo + " 00:00:00";
      this.initDateBandera = true;
      console.log(this.initDate);
      //this.updateMediciones()
    },
    selectedFinalDate(fechaObtenidaDelHijo) {
      console.log("fechaObtenidaDelHijo ------>");
      console.log(fechaObtenidaDelHijo);
      console.log("finalDate ------>");
      this.finalDate = fechaObtenidaDelHijo + " 23:59:59";
      this.finalDateBandera = true;
      console.log(this.finalDate);
      // this.updateMediciones()
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
      this.updateSensores();
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
    },
    updateSensores() {
      postRequest("sensores", { id_estanque: this.id_estanque.value }).then(
        response => {
          if (response.data.res == 200) {
            this.sensoresfull = response.data.data;
          }
          console.log("sensoresfull------>");
          console.log(this.sensoresfull);
        }
      );
    },
    updateMedicionesIndicadores() {
      console.log("Pasó por updateMedicionesIndicadores");
      postRequest("mediciones", {
        id_estanque: this.id_estanque.value,
        initDate: this.initDate,
        finalDate: this.finalDate
      }).then(response => {
        if (response.data.res == 200) {
          this.mediciones = response.data.data;
          console.log("mediciones:");
          console.log(this.mediciones);
        }
      });
      postRequest("data_calculada", {
        id_estanque: this.id_estanque.value
      }).then(response => {
        if (response.data.res == 200) {
          this.indicadores = response.data.data;
          console.log("indicadores:");
          console.log(this.indicadores);
          this.graficas();
        }
      });
    },
    graficas() {
      console.log("Pasó por graficas");
      console.log(this.intervalId);
      console.log("-----------");

      const onlyUnique = (value, index, self) => self.indexOf(value) === index;
      const sensores = this.mediciones
        .map(m => m.id_sensores)
        .filter(onlyUnique);
      this.periodos = this.indicadores.map(m => m.periodo).filter(onlyUnique);
      console.log("periodos----->");
      console.log(this.periodos);

      const dataCharts = sensores.map(sensor => {
        const medicionesSensor = this.mediciones.filter(
          m => m.id_sensores == sensor
        );
        const indicadoresSensor = this.indicadores.filter(
          i => i.id_sensores == sensor
        );
        const dataSensor = this.sensoresfull.filter(
          s => s.id_sensores == sensor
        );
        const dataChartsDonut = indicadoresSensor.map(indi => ({
          labels: ["Max", "Min"],
          datasets: [
            {
              data: [indi["max(dato)"], indi["min(dato)"]],
              backgroundColor: ["#F08080", "#FFF176"],
              borderWidth: 3
            }
          ]
        }));
        return {
          line: {
            labels: medicionesSensor.map(m => m.fecha),
            datasets: [
              {
                backgroundColor: "#B2DFDB",
                borderColor: "#00897B",
                borderWidth: 1.5,
                pointBackgroundColor: "#00897B",
                pointRadius: 1.5,
                label: dataSensor.map(m => m.nombre_sensor),
                data: medicionesSensor.map(m => m.dato)
                //"#325d79",
                //"#" + (((1 << 24) * Math.random()) | 0).toString(16),
              }
            ]
          },
          donuts: dataChartsDonut,
          options: {
            title: {
              display: true,
              fontSize: 14,
              fontColor: "#325d79",
              text: "Monitoreo"
            },
            legend: {
              position: "top",
              align: "end",
              labels: {
                boxWidth: 60,
                fontSize: 14,
                fontColor: "#325d79"
              }
            },
            scales: {
              yAxes: [
                {
                  tye: "linear",
                  offset: true,
                  scaleLabel: {
                    display: true,
                    labelString: "value"
                  },
                  position: "left",
                  ticks: {
                    maxTicksLimit: 10,
                    suggestedMax: dataChartsDonut[0].datasets[0].data[0] + 20,
                    suggestedMin: 0,
                    fontColor: "#325d79"
                  }
                },
                {
                  tye: "linear",
                  offset: true,
                  scaleLabel: {
                    display: true,
                    labelString: "value"
                  },
                  position: "right",
                  ticks: {
                    maxTicksLimit: 10,
                    suggestedMax: dataChartsDonut[0].datasets[0].data[0] + 20,
                    suggestedMin: 0,
                    fontColor: "#325d79"
                  }
                }
              ],
              xAxes: [
                {
                  type: "time",
                  scaleLabel: {
                    display: true,
                    labelString: "Date"
                  },
                  time: {
                    unit: "minute",
                    stepSize: 2
                  },
                  ticks: {
                    maxTicksLimit: 30,
                    maxRotation: 0,
                    fontColor: "#325d79"
                  }
                }
              ]
            }
          }
        };
      });
      this.dataCharts = dataCharts;
      console.log("dataCharts------->");
      console.log(this.dataCharts);
    },
    updateAll() {
      // this.updateMedicionesIndicadores()
      this.intervalId = setInterval(() => {
        this.updateMedicionesIndicadores();
      }, 4000);
    }
  }
};
</script>

<style lang="scss" scoped></style>
