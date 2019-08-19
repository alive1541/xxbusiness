<template>
  <div>
    <divider
      v-if="updatedTimeStr"
    >{{$i18n.translate("Data update time")}}{{updatedTimeStr}} {{$i18n.translate("before")}}</divider>
    <div class="wraper">
      <div class="top-im">
        <div class="top-im-item">
          <span class="userInfo-des-all">
            {{$i18n.translate("Total assets")}}
            <span class="userinfo-icon">
              <popover placement="right">
                <div
                  slot="content"
                  class="popover-demo-content"
                >{{$i18n.translate("Total assets info")}}</div>
                <a>
                  <x-icon class="btn btn-default" type="ios-information-outline" size="15"></x-icon>
                </a>
              </popover>
            </span>
          </span>
          <br />
          <span class="userInfo-des-all-momey">{{all_assets}}</span>
        </div>
        <div>
          <img class="arrow-img" src="../../../assets/img/double-right.svg" />
        </div>
        <div class="top-im-item top-im-item-right">
          <div style="margin-Bottom:15px">
            <span class="userInfo-des">{{$i18n.translate("Total balance")}}</span>
            <span class="userinfo-icon">
              <popover placement="right">
                <div
                  slot="content"
                  class="popover-demo-content"
                >{{$i18n.translate("Total balance info")}}</div>
                <a>
                  <x-icon class="btn btn-default" type="ios-information-outline" size="15"></x-icon>
                </a>
              </popover>
            </span>
            <span>{{all_balance}}</span>
          </div>
          <div>
            <span class="userInfo-des">{{$i18n.translate("Unsettled")}}</span>
            <span class="userinfo-icon">
              <popover placement="right">
                <div
                  slot="content"
                  class="popover-demo-content"
                >{{$i18n.translate("Unsettled info")}}</div>
                <a>
                  <x-icon class="btn btn-default" type="ios-information-outline" size="15"></x-icon>
                </a>
              </popover>
            </span>
            <span v-if="!isNagtiveNum(all_unsettle)" class="red">+{{all_unsettle}}</span>
            <span v-if="isNagtiveNum(all_unsettle)" class="green">{{all_unsettle}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="wraper">
      <div class="bottom">
        <div class="left">
          <div class="inner-top">
            <span>
              {{all_deposit}}
              <br />
              <span class="userInfo-des">
                {{$i18n.translate("Total deposit")}}
                <div class="userinfo-icon">
                  <popover placement="right">
                    <div
                      slot="content"
                      class="popover-demo-content"
                    >{{$i18n.translate("Total deposit info")}}</div>
                    <a>
                      <x-icon class="btn btn-default" type="ios-information-outline" size="15"></x-icon>
                    </a>
                  </popover>
                </div>
              </span>
            </span>
          </div>
          <div>
            <span v-if="!isNagtiveNum(all_profit)" class="red">+{{all_profit}}</span>
            <span v-if="isNagtiveNum(all_profit)" class="green">{{all_profit}}</span>
            <br />
            <span class="userInfo-des">
              {{$i18n.translate("Total profit")}}
              <span class="userinfo-icon">
                <popover placement="right">
                  <div
                    slot="content"
                    class="popover-demo-content"
                  >{{$i18n.translate("Total profit info")}}</div>
                  <a>
                    <x-icon class="btn btn-default" type="ios-information-outline" size="15"></x-icon>
                  </a>
                </popover>
              </span>
            </span>
          </div>
        </div>
        <div class="right">
          <div class="inner-top">
            <span v-if="!isNagtiveNum(yes_profit)" class="red">+{{yes_profit}}</span>
            <span v-if="isNagtiveNum(yes_profit)" class="green">{{yes_profit}}</span>
            <br />
            <span class="userInfo-des">
              {{$i18n.translate("Yesterday's profit")}}
              <span class="userinfo-icon">
                <popover placement="right">
                  <div
                    slot="content"
                    class="popover-demo-content"
                  >{{$i18n.translate("Yesterday's profit info")}}</div>
                  <a>
                    <x-icon class="btn btn-default" type="ios-information-outline" size="15"></x-icon>
                  </a>
                </popover>
              </span>
            </span>
          </div>
          <div>
            <span>{{all_withdrawals}}</span>
            <br />
            <span class="userInfo-des">
              {{$i18n.translate("Total withdrawal")}}
              <span class="userinfo-icon">
                <popover placement="right">
                  <div
                    slot="content"
                    class="popover-demo-content"
                  >{{$i18n.translate("Total withdrawal info")}}</div>
                  <a>
                    <x-icon class="btn btn-default" type="ios-information-outline" size="15"></x-icon>
                  </a>
                </popover>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/service/Account";
import { Popover, cookie, Divider, dateFormat } from "vux";
import { type } from "os";

export default {
  components: { Popover, Divider },
  data() {
    return {
      updatedTimeStr: "",
      all_assets: "0",
      all_balance: "0",
      all_unsettle: "0",
      all_deposit: "0",
      all_withdrawals: "0",
      all_profit: "0",
      yes_profit: "0"
    };
  },
  methods: {
    getTime(updatedAt) {
      const diff = Number(new Date().getTime() - new Date(updatedAt).getTime());
      const h_flag = 60 * 60 * 1000;
      const s_flag = 60 * 1000;
      let hour = Math.floor(diff / h_flag);
      let last = diff % h_flag;
      let seconds = Math.floor(last / s_flag);

      if (hour) {
        return `${hour}${this.$i18n.translate(
          "hour"
        )}${seconds}${this.$i18n.translate("minute")}`;
      }
      return `${seconds}${this.$i18n.translate("minute")}`;
    },
    getAllBalance() {
      Api.getAssets({}, cookie.get("token"), this.$store.state.language)
        .then(res => {
          if (!res) return;
          if (res.errorCode === 0) {
            const data = res.data;
            this.all_assets = data["all_assets"];
            this.all_balance = data["all_balance"];
            this.all_unsettle = data["all_unsettle"];
            this.all_deposit = data["all_deposit"];
            this.all_withdrawals = data["all_withdrawals"];
            this.all_profit = data["all_profit"];
            this.yes_profit = data["yes_profit"];
            this.updatedTimeStr = this.getTime(data["updated_at"]);
            // this.updatedTimeStr = this.getTime("2019/06/05 20:50:05");
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
        content: this.$i18n.translate("errorHandle info"),
        onConfirm() {
          cb();
        },
        onCancel() {
          // console.log("Plugin: I'm hiding");
        }
      });
    },
    // - : true
    isNagtiveNum(value) {
      if (!value) return false;
      value = value.toString();
      return value.slice(0, 1) === "-";
    }
  },
  mounted: function() {
    this.getAllBalance();
  }
};
</script>

<style>
.inner-top {
  margin-bottom: 15px;
}
.top-im-item {
  position: relative;
  flex-grow: 1;
}
.top-im-item-right {
  text-align: left;
  flex-grow: 0.4;
  padding-left: 20px;
}

.arrow-img {
  width: 35px;
}
.popover-demo-content {
  padding: 10px;
}
.top-im-item .userinfo-icon {
  position: relative;
  display: inline-block;
  right: 0;
  top: 0;
}
.userinfo-icon,
.userInfo-des-all .userinfo-icon {
  position: absolute;
  right: -20px;
  top: -1px;
  height: 15px;
  font-size: 12px;
  fill: lightskyblue;
  vertical-align: middle;
}

.userInfo-des {
  position: relative;
  font-size: 11px;
  color: gray;
}
.wraper {
  font-size: 14px;
  padding: 10px 0;
  width: 95%;
  border-radius: 8px;
  margin: 0 auto;
  background-color: #ffffff;
  margin-top: 10px;
  box-shadow: 0 2px 8px #e0e0e0;
}

.userInfo-des-all {
  position: relative;
  vertical-align: middle;
  font-size: 15px;
  color: black;
}

.userInfo-des-all .userinfo-icon {
  top: 2px;
}

.userInfo-des-all-momey {
  font-size: 15px;
  color: black;
  font-weight: 600;
}

.top-im,
.bottom {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
}

.red {
  color: #f74c31;
}
.green {
  color: #04be02;
}
</style>
