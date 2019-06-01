<template>
  <tabbar class="base-tabbar">
    <tabbar-item :selected="currentRoute==='Account'" link="account">
      <img slot="icon" src="../../../assets/img/account-book.svg">
      <img slot="icon-active" src="../../../assets/img/account-book-active.svg">
      <span slot="label">账户</span>
    </tabbar-item>
    <tabbar-item :selected="currentRoute==='Order'" link="order">
      <img slot="icon" src="../../../assets/img/order.svg">
      <img slot="icon-active" src="../../../assets/img/order-active.svg">
      <span slot="label">订单</span>
    </tabbar-item>
    <tabbar-item
      :selected="currentRoute==='Message'"
      link="message"
      :badge="this.$store.state.badge"
    >
      <img slot="icon" src="../../../assets/img/message.svg">
      <img slot="icon-active" src="../../../assets/img/message-active.svg">
      <span slot="label">消息</span>
    </tabbar-item>
    <tabbar-item :selected="currentRoute==='Card'" link="card">
      <img slot="icon" src="../../../assets/img/card.svg">
      <img slot="icon-active" src="../../../assets/img/card-active.svg">
      <span slot="label">我的</span>
    </tabbar-item>
  </tabbar>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      currentRoute: 0
    };
  },
  methods: {
    setActiveTabbar: function() {
      const routeName = this.$router.history.current.name;
      this.currentRoute = routeName;
    }
  },
  mounted: function() {
    this.setActiveTabbar();
  }
};
</script>

<style scoped lang="less">
.base-tabbar {
  position: fixed;
}
</style>
