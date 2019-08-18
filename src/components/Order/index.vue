<template>
  <div class="card-wraper bottom-pad">
    <div class="titleBar">
      <button-tab>
        <button-tab-item
          :selected="selectedIndex === 0"
          @on-item-click="tabChange"
        >{{$i18n.translate("Real-time unsettled")}}</button-tab-item>
        <button-tab-item
          :selected="selectedIndex === 1"
          @on-item-click="tabChange"
        >{{$i18n.translate("history")}}</button-tab-item>
      </button-tab>
    </div>
    <div v-if="selectedIndex === 0" class="todayContent">
      <today />
    </div>
    <div v-if="selectedIndex === 1" class="todayContent">
      <history />
    </div>
  </div>
</template>

<script>
import { ButtonTab, ButtonTabItem, Divider, cookie } from "vux";
import Today from "./unit/today";
import History from "./unit/history";
import Api from "@/service/Order";

export default {
  components: { ButtonTab, ButtonTabItem, Divider, Today, History },
  data() {
    return {
      selectedIndex: 0,
      noAuthority: true
    };
  },
  methods: {
    tabChange(index) {
      this.selectedIndex = index;
    },
    errorHandler(msg, cb) {
      // 显示
      this.$vux.confirm.show({
        title: msg,
        content: this.$i18n.translate("errorHandle info"),
        onConfirm() {
          cb();
        },
        onCancel() {
          // console.log("Plugin: I'm hiding");
        }
      });
    }
  },
  mounted: function() {}
};
</script>

<style scoped>
.firstColor {
  background-color: #4db6ac;
}
.secondColor {
  background-color: #8bc34a;
}
.isUnilateral {
  background-color: #ff7043;
}
.todayContent {
  color: #fff;
  margin-top: 20px;
}

.titleBar {
  margin: 0 auto;
  width: 90%;
}
.card-wraper {
  margin: 15px auto 0 auto;
}
</style>
