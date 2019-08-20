<template>
  <div>
    <div class="card-switch">
      <div>
        <span class="card-title">{{$i18n.translate("Turn on automatic online")}}</span>
        <span class="card-icon">
          <popover placement="bottom">
            <div
              slot="content"
              class="popover-demo-content"
            >{{$i18n.translate("Turn on automatic online info")}}</div>
            <a>
              <x-icon class="btn btn-default" type="ios-information-outline" size="30"></x-icon>
            </a>
          </popover>
        </span>
      </div>
      <inline-x-switch
        class="card-title-switch"
        @on-change="autoOnlineChange"
        v-model="ifAutoOnline"
      ></inline-x-switch>
    </div>
    <!-- <div class="logout-btn">
      <x-button type="primary" @click.native="logout">退出</x-button>
    </div>-->
    <!-- <actionsheet v-model="logoutInfoVisible" :menus="menus" show-cancel @on-click-menu="submit"></actionsheet> -->
  </div>
</template>

<script>
import {
  Group,
  InlineXSwitch,
  Popover,
  XButton,
  Actionsheet,
  cookie
} from "vux";
import Api from "@/service/Card";

export default {
  components: { Group, InlineXSwitch, Popover, XButton, Actionsheet },
  data() {
    return {
      // logoutInfoVisible: false,
      ifAutoOnline: false
      // menus: [
      //   {
      //     label: `确定咩?<br/><span style="color:#666;font-size:12px;">确定退出${this.$store.state.title}</span>`,
      //     type: "info"
      //   },
      //   {
      //     label: "确定",
      //     type: "warn",
      //     value: "ok"
      //   }
      // ]
    };
  },
  methods: {
    // logout: function() {
    //   this.logoutInfoVisible = true;
    // },
    submit(key, item) {
      if (key === "ok") {
        cookie.remove("token");
        window.localStorage.clear();
        this.$router.replace({ name: "LogIn" });
      }
    },
    getOnlineStatus() {
      Api.getOnlineStatus({}, cookie.get("token"), this.$store.state.language)
        .then(res => {
          if (!res) return;
          if (res.errorCode === 0) {
            this.ifAutoOnline = res.data.on_auto_online === 1;
          } else {
            this.errorHandler(res.msg, this.getOnlineStatus);
          }
        })
        .catch(e => {
          this.$vux.toast.text(
            "getOnlineStatus" + this.$i18n.translate("error info")
          );
        });
    },
    autoOnlineChange(value) {
      const ifAutoOnline = value === true ? 1 : 0;
      this.setOnlineStatus(ifAutoOnline);
    },
    setOnlineStatus(auto_online) {
      Api.setOnlineStatus(
        {
          on_auto_online: auto_online
        },
        cookie.get("token"),
        this.$store.state.language
      )
        .then(res => {
          if (!res) return;
          if (res.errorCode === 0) {
            // this.getOnlineStatus();
          } else {
            this.getOnlineStatus();
          }
        })
        .catch(e => {
          this.$vux.toast.text(
            "setOnlineStatus" + this.$i18n.translate("error info")
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
  },
  mounted: function() {
    this.getOnlineStatus();
  }
};
</script>

<style scoped>
.logout-btn {
  width: 94%;
  margin: 40px auto;
}
.popover-demo-content {
  padding: 10px;
}
.card-title {
  display: inline-block;
  margin: 10px 3px 10px 10px;
  font-size: 17px;
  vertical-align: middle;
}

.card-icon {
  display: inline-block;
  font-size: 12px;
  fill: lightskyblue;
  vertical-align: middle;
}

.card-title-switch {
  margin-right: 10px;
}

.card-switch {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
  background-color: #fff;
}
</style>
