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
                <v-img :src="product.image" max-width="230" max-height="180" />
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
          <v-btn block @click="filterProduct('drink')">เครื่องดื่ม</v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn block @click="filterProduct('drug')">ยา</v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn block @click="filterProduct('food')">อาหาร</v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn block @click="filterProduct('herb')">สมุนไพร</v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn block @click="filterProduct('noAlcohol')"
            >เครื่องดื่ม(ไม่มีแอลกอฮอล์)</v-btn
          >
        </v-col>
        <v-col cols="12">
          <v-btn block @click="filterProduct('clothes')">เสื้อผ้า</v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import _filter from "lodash/filter";
import ProductService from '@/services/apis/Product'

export default {
  data() {
    return {
      length: 0,
      products: [
        {
          image:
            "https://www.otoptoday.com/images/upload_img/products/otop_img_11568805905.jpg",
          name: "ส้ม (อาหาร)",
          price: 100,
          amout: 1,
          total: 100,
          category: "food",
        },
        {
          image:
            "https://www.otoptoday.com/images/upload_img/products/otop_img_11568805905.jpg",
          name: "ส้มแขก (อาหาร)",
          price: 100,
          amout: 1,
          total: 100,
          category: "food",
        },
        {
          image:
            "https://www.otoptoday.com/images/upload_img/products/otop_img_11568805905.jpg",
          name: "ส้มเชื่อม (สมุนไพร)",
          price: 100,
          amout: 1,
          total: 100,
          category: "herb",
        },
        {
          image:
            "https://www.otoptoday.com/images/upload_img/products/otop_img_11568805905.jpg",
          name: "ส้มกล่อง (เครื่องดื่ม)",
          price: 100,
          amout: 1,
          total: 100,
          category: "drink",
        },
      ],
      filter: "",
      filterList: [],
    };
  },
  async mounted() {
    this.filterList = this.products;

    const { data } = await ProductService.getAll({})
    console.log(data)
  },
  watch: {
    filter: {
      handler() {
        this.filterList = _filter(this.products, ["category", this.filter]);
        if (this.filter) {
          console.log("this.filter", typeof this.filter);
          this.filterList = _filter(this.products, ["category", this.filter]);
        } else {
          console.log("this.filter", this.filter);
          this.filterList = _filter(this.products, "category");
        }
      },
      deep: true,
    },
  },
  methods: {
    addProduct(item) {
      console.log(item);
    },
    filterProduct(text) {
      this.filter = text;
    },
  },
};
</script>
