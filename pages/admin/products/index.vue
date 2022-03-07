<template>
  <v-row>
    <v-col cols="12" align="right">
      <v-btn
        color="primary"
        class="white--text mr-2"
        to="/admin/products/create"
      >
        เพิ่มสินค้า
      </v-btn>
      <v-btn color="red" class="white--text" to="/admin">ย้อนกลับ</v-btn>
    </v-col>
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="items"
        class="elevation-1"
        hide-default-footer
      >
        <template v-slot:item.type="{ item }">
          <v-chip>{{ item.type }}</v-chip>
        </template>
        <template v-slot:item.img="{ item }">
          <v-img
            :src="item.img"
            max-height="100"
            max-width="100"
            class="my-2"
          />
        </template>
        <template v-slot:item.actions="{ item }">
          <nuxt-link :to="`/admin/products/${item.id}/edit`">
            <v-icon color="white" class="orange rounded-circle mr-2 pa-1">
              mdi-pencil
            </v-icon>
          </nuxt-link>
          <v-icon
            @click="deleteItem(item)"
            color="white"
            class="red rounded-circle pa-1"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import ProductService from "@/services/apis/Product";
export default {
  data() {
    return {
      headers: [
        { text: "รูปสินค้า", value: "img", width: 100, align: "center" },
        { text: "ชื่อสินค้า", value: "name", align: "center" },
        { text: "ราคา", value: "price", align: "center" },
        { text: "ประเภท", value: "type", width: 100, align: "center" },
        { text: "ตัวเลือก", value: "actions", sortable: false },
      ],
      items: [],
    };
  },
  mounted() {
    if (!this.$auth.user || this.$auth.user.role_id !== 1) {
      window.location.href = "/login";
    }

    this.loadProduct();
  },
  methods: {
    async loadProduct() {
      const { data } = await ProductService.getAll();
      this.items = data;
    },
    deleteItem(item) {
      this.$swal
        .fire({
          title: "ต้องการยกเลิกรายการสั่งซื้อนี้ หรือไม่",
          text: "เลขออร์เดอร์ #005",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ลบ",
          cancelButtonText: "ยกเลิก",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await ProductService.delete(item.id);
            this.items.splice(item, 1);
            this.$swal.fire("ลบสำเร็จ");
          }
        });
    },
  },
};
</script>

<style></style>
