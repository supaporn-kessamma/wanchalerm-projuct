<template>
  <v-row>
    <v-col cols="12">
      <h2>สมัครสมาชิก</h2>
    </v-col>
    <v-col cols="6">
      <v-text-field
        dense
        hide-details
        outlined
        label="ชื่อจริง"
        v-model="form.firstName"
      />
    </v-col>
    <v-col cols="6">
      <v-text-field
        dense
        hide-details
        outlined
        label="นามสกุล"
        v-model="form.lastName"
      />
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
        >สมัครสมาชิก</v-btn
      >
      <v-btn color="red" class="white--text" to="/">ย้อนกลับ</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import UserService from "@/services/apis/User";
export default {
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async register() {
      try {
        await UserService.create({
          full_name: this.form.firstName + this.form.lastName,
          username: this.form.username,
          password: this.form.password,
        });
        await this.$auth.loginWith("local", {
          data: {
            username: this.form.username,
            password: this.form.password,
          },
        });

        this.$swal.fire({
          title: "เข้าสู่ระบบสำเร็จ",
          icon: "success",
          confirmButtonText: "ตกลง",
        });
        window.location.href = "/";
        this.$router.push("/");
      } catch (error) {
        this.$swal.fire({
          title: "สมัครสมาชิกไม่สำเร็จ",
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
