<template>
  <div class="box-wraper">
    <div class="header">
      <x-header :title="$store.state.routeTitle" :left-options="{showBack: false}">
        <div class="title">{{$store.state.routeTitle}}</div>
      </x-header>
    </div>
    <div class="content">
      <div style="height:46px"></div>
      <router-view></router-view>
    </div>
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
    return {
      routeTitle: this.$store.state.routeTitle
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
            const list = data.map(v => {
              return {
                title: "系统消息",
                desc: v
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
    // preventDefault() {
    //   document
    //     .getElementsByClassName("content")[0]
    //     .on("touchmove", function(event) {
    //       event.preventDefault();
    //     });
    // }
  },

  mounted: function() {
    this.getOrderList();
    // this.preventDefault();
  }
};
</script>

<style scoped lang="less">
.content {
  position: absolute;
  width: 100%;
  height: 100%;
  // overflow: scroll;
  // margin-top: 46px;
  // margin-bottom: 252px;
  -webkit-overflow-scrolling: touch;
}
.header {
  position: fixed;
  height: 46px;
  width: 100%;
  z-index: 9999;
}
</style>
