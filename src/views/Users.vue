<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-btn outlined color="#325d79" @click="editItem(editedIndex)"
          >Crear Usuario</v-btn
        >
      </v-col>
      <v-col cols="6">
        <v-text-field
          color="#325d79"
          outlined
          dense
          v-model="search"
          label="Buscar Usuario"
          prepend-inner-icon="fa-search"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="users"
          :search="search"
          class="elevation-5"
        >
          <template v-slot:top>
            <v-toolbar flat color="#325d79" dark>
              <v-toolbar-title>Usuarios Registrados</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              color="#325d79"
              class="mr-4"
              @click="editItem(item), (selectedUser = item)"
              >fa-edit</v-icon
            >
            <v-icon color="#325d79" @click="deleteItem(), (selectedUser = item)"
              >fa-trash-alt</v-icon
            >
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <DialogUser
      :selectedUser="selectedUser"
      :title="editedIndex"
      :roles="roles"
      :piscicolas="piscicolas"
      v-model="showDialogUser"
      @updateUsers="updateUsers"
    />

    <DialogDelete
      title="usuario"
      v-model="showDialogDelete"
      @delete="deleteUser"
    />
  </v-container>
</template>

<script>
import DialogUser from "@/components/DialogUser.vue";
import DialogDelete from "@/components/DialogDelete.vue";
import { postRequest } from "@/plugins/api.js";
export default {
  components: {
    DialogUser,
    DialogDelete
  },
  created() {
    this.updateUsers();
  },
  data() {
    return {
      editedIndex: -1,
      search: "",
      showDialogUser: false,
      showDialogDelete: false,
      selectedUser: null,
      piscicolas: [],
      roles: [],
      headers: [
        {
          text: "Usuario",
          value: "nombre_usuario"
        },
        {
          text: "Telefono",
          sortable: false,
          value: "telefono"
        },
        {
          text: "Rol",
          value: "id_rol"
        },
        {
          text: "Correo",
          value: "correo"
        },
        {
          text: "Acción",
          sortable: false,
          value: "actions"
        }
      ],
      users: []
    };
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.selectedUser = Object.assign({}, item);
      this.showDialogUser = true;
      this.updatePiscicolas();
      this.updateRoles();
    },
    deleteItem() {
      this.showDialogDelete = true;
    },
    updateUsers() {
      postRequest("users").then(response => {
        if (response.data.res == 200) this.users = response.data.data;
        else alert(response.data.msg);
      });
      console.log("entro");
    },
    deleteUser() {
      postRequest("delete_user", {
        nombre_usuario: this.selectedUser.nombre_usuario,
        id_rol: this.selectedUser.id_rol
      }).then(response => {
        if (response.data.res == 200) {
          this.updateUsers();
          this.showDialogDelete = false;
        } else alert(response.data.msg);
      });
    },
    updatePiscicolas() {
      postRequest("piscicolas").then(response => {
        if (response.data.res == 200) {
          this.piscicolas = response.data.data.map(piscicola => ({
            text: piscicola.nombre_piscicola,
            value: piscicola.id_piscicolas
          }));
        } else alert(response.data.msg);
      });
    },
    updateRoles() {
      postRequest("roles").then(response => {
        if (response.data.res == 200) {
          this.roles = response.data.data.map(roles => ({
            text: roles.rol,
            value: roles.id_rol
          }));
        } else alert(response.data.msg);
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
