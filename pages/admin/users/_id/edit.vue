<template>
  <v-row class="px-4" align="center" justify="center">
    <v-col cols="12" align="right">
      <v-btn color="green" class="white--text" @click="add">บันทึก</v-btn>
      <v-btn color="red" class="white--text" to="/admin/users">ย้อนกลับ</v-btn>
    </v-col>
    <v-col cols="12">
      <v-text-field
        dense
        hide-details
        outlined
        label="ชื่อผู้ใช้งาน"
        v-model="form.username"
      />
    </v-col>
    <v-col cols="12">
      <v-text-field
        dense
        hide-details
        outlined
        label="ชื่อ"
        v-model="form.full_name"
      />
    </v-col>
  </v-row>
</template>

<script>
import UserService from "@/services/apis/User";
export default {
  data() {
    return {
      form: {
        username: "",
        full_name: "",
      },
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const data = await UserService.getById(this.$route.params.id);
      this.form.id = data.id;
      this.form.full_name = data.full_name;
      this.form.username = data.username;
    },
    async add() {
      try {
        await UserService.update(this.form.id, this.form);
        this.$swal.fire({
          title: "สำเร็จ",
          icon: "success",
          confirmButtonText: "ตกลง",
        });
        this.form = {};
        this.$router.go(-1);
      } catch (error) {
        this.$swal.fire({
          title: "ไม่สำเร็จ",
          text: error.message,
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      }
    },
  },
};
</script>

<style></style>
