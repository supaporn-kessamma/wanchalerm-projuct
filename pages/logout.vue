<template></template>

<script>
export default {
  async mounted() {
    await this.$auth.logout();
    window.location.href = "/login";
  },
};
</script>
