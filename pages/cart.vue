<template>
  <v-row>
    <v-col cols="12">
      <h2>ตะกร้าสินค้า</h2>
    </v-col>
    <v-col cols="9">
      <v-data-table
        :headers="headers"
        :items="items"
        class="elevation-1"
        hide-default-footer
      >
        <template v-slot:item.image="{ item }">
          <v-img
            :src="item.image"
            max-height="100"
            max-width="100"
            class="my-2"
          />
        </template>
        <template v-slot:item.price="{ item }"> ฿{{ item.price }} </template>
        <template v-slot:item.amout="{ item }">
          <v-icon
            :disabled="!item.amout"
            class="grey lighten-2 pa-1"
            @click="minus(item)"
          >
            mdi-minus
          </v-icon>
          <div class="d-inline grey lighten-4 rounded-md px-8 py-2 mx-2">
            {{ item.amout }}
          </div>
          <v-icon class="grey lighten-2 pa-1" @click="plus(item)">
            mdi-plus
          </v-icon>
        </template>
        <template v-slot:item.total="{ item }"> ฿{{ item.total }} </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            @click="deleteItem(item)"
            color="white"
            class="red rounded-circle pa-1"
          >
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:body.append>
          <tr>
            <td colspan="3"></td>
            <td class="text-right">
              <h2>ราคารวมทั้งหมด</h2>
              <div>{{ items.length }} รายการ</div>
            </td>
            <td></td>
            <td>
              <h2>{{ sumTotal }}</h2>
            </td>
          </tr>
        </template>
        <template v-slot:no-data>
          <div>ไม่มีสินค้าในตะกร้า</div>
        </template>
      </v-data-table>
    </v-col>
    <v-col cols="3">
      <v-card outlined tile class="pa-2">
        <v-row>
          <v-col cols="12">
            <h2>ที่อยู่จัดส่ง</h2>
          </v-col>
          <v-col cols="12">
            <span>ชื่อ - นามสกุล</span>
          </v-col>
          <v-col cols="12" class="pt-0">
            <v-text-field outlined dense hide-details />
          </v-col>
          <v-col cols="12" class="pt-0">
            <span>ที่อยู่</span>
          </v-col>
          <v-col cols="12" class="pt-0">
            <v-text-field outlined dense hide-details />
          </v-col>
          <v-col cols="6" class="pt-0">
            <span>เมือง</span>
          </v-col>
          <v-col cols="6" class="pt-0">
            <span>จังหวัด</span>
          </v-col>
          <v-col cols="6" class="pt-0">
            <v-text-field outlined dense hide-details />
          </v-col>
          <v-col cols="6" class="pt-0">
            <v-text-field outlined dense hide-details />
          </v-col>
          <v-col cols="6" class="pt-0">
            <span>ประเทศ</span>
          </v-col>
          <v-col cols="6" class="pt-0">
            <span>รหัสไปรษณีย์</span>
          </v-col>
          <v-col cols="6" class="pt-0">
            <v-text-field outlined dense hide-details />
          </v-col>
          <v-col cols="6" class="pt-0">
            <v-text-field outlined dense hide-details />
          </v-col>
          <v-col cols="12" class="pt-0">
            <span>เบอร์โทรศัพท์</span>
          </v-col>
          <v-col cols="12" class="pt-0">
            <v-text-field outlined dense hide-details />
          </v-col>
          <v-col cols="12">
            <v-btn block color="green" class="white--text">สั่งสินค้า</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import _sumBy from "lodash/sumBy";
export default {
  data() {
    return {
      headers: [
        { text: "รายการ", value: "image", width: 100, align: "center" },
        { text: "", value: "orders", align: "start" },
        { text: "ราคา", value: "price", align: "center" },
        { text: "จำนวน", value: "amout", align: "center" },
        { text: "ราคารวม", value: "total", align: "center" },
        { text: "ลบ", value: "actions", sortable: false },
      ],
      items: [
        {
          image:
            "https://www.otoptoday.com/images/upload_img/products/otop_img_11568805905.jpg",
          orders: "ส้มแขก",
          price: 100,
          amout: 1,
          total: 100,
        },
        {
          image:
            "https://www.otoptoday.com/images/upload_img/products/otop_img_11568805905.jpg",
          orders: "ส้มแขก",
          price: 200,
          amout: 1,
          total: 100,
        },
      ],
      min: 0,
      sumTotal: 0,
    };
  },
  watch: {
    items: {
      handler() {
        this.sumTotal = _sumBy(this.items, "total");
      },
      immediate: true, //watchทำงานเริ่มต้น
      deep: true, //ตรวจสอบข้อมูลที่ลึกขึ้น เช่น array object
    },
  },
  methods: {
    plus(item) {
      if (item.amout >= this.min) {
        const num = item.amout;
        item.amout = num + 1;

        item.total = item.price * item.amout;
      }
    },
    minus(item) {
      if (item.amout > this.min) {
        const num = item.amout;
        item.amout = num - 1;

        item.total = item.price * item.amout;
      }
    },
    deleteItem(item) {
      this.items.splice(item, 1);
    },
    sum() {
      // sumBy(objects, function(o) { return o.n; });
    },
  },
};
</script>
