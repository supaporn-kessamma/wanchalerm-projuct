<template>
  <v-row>
    <v-col cols="12">
      <h2>เข้าสู่ระบบ</h2>
    </v-col>
    <v-col cols="12">
      <v-text-field
        dense
        hide-details
        outlined
        label="ชื่อผู้ใช้งาน/username"
        v-model="form.username"
      />
    </v-col>
    <v-col cols="12">
      <v-text-field
        dense
        hide-details
        outlined
        label="รหัสผ่าน/password"
        v-model="form.password"
        type="password"
      />
    </v-col>
    <v-col cols="12" align="center">
      <v-btn color="green" class="white--text" @click="register"
        >เข้าสู่ระบบ</v-btn
      >
      <v-btn color="red" class="white--text" to="/">ย้อนกลับ</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    register() {
      try {
        this.$swal.fire({
          title: "เข้าสู่ระบบสำเร็จ",
          icon: "success",
          confirmButtonText: "ตกลง",
        });
        this.$router.push("/");
      } catch (error) {
        this.$swal.fire({
          title: "เข้าสู่ระบบไม่สำเร็จ",
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
