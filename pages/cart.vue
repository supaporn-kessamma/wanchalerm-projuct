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
            :src="item.product.img"
            max-height="100"
            max-width="100"
            class="my-2"
          />
        </template>
        <template v-slot:item.product="{ item }">
          {{ item.product.name }}
        </template>
        <template v-slot:item.price="{ item }">
          ฿{{ item.product.price }}
        </template>
        <template v-slot:item.amout="{ item }">
          <v-icon
            :disabled="!item.amount"
            class="grey lighten-2 pa-1"
            @click="minus(item)"
          >
            mdi-minus
          </v-icon>
          <div class="d-inline grey lighten-4 rounded-md px-8 py-2 mx-2">
            {{ item.amount }}
          </div>
          <v-icon class="grey lighten-2 pa-1" @click="plus(item)">
            mdi-plus
          </v-icon>
        </template>
        <template v-slot:item.paid="{ item }"> ฿{{ item.paid }} </template>
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
        <v-form v-model="valid">
          <v-row>
            <v-col cols="12">
              <h2>ที่อยู่จัดส่ง</h2>
            </v-col>
            <v-col cols="12">
              <span>ชื่อ - นามสกุล</span>
            </v-col>
            <v-col cols="12" class="pt-0">
              <v-text-field
                outlined
                dense
                hide-details
                v-model="form.name"
                required
              />
            </v-col>
            <v-col cols="12" class="pt-0">
              <span>ที่อยู่</span>
            </v-col>
            <v-col cols="12" class="pt-0">
              <v-text-field
                outlined
                dense
                hide-details
                v-model="form.address"
                required
              />
            </v-col>
            <v-col cols="6" class="pt-0">
              <span>เมือง</span>
            </v-col>
            <v-col cols="6" class="pt-0">
              <span>จังหวัด</span>
            </v-col>
            <v-col cols="6" class="pt-0">
              <v-text-field
                outlined
                dense
                hide-details
                v-model="form.city"
                required
              />
            </v-col>
            <v-col cols="6" class="pt-0">
              <v-text-field
                outlined
                dense
                hide-details
                v-model="form.province"
                required
              />
            </v-col>
            <v-col cols="6" class="pt-0">
              <span>ประเทศ</span>
            </v-col>
            <v-col cols="6" class="pt-0">
              <span>รหัสไปรษณีย์</span>
            </v-col>
            <v-col cols="6" class="pt-0">
              <v-text-field
                outlined
                dense
                hide-details
                v-model="form.country"
                required
              />
            </v-col>
            <v-col cols="6" class="pt-0">
              <v-text-field
                outlined
                dense
                hide-details
                v-model="form.zip"
                required
              />
            </v-col>
            <v-col cols="12" class="pt-0">
              <span>เบอร์โทรศัพท์</span>
            </v-col>
            <v-col cols="12" class="pt-0">
              <v-text-field
                outlined
                dense
                hide-details
                v-model="form.tel"
                required
              />
            </v-col>
            <v-col cols="12">
              <v-btn block color="green" class="white--text" @click="submit"
                >สั่งสินค้า</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import _sumBy from "lodash/sumBy";
import OrderService from "@/services/apis/Order";
import CartService from "@/services/apis/Cart";

export default {
  data() {
    return {
      valid: false,
      headers: [
        { text: "รายการ", value: "image", width: 100, align: "center" },
        { text: "", value: "product", align: "start" },
        { text: "ราคา", value: "price", align: "center" },
        { text: "จำนวน", value: "amout", align: "center" },
        { text: "ราคารวม", value: "paid", align: "center" },
        { text: "ลบ", value: "actions", sortable: false },
      ],
      items: [],
      form: {
        name: "",
        address: "",
        city: "",
        province: "",
        country: "",
        zip: "",
        tel: "",
      },
      min: 0,
      sumTotal: 0,
    };
  },
  watch: {
    items: {
      handler() {
        this.sum();
      },
      immediate: true, //watchทำงานเริ่มต้น
      deep: true, //ตรวจสอบข้อมูลที่ลึกขึ้น เช่น array object
    },
  },
  async mounted() {
    if (!this.$auth.user) {
      window.location.href = "/login";
    }

    const { data } = await CartService.getAll({
      "filters[user_id]": this.$auth.user.id,
      "filters[status]": "ดำเนินการ",
    });
    this.items = data;
    this.sum();
  },
  methods: {
    sum() {
      for (let i in this.items) {
        this.items[i].paid = this.items[i].product.price * this.items[i].amount;
      }
      this.sumTotal = _sumBy(this.items, "paid");
    },
    plus(item) {
      if (item.amount >= this.min) {
        const num = item.amount;
        item.amount = num + 1;

        this.paid = item.product.price * item.amount;
      }
    },
    minus(item) {
      if (item.amount > this.min) {
        const num = item.amount;
        item.amount = num - 1;

        this.paid = item.product.price * item.amount;
      }
    },
    async deleteItem(item) {
      await CartService.delete(item.id);
      this.items.splice(item, 1);
    },
    async submit() {
      if (!this.items.length) {
        this.$swal.fire({
          title: "สั่งซื้อไม่สำเร็จ",
          text: "กรุณาเลือกสินค้าก่อน",
          icon: "error",
          confirmButtonText: "ตกลง",
        });

        return;
      }

      try {
        // throw new Error("0");
        const { data } = await OrderService.create({
          user_id: this.$auth.user.id,
          paid: this.sumTotal,
          address: `${this.form.address} ${this.form.city} ${this.form.province} ${this.form.country} ${this.form.zip} ${this.form.tel}`,
          status: "สำเร็จ",
        });
        for (const i in this.items) {
          await CartService.update(this.items[i].id, {
            status: "สำเร็จ",
            amount: this.items[i].amount,
            order_id: data.id,
          });
        }
        this.$swal.fire({
          title: "สั่งซื้อสำเร็จ",
          text: "สั่งซื้อสำเร็จ เลขออร์เดอร์ของท่านคือ #00" + data.id,
          icon: "success",
          confirmButtonText: "ตกลง",
        });
        this.form = {
          name: "",
          address: "",
          city: "",
          province: "",
          country: "",
          zip: "",
          tel: "",
        };
        this.items = [];
      } catch (error) {
        this.$swal.fire({
          title: "สั่งซื้อไม่สำเร็จ",
          text: error.message,
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      }
    },
  },
};
</script>
