<template>
  <div>
    <panel header="当前未读消息" :list="list" type="1"></panel>
  </div>
</template>

<script>
import { Panel } from "vux";
import Api from "@/service/Message";
import { cookie } from "vux";

export default {
  components: { Panel },
  data() {
    return {
      list: []
    };
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
            this.list = data.map(v => {
              return {
                title: "系统消息",
                desc: v.notice_msg
              };
            });
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

<style scoped>
</style>
