<template>
  <v-row class="px-4" align="center" justify="center">
    <v-col cols="12" align="right">
      <v-btn color="green" class="white--text" @click="add">บันทึก</v-btn>
      <v-btn color="red" class="white--text" to="/admin/products"
        >ย้อนกลับ</v-btn
      >
    </v-col>
    <v-col cols="12">
      <v-text-field
        dense
        hide-details
        outlined
        label="url รูปภาพ"
        v-model="form.img"
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
    <v-col cols="12">
      <v-autocomplete
        dense
        hide-details
        outlined
        :items="types"
        item-text="name"
        label="ชนิดสินค้า"
        v-model="form.type"
      />
    </v-col>
  </v-row>
</template>

<script>
import ProductService from "@/services/apis/Product";
export default {
  data() {
    return {
      form: {
        id: "",
        name: "",
        price: 0,
        img: "",
        type: "",
      },
      types: [
        { name: "เครื่องดื่ม" },
        { name: "ยา" },
        { name: "อาหาร" },
        { name: "สมุนไพร" },
        { name: "ของใช้" },
        { name: "เสื้อผ้า" },
      ],
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const data = await ProductService.getById(this.$route.params.id);
      this.form.id = data.id;
      this.form.name = data.name;
      this.form.price = data.price;
      this.form.img = data.img;
      this.form.type = data.type;
    },
    async add() {
      try {
        await ProductService.update(this.form.id, this.form);
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
