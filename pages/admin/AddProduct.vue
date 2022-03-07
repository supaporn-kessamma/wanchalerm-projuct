<template>
  <v-row class="px-4" align="center" justify="center">
    <v-col cols="12" align="right">
      <v-btn color="green" class="white--text" @click="add">เพิ่ม</v-btn>
      <v-btn color="red" class="white--text" to="/admin">ย้อนกลับ</v-btn>
    </v-col>
    <v-col cols="12">
      <v-text-field
        dense
        hide-details
        outlined
        label="url รูปภาพ"
        v-model="form.url"
      />
    </v-col>
    <v-col cols="12">
      <v-text-field
        dense
        hide-details
        outlined
        label="ชื่อสินค้า"
        v-model="form.name"
      />
    </v-col>
    <v-col cols="12">
      <v-text-field
        dense
        hide-details
        outlined
        label="ราคา"
        v-model="form.price"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        price: 0,
        url: "",
      },
    };
  },
  methods: {
    add() {
      try {
        this.$swal.fire({
          title: "เพิ่มสำเร็จ",
          icon: "success",
          confirmButtonText: "ตกลง",
        });
        // this.$router.go(-1);
      } catch (error) {
        this.$swal.fire({
          title: "เพิ่มไม่สำเร็จ",
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
