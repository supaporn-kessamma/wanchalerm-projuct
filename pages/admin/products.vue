<template>
  <v-row>
    <v-col cols="12" align="right">
      <v-btn color="primary" class="white--text mr-2" to="/admin/AddProduct">
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
        <template v-slot:item.status="{ item }">
          <v-chip color="green" class="white--text" v-if="item.status"
            >ใช้งาน</v-chip
          >
          <v-chip v-else>ไม่ใช้งาน</v-chip>
        </template>
        <template v-slot:item.image="{ item }">
          <v-img
            :src="item.image"
            max-height="100"
            max-width="100"
            class="my-2"
          />
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            @click="editItem(item)"
            color="white"
            class="orange rounded-circle mr-2 pa-1"
          >
            mdi-pencil
          </v-icon>
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
export default {
  data() {
    return {
      headers: [
        { text: "สถานะ", value: "status", width: 100, align: "center" },
        { text: "รูปสินค้า", value: "image", width: 100, align: "center" },
        { text: "ชื่อสินค้า", value: "name", align: "center" },
        { text: "ราคา", value: "price", align: "center" },
        { text: "ตัวเลือก", value: "actions", sortable: false },
      ],
      items: [
        {
          image:
            "https://www.otoptoday.com/images/upload_img/products/otop_img_11568805905.jpg",
          name: "ส้มแขก",
          price: 100,
          status: true,
        },
        {
          image:
            "https://www.otoptoday.com/images/upload_img/products/otop_img_11568805905.jpg",
          name: "ส้มแขก",
          price: 200,
          status: false,
        },
      ],
    };
  },
  methods: {
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
        .then((result) => {
          if (result.isConfirmed) {
            this.items.splice(item, 1);
            this.$swal.fire("ลบสำเร็จ");
          }
        });
    },
    editItem(item) {
      this.$router.push({
        path: "/admin/AddProduct",
        query: {
          item: item,
        },
      });
      // try {
      //   this.$swal.fire({
      //     title: "ยืนยันการสั่งซื้อสำเร็จ",
      //     text: "เลขออร์เดอร์ #005",
      //     icon: "success",
      //     confirmButtonText: "ตกลง",
      //   });
      //   item.status = "success";
      // } catch (error) {
      //   this.$swal.fire({
      //     title: "ยืนยันการสั่งซื้อไม่สำเร็จ",
      //     text: error.message,
      //     icon: "error",
      //     confirmButtonText: "ตกลง",
      //   });
      // }
    },
  },
};
</script>

<style></style>
