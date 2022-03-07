<template>
  <v-row>
    <v-col cols="12" align="right">
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
          <v-chip
            color="green"
            class="white--text"
            v-if="item.status === 'success'"
            >สำเร็จ</v-chip
          >
          <v-chip color="orange" class="white--text" v-else>รอการยืนยัน</v-chip>
        </template>
        <template v-slot:item.name="{ item }">
          <div>{{ item.fName }} {{ item.lName }}</div>
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
            @click="confirmItem(item)"
            color="white"
            class="green rounded-circle mr-2 pa-1"
            v-if="item.status === 'wait'"
          >
            mdi-check
          </v-icon>
          <v-icon
            @click="deleteItem(item)"
            color="white"
            class="red rounded-circle pa-1"
            v-if="item.status === 'wait'"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import OrderService from "@/services/apis/Order"

export default {
  data() {
    return {
      headers: [
        { text: "สถานะ", value: "status", align: "center" },
        { text: "เลขออร์", value: "id", align: "center" },
        { text: "ชื่อผู้สั่ง", value: "name", width: 150, align: "center" },
        { text: "ที่อยู่", value: "address", width: 300, align: "center" },
        { text: "รายการ", value: "img", width: 100, align: "center" },
        { text: "", value: "orders", width: 100, align: "start" },
        { text: "จำนวน", value: "carts.length", align: "center" },
        { text: "ราคารวม", value: "total", align: "center" },
        { text: "ตัวเลือก", value: "actions", sortable: false },
      ],
      items: [
        {
          no: 12345,
          fName: "เหลิม",
          lName: "ยังไม่นอน",
          address: "1/11 ม.1 ต.ตำบล อ.อำเภอ จ.จังหวัด 11111",
          image:
            "https://www.otoptoday.com/images/upload_img/products/otop_img_11568805905.jpg",
          orders: "ส้มแขก",
          price: 100,
          amout: 10,
          total: 1000,
          status: "success",
        },
        {
          no: 12346,
          fName: "เหลิม",
          lName: "ยังไม่นอนนนนน",
          address: "1/11 ม.1 ต.ตำบล อ.อำเภอ จ.จังหวัด 11111",
          image:
            "https://www.otoptoday.com/images/upload_img/products/otop_img_11568805905.jpg",
          orders: "ส้มแขก",
          price: 200,
          amout: 5,
          total: 1000,
          status: "wait",
        },
      ],
    };
  },
  mounted(){
    this.loadOrder()
  },
  methods: {
    async loadOrder(){
      const {data} = await OrderService.getAll()
      this.items = data
      console.log(data)
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
        .then((result) => {
          if (result.isConfirmed) {
            this.items.splice(item, 1);
            this.$swal.fire("ลบสำเร็จ");
          }
        });
    },
    confirmItem(item) {
      try {
        this.$swal.fire({
          title: "ยืนยันการสั่งซื้อสำเร็จ",
          text: "เลขออร์เดอร์ #005",
          icon: "success",
          confirmButtonText: "ตกลง",
        });
        item.status = "success";
      } catch (error) {
        this.$swal.fire({
          title: "ยืนยันการสั่งซื้อไม่สำเร็จ",
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
