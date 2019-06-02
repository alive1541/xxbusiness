<template>
  <div class="box-wraper">
    <x-header title="账户">
      <div class="title">账户</div>
    </x-header>
    <router-view></router-view>
    <tabbar/>
  </div>
</template>

<script>
import Tabbar from "./unit/tabbar";
import Api from "@/service/Message";
import { cookie } from "vux";

export default {
  components: { Tabbar },
  data() {
    return {};
  },
  methods: {
    getOrderList() {
      Api.getOrderList({
        owner_id: window.localStorage.getItem("owner_id"),
        token: cookie.get("token")
      })
        .then(res => {
          if (!res) return;
          if (res.errorCode === 0) {
            const data = res.data;
            const list = data.map(v => {
              return {
                title: "系统消息",
                desc: v.notice_msg
              };
            });
            window.localStorage.setItem("list", JSON.stringify(list));
            window.localStorage.setItem("badge", JSON.stringify(list.length));
          } else {
            this.errorHandler(res.msg, this.getAllBalance);
          }
        })
        .catch(e => {
          this.$vux.toast.text(e);
        });
    },
    errorHandler(msg, cb) {
      // 显示
      this.$vux.confirm.show({
        title: msg,
        content: "点击确定可以重新获取内容",
        onConfirm() {
          cb();
        },
        onCancel() {
          // console.log("Plugin: I'm hiding");
        }
      });
    }
  },
  mounted: function() {
    this.getOrderList();
  }
};
</script>

<style scoped lang="less">
</style>
