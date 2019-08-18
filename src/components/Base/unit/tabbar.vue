<template>
  <div v-if="$store.state.ifRefresh">
    <tabbar class="base-tabbar" @on-index-change="barChange">
      <tabbar-item :selected="$store.state.currentRoute==='Account'" link="account">
        <img slot="icon" src="../../../assets/img/account-book.svg" />
        <img slot="icon-active" src="../../../assets/img/account-book-active.svg" />
        <span slot="label">{{$i18n.translate('Account')}}</span>
      </tabbar-item>
      <tabbar-item :selected="$store.state.currentRoute==='GetMoney'" link="getMoney">
        <img slot="icon" src="../../../assets/img/get-money.svg" />
        <img slot="icon-active" src="../../../assets/img/get-money-active.svg" />
        <span slot="label">{{$i18n.translate('make money')}}</span>
      </tabbar-item>
      <tabbar-item :selected="$store.state.currentRoute==='Order'" link="order">
        <img slot="icon" src="../../../assets/img/order.svg" />
        <img slot="icon-active" src="../../../assets/img/order-active.svg" />
        <span slot="label">{{$i18n.translate('Bets')}}</span>
      </tabbar-item>
      <tabbar-item :selected="$store.state.currentRoute==='Message'" link="message" :badge="badge">
        <img slot="icon" src="../../../assets/img/message.svg" />
        <img slot="icon-active" src="../../../assets/img/message-active.svg" />
        <span slot="label">{{$i18n.translate('Message')}}</span>
      </tabbar-item>
      <tabbar-item :selected="$store.state.currentRoute==='Card'" link="card">
        <img slot="icon" src="../../../assets/img/card.svg" />
        <img slot="icon-active" src="../../../assets/img/card-active.svg" />
        <span slot="label">{{$i18n.translate('Settings')}}</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import routeMap from "../../../router/routeMap";
import { handleTabbarAndRoute } from "../../../assets/util";

export default {
  props: {
    father_badge: String
  },
  components: {},
  data() {
    const badge = window.localStorage.getItem("badge");
    return {
      badge: Number(badge) > 0 ? badge : false
      // currentRoute: ""
    };
  },
  watch: {
    father_badge: function(val) {
      this.badge = Number(val) > 0 ? val : false;
    }
  },
  methods: {
    barChange(value) {
      // const name = ["Account", "GetMoney", "Order", "Message", "Card"];
      // this.$store.dispatch("setRouteTitle", routeMap[name[value]]);
      if (value === 2) {
        this.badge = false;
      }
    },
    setActiveTabbar: function() {
      const currentRoute = this.$router.history.current.name;
      // this.currentRoute = currentRoute;
      console.log("setRouteTitle", currentRoute);
      this.$store.dispatch("setRouteTitle", routeMap[currentRoute]);
      handleTabbarAndRoute(currentRoute, this);
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
