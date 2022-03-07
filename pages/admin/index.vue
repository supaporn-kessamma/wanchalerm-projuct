<template>
  <div>
    <v-btn class="mr-4" x-large to="/admin/orders">ออร์เดอร์สินค้า</v-btn>
    <v-btn x-large to="/admin/products">สินค้า</v-btn>
  </div>
</template>

<script>
export default {
  mounted() {
    if (!this.$auth.user || this.$auth.user.role_id !== 1) {
      window.location.href = "/login";
    }
  },
};
</script>

<style></style>
