<template>
  <div class="base-wraper">
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
    </div>
    <tabbar :father_badge="badge" />
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
      badge: "",
      routeTitle: this.$store.state.routeTitle
    };
  },
  methods: {
    getOrderList() {
      Api.getOrderList({}, cookie.get("token"), this.$store.state.language)
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
            const badge = JSON.stringify(list.length);
            window.localStorage.setItem("list", JSON.stringify(list));
            window.localStorage.setItem("badge", badge);
            this.badge = badge;
          } else {
            this.errorHandler(res.msg, this.getAllBalance);
          }
        })
        .catch(e => {
          this.$vux.toast.text(
            "getOrderList" + this.$i18n.translate("error info")
          );
        });
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
.box-wraper {
  height: 100%;
}
.base-wraper {
  height: 100%;
}
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
