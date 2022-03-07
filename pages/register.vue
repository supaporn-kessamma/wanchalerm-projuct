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
    register() {
      try {
        this.$swal.fire({
          title: "สมัครสมาชิกสำเร็จ",
          icon: "success",
          confirmButtonText: "ตกลง",
        });
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
