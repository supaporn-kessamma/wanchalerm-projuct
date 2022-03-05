<template>
  <v-row>
    <v-col cols="12" sm="12" md="12">
      <h2 class="">สินค้าทั้งหมด</h2>
    </v-col>
    <v-col cols="9">
      <v-row>
        <v-col cols="4" v-for="(product, idx) in products" :key="idx">
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
          <v-btn block>เครื่องดื่ม</v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn block>ยา</v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn block>อาหาร</v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn block>สมุนไพร</v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn block>เครื่องดื่ม(ไม่มีแอลกอฮอล์)</v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn block>เสื้อผ้า</v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      length: 0,
      products: [
        {
          image:
            "https://www.otoptoday.com/images/upload_img/products/otop_img_11568805905.jpg",
          name: "ส้มแขก",
          price: 100,
          amout: 1,
          total: 100,
        },
        {
          image:
            "https://www.otoptoday.com/images/upload_img/products/otop_img_11568805905.jpg",
          name: "ส้มแขก",
          price: 100,
          amout: 1,
          total: 100,
        },
        {
          image:
            "https://www.otoptoday.com/images/upload_img/products/otop_img_11568805905.jpg",
          name: "ส้มแขก",
          price: 100,
          amout: 1,
          total: 100,
        },
        {
          image:
            "https://www.otoptoday.com/images/upload_img/products/otop_img_11568805905.jpg",
          name: "ส้มแขก",
          price: 100,
          amout: 1,
          total: 100,
        },
      ],
    };
  },
  methods: {
    addProduct(item) {
      console.log(item);
    },
  },
};
</script>
