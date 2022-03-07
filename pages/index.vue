<template>
  <v-row>
    <v-col cols="12" sm="12" md="12">
      <h2 class="">สินค้าทั้งหมด</h2>
    </v-col>
    <v-col cols="9">
      <v-row>
        <v-col
          cols="4"
          v-for="(product, idx) in filterList"
          :key="idx"
          class="pr-0 mx-0"
        >
          <v-card elevation="2" max-width="230" class="pa-2">
            <v-row align="center" justify="center">
              <v-col cols="12">
                <v-img :src="product.img" max-width="230" max-height="180" />
              </v-col>
              <v-col cols="12" class="pt-0">
                <div class="d-flex justify-space-between">
                  <div class="">{{ product.name }}</div>
                  <v-card class="px-2 py-1" outlined tile>
                    <div class="">฿{{ product.price }}</div>
                  </v-card>
                </div>
              </v-col>
              <v-col cols="12" class="d-flex justify-end">
                <v-card
                  class="px-2 py-1"
                  outlined
                  tile
                  @click="addProduct(product)"
                >
                  <div>เพิ่มลงในตะกร้า</div>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="3">
      <v-row>
        <v-col cols="12">
          <div class="text-center">ประเภทสินค้า</div>
        </v-col>
        <v-col cols="12">
          <v-btn block @click="filterProduct(false)">ทั้งหมด</v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn block @click="filterProduct('เครื่องดื่ม')">เครื่องดื่ม</v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn block @click="filterProduct('ยา')">ยา</v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn block @click="filterProduct('อาหาร')">อาหาร</v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn block @click="filterProduct('สมุนไพร')">สมุนไพร</v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn block @click="filterProduct('เครื่องดื่ม(ไม่มีแอลกอฮอล์)')"
            >เครื่องดื่ม(ไม่มีแอลกอฮอล์)</v-btn
          >
        </v-col>
        <v-col cols="12">
          <v-btn block @click="filterProduct('เสื้อผ้า')">เสื้อผ้า</v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import _filter from "lodash/filter";
import ProductService from "@/services/apis/Product";
import CartService from "@/services/apis/Cart";

export default {
  data() {
    return {
      length: 0,
      products: [],
      filter: "",
      filterList: [],
    };
  },
  async mounted() {
    const { data } = await ProductService.getAll({});
    this.products = data;

    this.filterList = this.products;
  },
  watch: {
    filter: {
      handler() {
        this.filterList = _filter(this.products, ["type", this.filter]);
        if (this.filter) {
          this.filterList = _filter(this.products, ["type", this.filter]);
        } else {
          this.filterList = _filter(this.products, "type");
        }
      },
      deep: true,
    },
  },
  methods: {
    async addProduct(item) {
      try {
        await CartService.create({ product_id: item.id, amount: 1 });
        console.log(item);

        location.reload();
      } catch (e) {
        console.log(e);
      }
    },
    filterProduct(text) {
      this.filter = text;
    },
  },
};
</script>
