<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer
        ><v-toolbar-title class="text-center"
          >OTOP LOPBURI</v-toolbar-title
        ></v-spacer
      >

      <v-badge bordered color="red" :content="count" :value="count">
        <v-btn icon to="/cart">
          <v-icon>mdi-cart-outline</v-icon>
        </v-btn>
      </v-badge>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import CartService from "@/services/apis/Cart";
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      count: 0,
      text: "เข้าสู่ระบบ",
      items: [
        {
          icon: "mdi-home-outline",
          title: "หน้าหลัก",
          to: "/",
        },
        {
          icon: "mdi-cart-outline",
          title: "ตะกร้าสินค้า",
          to: "/cart",
        },
      ],
      itemsTemp: [
        {
          icon: "mdi-home-outline",
          title: "หน้าหลัก",
          to: "/",
        },
        {
          icon: "mdi-cart-outline",
          title: "ตะกร้าสินค้า",
          to: "/cart",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
  watch: {},
  async mounted() {
    if (this.$auth.user) {
      const { data: carts } = await CartService.getAll({
        "filters[user_id]": this.$auth.user.id,
        "filters[status]": "ดำเนินการ",
      });
      this.count = carts.length;
    }

    this.loadNav();
  },
  methods: {
    async loadNav() {
      this.items = await [];
      const temp = this.itemsTemp;
      this.items = temp;

      if (this.$auth.user) {
        if (this.$auth.user.role_id === 1) {
          this.items.push({
            icon: "mdi-cog",
            title: "จัดการข้อมูล",
            to: "/admin",
          });
        }
        this.items.push({
          icon: "mdi-login-variant",
          title: "ออกจากระบบ",
          to: "/logout",
        });
      } else {
        this.items.push({
          icon: "mdi-account-multiple",
          title: "สมัครสมาชิก",
          to: "/register",
        });
        this.items.push({
          icon: "mdi-login-variant",
          title: "เข้าสู่ระบบ",
          to: "/login",
        });
      }
    },
  },
};
</script>
